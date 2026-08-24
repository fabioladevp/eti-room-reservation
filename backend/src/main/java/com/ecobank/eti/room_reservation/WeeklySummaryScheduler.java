package com.ecobank.eti.room_reservation;

import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Component;

@Component
class WeeklySummaryScheduler {
    private final UserRepository users;
    private final NotificationService notifications;
    private final ReportingService reporting;
    WeeklySummaryScheduler(UserRepository users, NotificationService notifications, ReportingService reporting) {
        this.users=users; this.notifications=notifications; this.reporting=reporting;
    }

    @Scheduled(cron = "0 0 10 * * FRI", zone = "Africa/Lome")
    void sendWeeklySummary() {
        DashboardView d = reporting.dashboard();
        users.findAll().stream().filter(u -> u.active && u.roles.stream().anyMatch(r -> r.name == RoleName.ADMIN || r.name == RoleName.FACILITY || r.name == RoleName.IT))
                .forEach(u -> notifications.notify(u, "WEEKLY_REPORT", "Récapitulatif hebdomadaire",
                        "Total réunions : " + d.totalMeetings() + " ; demandes en attente : " + d.pendingRequests() + ".",
                        "Weekly summary", "Total meetings: " + d.totalMeetings() + "; pending requests: " + d.pendingRequests() + "."));
    }
}
