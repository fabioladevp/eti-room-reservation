package com.ecobank.eti.room_reservation;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
class ReservationService {
    private static final ZoneId LOME = ZoneId.of("Africa/Lome");
    private static final Set<String> MANDATORY_ROOM_EQUIPMENT = Set.of("AIR_CONDITIONING", "WIFI");
    private static final Set<RequestStatus> OCCUPYING = EnumSet.of(RequestStatus.ASSIGNED, RequestStatus.PENDING_FACILITY,
            RequestStatus.PENDING_IT, RequestStatus.CONFIRMED);
    private final UserRepository users;
    private final RoomRepository rooms;
    private final BuildingRepository buildings;
    private final RoomCapacityRepository roomCapacities;
    private final EquipmentRepository equipment;
    private final ReservationRepository requests;
    private final AssignmentRepository assignments;
    private final ValidationRepository validations;
    private final RoomBlockRepository blocks;
    private final NotificationService notificationService;
    private final RequestExpirationScheduler requestExpiration;
    private final FeedbackRepository feedbacks;
    private final AuditLogRepository audits;
    private final RoomPhotoStorage roomPhotos;

    ReservationService(UserRepository users, RoomRepository rooms, BuildingRepository buildings,
                       RoomCapacityRepository roomCapacities, EquipmentRepository equipment,
                       ReservationRepository requests, AssignmentRepository assignments,
                       ValidationRepository validations, RoomBlockRepository blocks,
                       NotificationService notificationService, RequestExpirationScheduler requestExpiration,
                       FeedbackRepository feedbacks,
                       AuditLogRepository audits, RoomPhotoStorage roomPhotos) {
        this.users = users; this.rooms = rooms; this.buildings = buildings; this.roomCapacities = roomCapacities;
        this.equipment = equipment; this.requests = requests;
        this.assignments = assignments; this.validations = validations; this.blocks = blocks;
        this.notificationService = notificationService; this.requestExpiration = requestExpiration;
        this.feedbacks = feedbacks; this.audits = audits; this.roomPhotos = roomPhotos;
    }

    @Transactional(readOnly = true)
    List<RoomView> catalog() { return rooms.findCatalog().stream().map(this::roomView).toList(); }

    @Transactional(readOnly = true)
    List<EquipmentView> equipment() { return equipment.findByDeletedAtIsNullOrderByNameAsc().stream().map(this::equipmentView).toList(); }

    @Transactional
    RoomView createRoom(String adminEmail, RoomCreateRequest input) {
        String code = input.code().trim().toUpperCase(Locale.ROOT);
        if (rooms.existsByCodeIgnoreCase(code)) throw new IllegalArgumentException("Ce code de salle existe déjà");
        BuildingEntity building = buildings.findByCodeIgnoreCase(input.buildingCode())
                .orElseThrow(() -> new NoSuchElementException("Bâtiment introuvable"));

        RoomEntity room = new RoomEntity();
        room.code = code;
        room.name = input.name().trim();
        room.building = building;
        room.location = input.location().trim();
        room.bufferMinutes = input.bufferMinutes();
        room.status = input.status();
        room.active = input.active();
        room.photoUrl = roomPhotos.normalizeRequestedUrl(input.photoUrl());

        room.equipment = resolveRoomEquipment(input.equipmentCodes());
        room = rooms.saveAndFlush(room);
        room.capacities = createCapacities(room, input.capacities());
        audit(adminEmail, "CREATE_ROOM", "ROOM", room.id, room.code + " - " + room.name);
        return roomView(room);
    }

    @Transactional
    RoomView updateRoom(String adminEmail, Long id, RoomCreateRequest input) {
        RoomEntity room = rooms.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Salle introuvable"));
        if (room.deletedAt != null) throw new NoSuchElementException("Salle introuvable");
        String code = input.code().trim().toUpperCase(Locale.ROOT);
        if (rooms.existsByCodeIgnoreCaseAndIdNot(code, id)) throw new IllegalArgumentException("Ce code de salle existe déjà");
        BuildingEntity building = buildings.findByCodeIgnoreCase(input.buildingCode())
                .orElseThrow(() -> new NoSuchElementException("Bâtiment introuvable"));

        room.code = code;
        room.name = input.name().trim();
        room.building = building;
        room.location = input.location().trim();
        room.bufferMinutes = input.bufferMinutes();
        room.status = input.status();
        room.active = input.active();
        String previousPhoto = room.photoUrl;
        room.photoUrl = roomPhotos.normalizeRequestedUrl(input.photoUrl());
        room.equipment = resolveRoomEquipment(input.equipmentCodes());
        roomCapacities.deleteByRoomId(room.id);
        roomCapacities.flush();
        room.capacities = createCapacities(room, input.capacities());
        if (!Objects.equals(previousPhoto, room.photoUrl)) roomPhotos.deleteManaged(previousPhoto);
        audit(adminEmail, "UPDATE_ROOM", "ROOM", room.id, room.code + " - " + room.name);
        return roomView(room);
    }

