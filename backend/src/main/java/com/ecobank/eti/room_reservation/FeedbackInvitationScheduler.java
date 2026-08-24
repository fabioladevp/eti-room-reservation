package com.ecobank.eti.room_reservation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.EnumSet;

@Component
class FeedbackInvitationScheduler {
    private static final ZoneId LOME = ZoneId.of("Africa/Lome");
    private final ReservationRepository requests;
    private final FeedbackRepository feedbacks;
    private final NotificationService notifications;
    private final AuditLogRepository audits;
    private final String frontendUrl;

    FeedbackInvitationScheduler(ReservationRepository requests, FeedbackRepository feedbacks,
                                NotificationService notifications, AuditLogRepository audits,
                                @Value("${app.frontend-url:http://localhost:4200}") String frontendUrl) {
        this.requests = requests; this.feedbacks = feedbacks; this.notifications = notifications;
        this.audits = audits; this.frontendUrl = frontendUrl.replaceAll("/+$", "");
    }

    @Scheduled(cron = "0 0 8 * * *", zone = "Africa/Lome")
    @Transactional
    void sendFeedbackInvitations() {
        LocalDate today = LocalDate.now(LOME);
        LocalDateTime sentAt = LocalDateTime.now(LOME);
        requests.findFeedbackInvitationCandidates(today, EnumSet.of(RequestStatus.CONFIRMED, RequestStatus.COMPLETED))
                .forEach(request -> {
                    if (!feedbacks.existsByRequestId(request.id)) {
                        String link = frontendUrl + "/feedback/" + request.id;
                        notifications.notify(request.requester, "FEEDBACK_INVITATION",
                                "Votre avis sur " + request.reference,
                                "Votre réunion est terminée. Merci de répondre au questionnaire de satisfaction : " + link,
                                "Your feedback on " + request.reference,
                                "Your meeting is over. Please complete the satisfaction questionnaire: " + link);
                        AuditLogEntity audit = new AuditLogEntity();
                        audit.actorEmail = "system@eti.local"; audit.actionType = "SEND_FEEDBACK_INVITATION";
                        audit.entityType = "RESERVATION"; audit.entityId = String.valueOf(request.id);
                        audit.details = "Invitation J+1 envoyée à " + request.requester.email; audits.save(audit);
                    }
                    request.feedbackInvitationSentAt = sentAt;
                });
    }
}
