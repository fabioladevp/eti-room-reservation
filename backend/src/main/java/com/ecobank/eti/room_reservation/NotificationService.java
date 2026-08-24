package com.ecobank.eti.room_reservation;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
class NotificationService {
    private final NotificationRepository notifications;
    private final JavaMailSender mailSender;
    private final boolean mailEnabled;
    private final String mailFrom;

    NotificationService(NotificationRepository notifications, JavaMailSender mailSender,
                        @Value("${app.mail-enabled:false}") boolean mailEnabled,
                        @Value("${app.mail-from:no-reply@eti.local}") String mailFrom) {
        this.notifications = notifications; this.mailSender = mailSender;
        this.mailEnabled = mailEnabled; this.mailFrom = mailFrom;
    }

    @Transactional
    void notify(UserEntity user, String eventType, String titleFr, String messageFr, String titleEn, String messageEn) {
        boolean english = "en".equalsIgnoreCase(user.language);
        String title = english ? titleEn : titleFr;
        String message = english ? messageEn : messageFr;
        NotificationEntity n = new NotificationEntity();
        n.user = user; n.eventType = eventType; n.title = title; n.message = message;
        notifications.save(n);
        if (!mailEnabled) return;
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setFrom(mailFrom); email.setTo(user.email); email.setSubject("ETI Salles - " + title); email.setText(message);
            mailSender.send(email);
        } catch (RuntimeException ignored) {
            // La notification interne est déjà persistée; l'échec SMTP ne bloque jamais le workflow.
        }
    }
}