    @Transactional
    RoomView updateRoomPhoto(String adminEmail, Long id, MultipartFile file) {
        RoomEntity room = rooms.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Salle introuvable"));
        if (room.deletedAt != null) throw new NoSuchElementException("Salle introuvable");
        String previousPhoto = room.photoUrl;
        String storedPhoto = roomPhotos.store(file);
        room.photoUrl = storedPhoto;
        audit(adminEmail, "UPDATE_ROOM_PHOTO", "ROOM", room.id, room.code + " - photo remplacée");
        roomPhotos.deleteManaged(previousPhoto);
        return roomView(room);
    }

    @Transactional
    RoomView removeRoomPhoto(String adminEmail, Long id) {
        RoomEntity room = rooms.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Salle introuvable"));
        if (room.deletedAt != null) throw new NoSuchElementException("Salle introuvable");
        String previousPhoto = room.photoUrl;
        room.photoUrl = RoomPhotoStorage.DEFAULT_PHOTO;
        audit(adminEmail, "DELETE_ROOM_PHOTO", "ROOM", room.id, room.code + " - retour à l’illustration par défaut");
        roomPhotos.deleteManaged(previousPhoto);
        return roomView(room);
    }

    @Transactional
    ResourceDeletionView deleteRoom(String adminEmail, Long id, String justification) {
        RoomEntity room = rooms.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Salle introuvable"));
        if (room.deletedAt != null) throw new NoSuchElementException("Salle introuvable");
        room.active = false;
        room.status = RoomStatus.BLOCKED;
        room.deletedAt = LocalDateTime.now(LOME);
        room.deletionReason = justification.trim();
        audit(adminEmail, "DELETE_ROOM", "ROOM", room.id,
                room.code + " - justification : " + room.deletionReason);
        return new ResourceDeletionView("La salle a été supprimée du catalogue.");
    }

    @Transactional
    EquipmentView createEquipment(String adminEmail, EquipmentCreateRequest input) {
        String code = input.code().trim().toUpperCase(Locale.ROOT);
        if (equipment.existsByCodeIgnoreCase(code)) throw new IllegalArgumentException("Ce code d’équipement existe déjà");
        if (input.availableQuantity() > input.totalQuantity())
            throw new IllegalArgumentException("La quantité disponible dépasse le stock total");
        EquipmentEntity item = new EquipmentEntity();
        item.code = code;
        item.name = input.name().trim();
        item.equipmentType = input.type();
        item.totalQuantity = input.totalQuantity();
        item.availableQuantity = input.availableQuantity();
        item.status = input.status();
        item.active = input.active();
        item = equipment.save(item);
        audit(adminEmail, "CREATE_EQUIPMENT", "EQUIPMENT", item.id, item.code + " - " + item.name);
        return equipmentView(item);
    }

    @Transactional
    ResourceDeletionView deleteEquipment(String adminEmail, Long id) {
        EquipmentEntity item = equipment.findById(id).orElseThrow(() -> new NoSuchElementException("Équipement introuvable"));
        if (item.deletedAt != null) throw new NoSuchElementException("Équipement introuvable");
        if (MANDATORY_ROOM_EQUIPMENT.contains(item.code))
            throw new IllegalStateException("Le Wi-Fi et la climatisation sont obligatoires et ne peuvent pas être supprimés");
        item.active = false;
        item.status = "DELETED";
        item.deletedAt = LocalDateTime.now(LOME);
        audit(adminEmail, "DELETE_EQUIPMENT", "EQUIPMENT", item.id, item.code + " - " + item.name);
        return new ResourceDeletionView("L’équipement a été supprimé.");
    }

    private Set<EquipmentEntity> resolveRoomEquipment(Set<String> requestedCodes) {
        Set<String> codes = new LinkedHashSet<>(Optional.ofNullable(requestedCodes).orElse(Set.of()));
        codes.addAll(MANDATORY_ROOM_EQUIPMENT);
        Set<EquipmentEntity> selectedEquipment = new LinkedHashSet<>();
        for (String equipmentCode : codes) {
            EquipmentEntity selected = equipment.findByCode(equipmentCode.trim().toUpperCase(Locale.ROOT))
                    .orElseThrow(() -> new NoSuchElementException("Équipement introuvable : " + equipmentCode));
            if (selected.equipmentType != EquipmentType.FIXED)
                throw new IllegalArgumentException("Un équipement mobile ne peut pas être rattaché définitivement à une salle");
            selectedEquipment.add(selected);
        }
        return selectedEquipment;
    }

