package com.ecobank.eti.room_reservation;

import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
class ApiController {
    private final ReservationService service;
    private final ReportingService reporting;
    private final NotificationRepository notifications;
    private final AuditLogRepository audits;
    private final UserRepository users;
    private final RoleRepository roles;
    private final RoomRepository rooms;
    private final EquipmentRepository equipment;
    private final UserAdministrationService userAdministration;

    ApiController(ReservationService service, ReportingService reporting, NotificationRepository notifications,
                  AuditLogRepository audits, UserRepository users, RoleRepository roles,
                  RoomRepository rooms, EquipmentRepository equipment, UserAdministrationService userAdministration) {
        this.service = service; this.reporting = reporting; this.notifications = notifications; this.audits = audits;
        this.users = users; this.roles = roles; this.rooms = rooms; this.equipment = equipment;
        this.userAdministration = userAdministration;
    }

    @GetMapping("/rooms") List<RoomView> rooms() { return service.catalog(); }
    @GetMapping("/equipment") List<EquipmentView> equipment() { return service.equipment(); }

    @PostMapping("/requests")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    ReservationView create(Authentication auth, @Valid @RequestBody CreateReservationRequest input) { return service.create(auth.getName(), input); }

    @GetMapping("/requests/mine")
    @PreAuthorize("hasRole('USER')")
    List<ReservationView> mine(Authentication auth) { return service.mine(auth.getName()); }

    @GetMapping("/requests")
    @PreAuthorize("hasRole('ADMIN')")
    List<ReservationView> all() { return service.all(); }

    @GetMapping("/requests/{id}")
    ReservationView one(Authentication auth, @PathVariable Long id) { return service.one(auth.getName(), id, !hasRole(auth, "USER")); }

    @PutMapping("/requests/{id}")
    @PreAuthorize("hasRole('USER')")
    ReservationView update(Authentication auth, @PathVariable Long id, @Valid @RequestBody CreateReservationRequest input) {
        return service.updateMine(auth.getName(), id, input);
    }

    @PostMapping("/requests/{id}/cancel")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    ReservationView cancel(Authentication auth, @PathVariable Long id, @Valid @RequestBody CancelRequest input) {
        return service.cancel(auth.getName(), id, input.reason(), hasRole(auth, "ADMIN"));
    }

    @GetMapping("/admin/requests/{id}/compatibility")
    @PreAuthorize("hasRole('ADMIN')")
    List<CompatibilityView> compatibility(@PathVariable Long id) { return service.compatibility(id); }

    @PatchMapping("/admin/requests/{id}/priority")
    @PreAuthorize("hasRole('ADMIN')")
    ReservationView updatePriority(Authentication auth, @PathVariable Long id,
                                   @Valid @RequestBody PriorityUpdateRequest input) {
        return service.updatePriority(auth.getName(), id, input.priority());
    }

    @PostMapping("/admin/requests/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    ReservationView assign(Authentication auth, @PathVariable Long id, @Valid @RequestBody AssignmentRequest input) {
        return service.assign(auth.getName(), id, input.roomId(), input.justification());
    }

