package com.ecobank.eti.room_reservation;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Component
class RequestExpirationScheduler {
    private static final ZoneId LOME = ZoneId.of("Africa/Lome");
    private static final Set<RequestStatus> EXPIRABLE = EnumSet.of(
            RequestStatus.DRAFT, RequestStatus.SUBMITTED, RequestStatus.ASSIGNED,
            RequestStatus.PENDING_FACILITY, RequestStatus.PENDING_IT,
            RequestStatus.REJECTED_FACILITY, RequestStatus.REJECTED_IT, RequestStatus.TO_REASSIGN);
    private static final Set<RoleName> ACTOR_ROLES = EnumSet.of(
            RoleName.ADMIN, RoleName.FACILITY, RoleName.IT);
    private static final DateTimeFormatter FR_DATE_TIME = DateTimeFormatter.ofPattern("dd/MM/yyyy 'à' HH:mm");
    private static final DateTimeFormatter EN_DATE_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final ReservationRepository requests;
    private final AssignmentRepository assignments;
    private final UserRepository users;
    private final NotificationService notifications;
    private final AuditLogRepository audits;

    RequestExpirationScheduler(ReservationRepository requests, AssignmentRepository assignments,
                               UserRepository users, NotificationService notifications,
                               AuditLogRepository audits) {
        this.requests = requests;
        this.assignments = assignments;
        this.users = users;
        this.notifications = notifications;
        this.audits = audits;
    }

    @Scheduled(cron = "0 * * * * *", zone = "Africa/Lome")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    void expireOverdueRequests() {
        expireOverdueRequests(LocalDateTime.now(LOME));
    }

    void expireOverdueRequests(LocalDateTime now) {
        requests.findExpirationCandidates(EXPIRABLE).forEach(request -> {
            LocalDateTime firstOccurrence = request.occurrences.stream()
                    .map(occurrence -> LocalDateTime.of(occurrence.occurrenceDate, occurrence.startTime))
                    .min(Comparator.naturalOrder())
                    .orElse(null);
            if (firstOccurrence == null || firstOccurrence.isAfter(now)) return;

            assignments.findByRequestIdAndActiveTrue(request.id).forEach(assignment -> assignment.active = false);
            request.assignedRoom = null;
            request.status = RequestStatus.EXPIRED;
            request.updatedAt = now;

            AuditLogEntity audit = new AuditLogEntity();
            audit.actorEmail = "system@eti.local";
            audit.actionType = "EXPIRE_REQUEST";
            audit.entityType = "RESERVATION";
            audit.entityId = String.valueOf(request.id);
            audit.details = request.reference + " - échéance " + firstOccurrence;
            audits.save(audit);

            Map<Long, UserEntity> recipients = new LinkedHashMap<>();
            recipients.put(request.requester.id, request.requester);
            users.findAll().stream()
                    .filter(user -> user.active && user.deletedAt == null)
                    .filter(user -> user.roles.stream().anyMatch(role -> ACTOR_ROLES.contains(role.name)))
                    .forEach(user -> recipients.put(user.id, user));

            String frenchDeadline = firstOccurrence.format(FR_DATE_TIME);
            String englishDeadline = firstOccurrence.format(EN_DATE_TIME);
            recipients.values().forEach(user -> notifications.notify(user, "REQUEST_EXPIRED",
                    "Demande expirée",
                    "La demande " + request.reference + " a expiré : sa première occurrence du "
                            + frenchDeadline + " est passée sans confirmation. Aucune action n’est désormais possible.",
                    "Request expired",
                    "Request " + request.reference + " expired because its first occurrence on "
                            + englishDeadline + " passed without confirmation. No further action is possible."));
        });
    }
}