    private List<RoomCapacityEntity> createCapacities(RoomEntity room, Map<LayoutType, Integer> capacities) {
        List<RoomCapacityEntity> created = new ArrayList<>();
        for (Map.Entry<LayoutType, Integer> entry : capacities.entrySet()) {
            RoomCapacityEntity capacity = new RoomCapacityEntity();
            capacity.room = room;
            capacity.layoutType = entry.getKey();
            capacity.capacity = entry.getValue();
            created.add(capacity);
        }
        roomCapacities.saveAll(created);
        return created;
    }

    @Transactional
    ReservationView create(String email, CreateReservationRequest input) {
        validateDates(input);
        UserEntity requester = user(email);
        if (input.priority() == PriorityLevel.PRIORITY && requester.primaryRole() == RoleName.USER)
            throw new AccessDeniedException("Votre profil ne permet pas de créer une demande prioritaire");
        ReservationRequestEntity r = new ReservationRequestEntity();
        apply(r, input); r.requester = requester; r.status = RequestStatus.SUBMITTED;
        r.reference = "REQ-" + Year.now(LOME).getValue() + "-" + String.format("%05d", ThreadLocalRandom.current().nextInt(10000, 99999));
        rebuildOccurrences(r, input.occurrences());
        r = requests.save(r);
        audit(email, "CREATE_REQUEST", "RESERVATION", r.id, r.reference);
        notificationService.notify(requester, "SUBMISSION", "Demande soumise", "Votre demande " + r.reference + " a été soumise.",
                "Request submitted", "Your request " + r.reference + " has been submitted.");
        return view(r);
    }

    @Transactional(readOnly = true)
    List<ReservationView> mine(String email) {
        requestExpiration.expireOverdueRequests();
        return requests.findByRequesterEmailIgnoreCaseOrderByCreatedAtDesc(email).stream().map(this::view).toList();
    }

    @Transactional(readOnly = true)
    List<ReservationView> all() {
        requestExpiration.expireOverdueRequests();
        return requests.findAllByOrderByCreatedAtDesc().stream().map(this::view).toList();
    }

    @Transactional(readOnly = true)
    ReservationView one(String email, Long id, boolean privileged) {
        requestExpiration.expireOverdueRequests();
        ReservationRequestEntity r = detailed(id);
        if (!privileged && !r.requester.email.equalsIgnoreCase(email)) throw new AccessDeniedException("Cette demande ne vous appartient pas");
        return view(r);
    }

    @Transactional
    ReservationView updateMine(String email, Long id, CreateReservationRequest input) {
        requestExpiration.expireOverdueRequests();
        ReservationRequestEntity r = requests.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Demande introuvable"));
        if (!r.requester.email.equalsIgnoreCase(email)) throw new AccessDeniedException("Cette demande ne vous appartient pas");
        ensureNotExpired(r);
        if (r.status != RequestStatus.SUBMITTED)
            throw new IllegalStateException("Seule une demande au statut Soumise peut être modifiée");
        validateDates(input);
        ensureModificationWindow(r);
        PriorityLevel currentPriority = r.priorityLevel;
        boolean needsRevalidation = r.assignedRoom != null;
        apply(r, input); rebuildOccurrences(r, input.occurrences());
        // La priorité est administrée séparément : un demandeur ne peut pas la
        // modifier indirectement en éditant les autres informations.
        r.priorityLevel = currentPriority;
        if (needsRevalidation) {
            assignments.findByRequestIdAndActiveTrue(r.id).forEach(a -> a.active = false);
            r.assignedRoom = null; r.facilityValidated = null; r.itValidated = null;
            r.status = RequestStatus.SUBMITTED;
        }
        r.updatedAt = LocalDateTime.now(LOME); audit(email, "UPDATE_REQUEST", "RESERVATION", r.id, r.reference);
        notificationService.notify(r.requester, "MODIFICATION", "Demande modifiée", "La demande " + r.reference + " a été mise à jour.",
                "Request updated", "Request " + r.reference + " was updated.");
        return view(r);
    }

    @Transactional
    ReservationView cancel(String email, Long id, String reason, boolean privileged) {
        requestExpiration.expireOverdueRequests();
        ReservationRequestEntity r = requests.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Demande introuvable"));
        if (!privileged && !r.requester.email.equalsIgnoreCase(email)) throw new AccessDeniedException("Cette demande ne vous appartient pas");
        ensureNotExpired(r);
        if (r.status == RequestStatus.CANCELLED) throw new IllegalStateException("La demande est déjà annulée");
        LocalDateTime end = r.occurrences.stream().map(o -> LocalDateTime.of(o.occurrenceDate, o.endTime)).max(Comparator.naturalOrder()).orElseThrow();
        if (!LocalDateTime.now(LOME).isBefore(end)) throw new IllegalStateException("L'événement est déjà terminé");
        assignments.findByRequestIdAndActiveTrue(r.id).forEach(a -> a.active = false);
        r.status = RequestStatus.CANCELLED; r.cancelReason = reason; r.assignedRoom = null; r.updatedAt = LocalDateTime.now(LOME);
        audit(email, "CANCEL_REQUEST", "RESERVATION", r.id, reason);
        notificationService.notify(r.requester, "CANCELLATION", "Réservation annulée", "La demande " + r.reference + " a été annulée.",
                "Reservation cancelled", "Request " + r.reference + " was cancelled.");
        return view(r);
    }