    @PostMapping("/admin/requests/{id}/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    ReservationView confirm(Authentication auth, @PathVariable Long id) { return service.confirm(auth.getName(), id); }

    @GetMapping("/facility/requests")
    @PreAuthorize("hasRole('FACILITY')")
    List<ReservationView> facility() { return service.facilityQueue(); }

    @PostMapping("/facility/requests/{id}/decision")
    @PreAuthorize("hasRole('FACILITY')")
    ReservationView facilityDecision(Authentication auth, @PathVariable Long id, @Valid @RequestBody DecisionRequest input) {
        return service.validate(auth.getName(), id, input, RoleName.FACILITY);
    }

    @GetMapping("/it/requests")
    @PreAuthorize("hasRole('IT')")
    List<ReservationView> it() { return service.itQueue(); }

    @PostMapping("/it/requests/{id}/decision")
    @PreAuthorize("hasRole('IT')")
    ReservationView itDecision(Authentication auth, @PathVariable Long id, @Valid @RequestBody DecisionRequest input) {
        return service.validate(auth.getName(), id, input, RoleName.IT);
    }

    @PostMapping("/requests/{id}/feedback")
    @PreAuthorize("hasRole('USER')")
    ResponseEntity<Void> feedback(Authentication auth, @PathVariable Long id, @Valid @RequestBody FeedbackRequest input) {
        service.feedback(auth.getName(), id, input); return ResponseEntity.noContent().build();
    }

    @GetMapping("/requests/{id}/feedback-status")
    @PreAuthorize("hasRole('USER')")
    FeedbackStatusView feedbackStatus(Authentication auth, @PathVariable Long id) {
        return service.feedbackStatus(auth.getName(), id);
    }

    @GetMapping("/feedbacks/mine")
    @PreAuthorize("hasRole('USER')")
    List<FeedbackReservationView> myFeedbacks(Authentication auth) {
        return service.myFeedbackReservations(auth.getName());
    }

    @GetMapping("/feedbacks")
    @PreAuthorize("hasAnyRole('ADMIN','FACILITY','IT')")
    List<FeedbackDetailView> feedbackResults() {
        return service.feedbackResults();
    }

    @GetMapping("/notifications")
    @Transactional(readOnly = true)
    List<NotificationView> notifications(Authentication auth) {
        return notifications.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(auth.getName()).stream()
                .map(n -> new NotificationView(n.id,n.title,n.message,n.eventType,n.readFlag,n.createdAt)).toList();
    }

    @GetMapping("/notifications/unread-count")
    @Transactional(readOnly = true)
    NotificationCountView unreadNotificationCount(Authentication auth) {
        return new NotificationCountView(notifications.countByUserEmailIgnoreCaseAndReadFlagFalse(auth.getName()));
    }

    @PatchMapping("/notifications/read-all")
    @Transactional
    ResponseEntity<Void> readAllNotifications(Authentication auth) {
        notifications.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(auth.getName()).stream()
                .filter(notification -> !notification.readFlag)
                .forEach(notification -> notification.readFlag = true);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/notifications/{id}/read")
    @Transactional
    ResponseEntity<Void> read(Authentication auth, @PathVariable Long id) {
        NotificationEntity n = notifications.findById(id).orElseThrow(() -> new NoSuchElementException("Notification introuvable"));
        if (!n.user.email.equalsIgnoreCase(auth.getName())) throw new org.springframework.security.access.AccessDeniedException("Notification privée");
        n.readFlag = true; return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    DashboardView dashboard() { return reporting.dashboard(); }

    @GetMapping("/admin/reports/reservations.xlsx")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<byte[]> excel() { return download(reporting.excel(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "rapport-reservations.xlsx"); }

    @GetMapping("/admin/reports/reservations.pdf")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<byte[]> pdf() { return download(reporting.pdf(), "application/pdf", "rapport-reservations.pdf"); }

    @GetMapping("/admin/audit")
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional(readOnly = true)
    List<AuditView> audit() { return audits.findTop200ByOrderByCreatedAtDesc().stream().map(a -> new AuditView(a.id,a.actorEmail,a.actionType,a.entityType,a.entityId,a.details,a.createdAt)).toList(); }

    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    List<UserView> users() { return userAdministration.list(); }

    @PostMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    UserView createUser(Authentication auth, @Valid @RequestBody UserCreateRequest input) {
        return userAdministration.create(auth.getName(), input);
    }

    @PutMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    UserView updateUser(Authentication auth, @PathVariable Long id, @Valid @RequestBody UserUpdateRequest input) {
        return userAdministration.update(auth.getName(), id, input);
    }

    @DeleteMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    UserDeletionView deleteUser(Authentication auth, @PathVariable Long id,
                                @Valid @RequestBody AdminConfirmationRequest confirmation) {
        return userAdministration.delete(auth.getName(), id, confirmation);
    }

    @PutMapping("/admin/rooms/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    RoomView updateRoom(Authentication auth, @PathVariable Long id, @Valid @RequestBody RoomCreateRequest input) {
        return service.updateRoom(auth.getName(), id, input);
    }

    @PostMapping("/admin/rooms")
    @PreAuthorize("hasRole('ADMIN')")
    RoomView createRoom(Authentication auth, @Valid @RequestBody RoomCreateRequest input) {
        return service.createRoom(auth.getName(), input);
    }

    @DeleteMapping("/admin/rooms/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ResourceDeletionView deleteRoom(Authentication auth, @PathVariable Long id,
                                    @Valid @RequestBody DeleteReasonRequest input) {
        return service.deleteRoom(auth.getName(), id, input.justification());
    }

    @PostMapping(value = "/admin/rooms/{id}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    RoomView updateRoomPhoto(Authentication auth, @PathVariable Long id, @RequestPart("file") MultipartFile file) {
        return service.updateRoomPhoto(auth.getName(), id, file);
    }

    @DeleteMapping("/admin/rooms/{id}/photo")
    @PreAuthorize("hasRole('ADMIN')")
    RoomView removeRoomPhoto(Authentication auth, @PathVariable Long id) {
        return service.removeRoomPhoto(auth.getName(), id);
    }

    @PostMapping("/admin/equipment")
    @PreAuthorize("hasRole('ADMIN')")
    EquipmentView createEquipment(Authentication auth, @Valid @RequestBody EquipmentCreateRequest input) {
        return service.createEquipment(auth.getName(), input);
    }

    @DeleteMapping("/admin/equipment/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ResourceDeletionView deleteEquipment(Authentication auth, @PathVariable Long id) {
        return service.deleteEquipment(auth.getName(), id);
    }

    @PutMapping("/it/equipment/{id}")
    @PreAuthorize("hasAnyRole('IT','ADMIN')")
    @Transactional
    EquipmentView updateEquipment(@PathVariable Long id, @Valid @RequestBody EquipmentUpdateRequest input) {
        EquipmentEntity e = equipment.findById(id).orElseThrow(() -> new NoSuchElementException("Équipement introuvable"));
        if (input.availableQuantity() > e.totalQuantity) throw new IllegalArgumentException("La quantité disponible dépasse le stock total");
        e.availableQuantity=input.availableQuantity(); e.status=input.status(); e.active=input.active(); return service.equipmentView(e);
    }

    private boolean hasRole(Authentication auth, String role) { return auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).anyMatch(("ROLE_"+role)::equals); }
    private ResponseEntity<byte[]> download(byte[] data, String type, String name) {
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(type))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+name+"\"").body(data);
    }
}