    @Transactional(readOnly = true)
    List<CompatibilityView> compatibility(Long requestId) {
        ReservationRequestEntity r = detailed(requestId);
        return rooms.findCatalog().stream().map(room -> compatibilityFor(room, r)).toList();
    }

    @Transactional
    ReservationView updatePriority(String adminEmail, Long requestId, PriorityLevel priority) {
        requestExpiration.expireOverdueRequests();
        ReservationRequestEntity request = requests.findByIdForUpdate(requestId)
                .orElseThrow(() -> new NoSuchElementException("Demande introuvable"));
        ensureNotExpired(request);
        if (request.status == RequestStatus.CANCELLED || request.status == RequestStatus.COMPLETED)
            throw new IllegalStateException("Une réservation annulée ou terminée ne peut plus changer de priorité");
        request.priorityLevel = priority;
        request.updatedAt = LocalDateTime.now(LOME);
        audit(adminEmail, "UPDATE_PRIORITY", "RESERVATION", request.id, request.reference + " - " + priority);
        notificationService.notify(request.requester, "PRIORITY_UPDATED",
                priority == PriorityLevel.PRIORITY ? "Demande rendue prioritaire" : "Priorité retirée",
                "La priorité de la demande " + request.reference + " est maintenant " + priority + ".",
                priority == PriorityLevel.PRIORITY ? "Request marked as priority" : "Priority removed",
                "Request " + request.reference + " priority is now " + priority + ".");
        return view(request);
    }

    @Transactional
    ReservationView assign(String adminEmail, Long requestId, Long roomId, String justification) {
        requestExpiration.expireOverdueRequests();
        UserEntity admin = user(adminEmail);
        ReservationRequestEntity r = requests.findByIdForUpdate(requestId).orElseThrow(() -> new NoSuchElementException("Demande introuvable"));
        ensureNotExpired(r);
        if (!EnumSet.of(RequestStatus.SUBMITTED, RequestStatus.TO_REASSIGN, RequestStatus.REJECTED_FACILITY, RequestStatus.REJECTED_IT).contains(r.status))
            throw new IllegalStateException("La demande n'est pas assignable dans son état actuel");
        RoomEntity room = rooms.findByIdForUpdate(roomId).orElseThrow(() -> new NoSuchElementException("Salle introuvable"));
        CompatibilityView compatibility = compatibilityFor(room, r);
        if (!compatibility.compatible()) throw new IllegalStateException("Salle incompatible : " + String.join(", ", compatibility.reasons()));
        assignments.findByRequestIdAndActiveTrue(r.id).forEach(a -> a.active = false);
        AssignmentEntity a = new AssignmentEntity(); a.request = r; a.room = room; a.assignedBy = admin; a.justification = justification;
        assignments.save(a);
        r.assignedRoom = room; r.status = RequestStatus.PENDING_FACILITY; r.facilityValidated = null; r.itValidated = null;
        r.updatedAt = LocalDateTime.now(LOME);
        audit(adminEmail, "ASSIGN_ROOM", "RESERVATION", r.id, room.name + (justification == null ? "" : " - " + justification));
        notificationService.notify(r.requester, "ASSIGNMENT", "Salle assignée", room.name + " a été proposée pour " + r.reference + ".",
                "Room assigned", room.name + " was proposed for " + r.reference + ".");
        notifyRole(RoleName.FACILITY, "FACILITY_VALIDATION", "Validation requise", "La demande " + r.reference + " attend votre validation physique.",
                "Validation required", "Request " + r.reference + " requires your physical validation.");
        return view(r);
    }

    @Transactional(readOnly = true)
    List<ReservationView> facilityQueue() {
        requestExpiration.expireOverdueRequests();
        return requests.findByStatusInOrderByCreatedAtAsc(List.of(RequestStatus.PENDING_FACILITY)).stream().map(this::view).toList();
    }

    @Transactional(readOnly = true)
    List<ReservationView> itQueue() {
        requestExpiration.expireOverdueRequests();
        return requests.findByStatusInOrderByCreatedAtAsc(List.of(RequestStatus.PENDING_IT)).stream().map(this::view).toList();
    }

    @Transactional
    ReservationView validate(String email, Long id, DecisionRequest decision, RoleName role) {
        requestExpiration.expireOverdueRequests();
        if (!decision.approved() && (decision.justification() == null || decision.justification().isBlank()))
            throw new IllegalArgumentException("Une justification est obligatoire en cas de rejet");
        ReservationRequestEntity r = requests.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Demande introuvable"));
        ensureNotExpired(r);
        if (role == RoleName.FACILITY && r.status != RequestStatus.PENDING_FACILITY) throw new IllegalStateException("Cette demande n'attend pas Facility");
        if (role == RoleName.IT && r.status != RequestStatus.PENDING_IT) throw new IllegalStateException("Cette demande n'attend pas IT");
        UserEntity validator = user(email);
        ValidationRecordEntity record = new ValidationRecordEntity();
        record.request = r; record.validator = validator; record.validationType = role.name();
        record.decision = decision.approved() ? "APPROVED" : "REJECTED"; record.justification = decision.justification(); validations.save(record);
        if (role == RoleName.FACILITY) {
            r.facilityValidated = decision.approved(); r.facilityNote = decision.justification();
            r.status = decision.approved() ? RequestStatus.PENDING_IT : RequestStatus.REJECTED_FACILITY;
            if (decision.approved()) notifyRole(RoleName.IT, "IT_VALIDATION", "Validation technique requise", "La demande " + r.reference + " attend votre validation.", "Technical validation required", "Request " + r.reference + " requires your validation.");
        } else {
            r.itValidated = decision.approved(); r.itNote = decision.justification();
            r.status = decision.approved() ? RequestStatus.PENDING_IT : RequestStatus.REJECTED_IT;
        }
        if (!decision.approved()) r.status = role == RoleName.FACILITY ? RequestStatus.REJECTED_FACILITY : RequestStatus.REJECTED_IT;
        audit(email, role + "_" + record.decision, "RESERVATION", r.id, decision.justification());
        notificationService.notify(r.requester, role + "_" + record.decision,
                decision.approved() ? "Validation enregistrée" : "Validation rejetée",
                "La validation " + role + " de " + r.reference + " est " + (decision.approved() ? "acceptée." : "rejetée : " + decision.justification()),
                decision.approved() ? "Validation recorded" : "Validation rejected",
                role + " validation for " + r.reference + " was " + (decision.approved() ? "approved." : "rejected: " + decision.justification()));
        return view(r);
    }

    @Transactional
    ReservationView confirm(String adminEmail, Long id) {
        requestExpiration.expireOverdueRequests();
        ReservationRequestEntity r = requests.findByIdForUpdate(id).orElseThrow(() -> new NoSuchElementException("Demande introuvable"));
        ensureNotExpired(r);
        if (!Boolean.TRUE.equals(r.facilityValidated) || !Boolean.TRUE.equals(r.itValidated))
            throw new IllegalStateException("Les validations Facility et IT sont obligatoires avant confirmation");
        if (r.assignedRoom == null) throw new IllegalStateException("Aucune salle n'est assignée");
        r.status = RequestStatus.CONFIRMED; r.updatedAt = LocalDateTime.now(LOME);
        audit(adminEmail, "CONFIRM_REQUEST", "RESERVATION", r.id, r.reference);
        notificationService.notify(r.requester, "CONFIRMATION", "Réservation confirmée", "Votre réservation " + r.reference + " est confirmée dans " + r.assignedRoom.name + ".",
                "Reservation confirmed", "Your reservation " + r.reference + " is confirmed in " + r.assignedRoom.name + ".");
        return view(r);
    }

    @Transactional
    void feedback(String email, Long id, FeedbackRequest input) {
        ReservationRequestEntity r = detailed(id);
        if (!r.requester.email.equalsIgnoreCase(email)) throw new AccessDeniedException("Cette demande ne vous appartient pas");
        if (!feedbackAllowed(r)) throw new IllegalStateException("Le feedback concerne uniquement une réservation confirmée et déjà passée");
        LocalDate availableFrom = feedbackAvailableFrom(r);
        if (LocalDate.now(LOME).isBefore(availableFrom)) throw new IllegalStateException("Le feedback est disponible le lendemain de l'événement");
        if (feedbacks.existsByRequestId(id)) throw new IllegalStateException("Un feedback a déjà été enregistré");
        if (input.answers().values().stream().anyMatch(value -> value == null || !Set.of(1, 3, 5).contains(value)))
            throw new IllegalArgumentException("Chaque réponse doit être Very good, Good ou Poor");
        FeedbackEntity f = new FeedbackEntity(); f.request = r; f.respondent = r.requester;
        int legacyAverage = input.overallRating();
        f.roomRating = legacyAverage; f.comfortRating = legacyAverage; f.equipmentRating = legacyAverage;
        f.supportRating = legacyAverage; f.overallRating = input.overallRating(); f.commentText = input.comment();
        f.language = input.language() == null ? r.requester.language : input.language();
        input.answers().forEach((criterion, rating) -> {
            FeedbackAnswerEntity answer = new FeedbackAnswerEntity();
            answer.feedback = f; answer.criterion = criterion; answer.rating = rating; f.answers.add(answer);
        });
        feedbacks.save(f);
        audit(email, "CREATE_FEEDBACK", "RESERVATION", r.id, "Feedback post-événement");
    }

    @Transactional(readOnly = true)
    FeedbackStatusView feedbackStatus(String email, Long id) {
        ReservationRequestEntity r = detailed(id);
        if (!r.requester.email.equalsIgnoreCase(email)) throw new AccessDeniedException("Cette demande ne vous appartient pas");
        LocalDate availableFrom = feedbackAvailableFrom(r);
        boolean submitted = feedbacks.existsByRequestId(id);
        return new FeedbackStatusView(!submitted && feedbackAllowed(r) && !LocalDate.now(LOME).isBefore(availableFrom), submitted, availableFrom);
    }

    @Transactional(readOnly = true)
    List<FeedbackReservationView> myFeedbackReservations(String email) {
        LocalDate today = LocalDate.now(LOME);
        return requests.findByRequesterEmailIgnoreCaseOrderByCreatedAtDesc(email).stream()
                .filter(this::feedbackAllowed)
                .filter(request -> feedbackAvailableFrom(request).compareTo(today) <= 0)
                .map(request -> {
                    LocalDate availableFrom = feedbackAvailableFrom(request);
                    Optional<FeedbackEntity> feedback = feedbacks.findByRequestId(request.id);
                    Double average = feedback.map(this::feedbackAverage).orElse(null);
                    LocalDateTime submittedAt = feedback.map(item -> item.createdAt).orElse(null);
                    return new FeedbackReservationView(request.id, request.reference, request.subject,
                            request.assignedRoom == null ? null : request.assignedRoom.name,
                            availableFrom.minusDays(1), availableFrom, feedback.isEmpty(),
                            feedback.isPresent(), average, submittedAt);
                })
                .sorted(Comparator.comparing(FeedbackReservationView::eventDate).reversed())
                .toList();
    }

    @Transactional(readOnly = true)
    List<FeedbackDetailView> feedbackResults() {
        return feedbacks.findDetailedAll().stream().map(feedback -> {
            LocalDate eventDate = feedbackAvailableFrom(feedback.request).minusDays(1);
            List<FeedbackAnswerView> answers = feedback.answers.stream()
                    .sorted(Comparator.comparing(answer -> answer.criterion.ordinal()))
                    .map(answer -> new FeedbackAnswerView(answer.criterion.name(), answer.rating)).toList();
            return new FeedbackDetailView(feedback.id, feedback.request.id, feedback.request.reference,
                    feedback.request.subject,
                    feedback.request.assignedRoom == null ? null : feedback.request.assignedRoom.name,
                    feedback.respondent.fullName, eventDate, answers, feedback.commentText,
                    feedback.language, feedback.createdAt, feedbackAverage(feedback));
        }).toList();
    }

    private LocalDate feedbackAvailableFrom(ReservationRequestEntity request) {
        return request.occurrences.stream().map(o -> o.occurrenceDate).max(LocalDate::compareTo)
                .orElseThrow(() -> new IllegalStateException("La demande ne contient aucune occurrence")).plusDays(1);
    }

    private boolean feedbackAllowed(ReservationRequestEntity request) {
        return request.status == RequestStatus.CONFIRMED || request.status == RequestStatus.COMPLETED;
    }

    private double feedbackAverage(FeedbackEntity feedback) {
        return feedback.overallRating;
    }

    private CompatibilityView compatibilityFor(RoomEntity room, ReservationRequestEntity r) {
        List<String> reasons = new ArrayList<>();
        if (!room.active) reasons.add("salle inactive");
        if (room.status == RoomStatus.MAINTENANCE) reasons.add("salle bloquée pour maintenance");
        if (room.status == RoomStatus.BLOCKED) reasons.add("salle bloquée");
        Optional<RoomCapacityEntity> capacity = room.capacities.stream().filter(c -> c.layoutType == r.layoutType).findFirst();
        if (capacity.isEmpty()) reasons.add("disposition non prise en charge");
        else if (capacity.get().capacity < r.participantCount) reasons.add("capacité insuffisante (" + capacity.get().capacity + " places)");
        Set<String> fixed = room.equipment.stream().filter(e -> e.equipmentType == EquipmentType.FIXED && e.active && "AVAILABLE".equals(e.status)).map(e -> e.code).collect(Collectors.toSet());
        for (String code : requestedCodes(r.technicalNeeds)) {
            EquipmentEntity e = equipment.findByCode(code).orElse(null);
            if (e == null) reasons.add("équipement inconnu : " + code);
            else if (!e.active || !"AVAILABLE".equals(e.status)) reasons.add("équipement indisponible : " + e.name);
            else if (e.equipmentType == EquipmentType.FIXED && !fixed.contains(code)) reasons.add("équipement fixe manquant : " + e.name);
            else if (e.equipmentType == EquipmentType.MOBILE && e.availableQuantity < 1) reasons.add("équipement mobile indisponible : " + e.name);
        }
        for (ReservationOccurrenceEntity occurrence : r.occurrences) {
            LocalDateTime start = LocalDateTime.of(occurrence.occurrenceDate, occurrence.startTime);
            LocalDateTime end = LocalDateTime.of(occurrence.occurrenceDate, occurrence.endTime);
            if (!blocks.findOverlapping(room.id, start, end).isEmpty()) reasons.add("salle indisponible le " + occurrence.occurrenceDate + " (blocage)");
            for (ReservationRequestEntity existing : requests.findActiveForRoom(room.id, OCCUPYING)) {
                if (Objects.equals(existing.id, r.id)) continue;
                for (ReservationOccurrenceEntity occupied : existing.occurrences) {
                    if (!occupied.occurrenceDate.equals(occurrence.occurrenceDate)) continue;
                    LocalDateTime occupiedStart = LocalDateTime.of(occupied.occurrenceDate, occupied.startTime).minusMinutes(room.bufferMinutes);
                    LocalDateTime occupiedEnd = LocalDateTime.of(occupied.occurrenceDate, occupied.endTime).plusMinutes(room.bufferMinutes);
                    if (start.isBefore(occupiedEnd) && end.isAfter(occupiedStart)) {
                        String reason = (end.isAfter(LocalDateTime.of(occupied.occurrenceDate, occupied.startTime)) && start.isBefore(LocalDateTime.of(occupied.occurrenceDate, occupied.endTime)))
                                ? "conflit avec une réservation existante le " + occurrence.occurrenceDate
                                : "temps de battement non respecté le " + occurrence.occurrenceDate;
                        reasons.add(reason);
                    }
                }
            }
        }
        return new CompatibilityView(room.id, room.name, reasons.isEmpty(), reasons.stream().distinct().toList());
    }

    private void validateDates(CreateReservationRequest input) {
        if (input.endDate().isBefore(input.startDate())) throw new IllegalArgumentException("La date de fin doit suivre la date de début");
        if ((input.occurrences() == null || input.occurrences().isEmpty()) && !input.endTime().isAfter(input.startTime()))
            throw new IllegalArgumentException("L'heure de fin doit suivre l'heure de début");
        if (ChronoUnit.DAYS.between(input.startDate(), input.endDate()) > 366) throw new IllegalArgumentException("La période ne peut pas dépasser 12 mois");
        if (input.occurrences() == null || input.occurrences().isEmpty()) return;
        long expectedDays = ChronoUnit.DAYS.between(input.startDate(), input.endDate()) + 1;
        if (input.occurrences().size() != expectedDays)
            throw new IllegalArgumentException("Un horaire doit être renseigné pour chaque jour de la période");
        Set<LocalDate> dates = new HashSet<>();
        for (OccurrenceScheduleRequest occurrence : input.occurrences()) {
            if (occurrence.date().isBefore(input.startDate()) || occurrence.date().isAfter(input.endDate()))
                throw new IllegalArgumentException("Une occurrence se trouve hors de la période demandée");
            if (!dates.add(occurrence.date()))
                throw new IllegalArgumentException("Une date d'occurrence est présente plusieurs fois");
            if (!occurrence.endTime().isAfter(occurrence.startTime()))
                throw new IllegalArgumentException("L'heure de fin doit suivre l'heure de début pour le " + occurrence.date());
        }
    }

    private void apply(ReservationRequestEntity r, CreateReservationRequest input) {
        r.subject = input.subject().trim(); r.description = input.description(); r.participantCount = input.participantCount();
        r.startDate = input.startDate(); r.endDate = input.endDate(); r.startTime = input.startTime(); r.endTime = input.endTime();
        r.layoutType = input.layout(); r.physicalNeeds = input.physicalNeeds(); r.technicalNeeds = input.technicalNeeds();
        r.observations = input.observations(); r.priorityLevel = input.priority() == null ? PriorityLevel.NORMAL : input.priority();
    }

    private void rebuildOccurrences(ReservationRequestEntity r, List<OccurrenceScheduleRequest> requestedOccurrences) {
        r.occurrences.clear();
        if (r.id != null) requests.flush();
        List<OccurrenceScheduleRequest> schedules;
        if (requestedOccurrences == null || requestedOccurrences.isEmpty()) {
            schedules = new ArrayList<>();
            for (LocalDate date = r.startDate; !date.isAfter(r.endDate); date = date.plusDays(1))
                schedules.add(new OccurrenceScheduleRequest(date, r.startTime, r.endTime));
        } else {
            schedules = requestedOccurrences.stream().sorted(Comparator.comparing(OccurrenceScheduleRequest::date)).toList();
        }
        for (OccurrenceScheduleRequest schedule : schedules) {
            ReservationOccurrenceEntity o = new ReservationOccurrenceEntity();
            o.request = r; o.occurrenceDate = schedule.date(); o.startTime = schedule.startTime(); o.endTime = schedule.endTime();
            r.occurrences.add(o);
        }
        if (r.occurrences.isEmpty()) throw new IllegalArgumentException("La demande doit contenir au moins une occurrence");
        r.startTime = r.occurrences.getFirst().startTime;
        r.endTime = r.occurrences.getLast().endTime;
    }

    private void ensureModificationWindow(ReservationRequestEntity r) {
        LocalDateTime now = LocalDateTime.now(LOME);
        LocalDateTime next = r.occurrences.stream().map(o -> LocalDateTime.of(o.occurrenceDate, o.startTime)).filter(d -> d.isAfter(now)).min(Comparator.naturalOrder()).orElseThrow(() -> new IllegalStateException("Aucune occurrence future à modifier"));
        if (!now.isBefore(next.minusHours(1))) throw new IllegalStateException("La modification est bloquée à H-1 ou moins");
    }

    private void ensureNotExpired(ReservationRequestEntity request) {
        if (request.status == RequestStatus.EXPIRED) throw new IllegalStateException("La demande a expiré et aucune action n’est plus possible");
        if (EnumSet.of(RequestStatus.CONFIRMED, RequestStatus.CANCELLED, RequestStatus.COMPLETED).contains(request.status)) return;
        LocalDateTime firstOccurrence = request.occurrences.stream()
                .map(occurrence -> LocalDateTime.of(occurrence.occurrenceDate, occurrence.startTime))
                .min(Comparator.naturalOrder()).orElse(null);
        if (firstOccurrence != null && !firstOccurrence.isAfter(LocalDateTime.now(LOME)))
            throw new IllegalStateException("La demande a expiré et aucune action n’est plus possible");
    }

    private Set<String> requestedCodes(String raw) {
        if (raw == null || raw.isBlank()) return Set.of();
        return Arrays.stream(raw.split("[,;]" )).map(String::trim).filter(s -> !s.isBlank()).map(String::toUpperCase).collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private UserEntity user(String email) { return users.findByEmailIgnoreCase(email).orElseThrow(() -> new NoSuchElementException("Utilisateur introuvable")); }
    private ReservationRequestEntity detailed(Long id) { return requests.findDetailed(id).orElseThrow(() -> new NoSuchElementException("Demande introuvable")); }
    private void notifyRole(RoleName role, String type, String frTitle, String fr, String enTitle, String en) {
        users.findAll().stream().filter(u -> u.active && u.roles.stream().anyMatch(r -> r.name == role)).forEach(u -> notificationService.notify(u, type, frTitle, fr, enTitle, en));
    }
    private void audit(String actor, String action, String type, Long id, String details) {
        AuditLogEntity a = new AuditLogEntity(); a.actorEmail = actor; a.actionType = action; a.entityType = type; a.entityId = String.valueOf(id); a.details = details; audits.save(a);
    }

    RoomView roomView(RoomEntity r) {
        List<CapacityView> capacityViews = r.capacities.stream()
                .collect(Collectors.toMap(c -> c.layoutType, c -> c, (first, ignored) -> first,
                        () -> new EnumMap<>(LayoutType.class)))
                .values().stream()
                .sorted(Comparator.comparing(c -> c.layoutType.name()))
                .map(c -> new CapacityView(c.layoutType.name(), c.capacity))
                .toList();
        return new RoomView(r.id, r.code, r.name, r.building.name, r.location, r.bufferMinutes, r.status.name(), r.active,
                r.photoUrl, capacityViews,
                r.equipment.stream().filter(e -> e.deletedAt == null).sorted(Comparator.comparing(e -> e.name)).map(this::equipmentView).toList());
    }
    EquipmentView equipmentView(EquipmentEntity e) { return new EquipmentView(e.id, e.code, e.name, e.equipmentType.name(), e.totalQuantity, e.availableQuantity, e.status); }
    ReservationView view(ReservationRequestEntity r) {
        return new ReservationView(r.id, r.reference, r.requester.fullName, r.requester.email, r.subject, r.description, r.participantCount,
                r.startDate, r.endDate, r.startTime, r.endTime, r.layoutType.name(), r.physicalNeeds, r.technicalNeeds, r.observations,
                r.priorityLevel.name(), r.status.name(), r.assignedRoom == null ? null : roomView(r.assignedRoom), r.facilityValidated, r.itValidated,
                r.facilityNote, r.itNote, r.cancelReason, r.createdAt,
                r.occurrences.stream().map(o -> new OccurrenceView(o.id, o.occurrenceDate, o.startTime, o.endTime)).toList());
    }
}
