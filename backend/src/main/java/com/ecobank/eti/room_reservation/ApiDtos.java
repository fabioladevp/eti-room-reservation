package com.ecobank.eti.room_reservation;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.time.*;
import java.util.*;

record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
record UserView(Long id, String email, String fullName, String role, String language, boolean active) {}
record LoginResponse(String token, UserView user) {}
record CapacityView(String layout, int capacity) {}
record EquipmentView(Long id, String code, String name, String type, int totalQuantity, int availableQuantity, String status) {}
record RoomView(Long id, String code, String name, String building, String location, int bufferMinutes,
                String status, boolean active, String photoUrl, List<CapacityView> capacities,
                List<EquipmentView> equipment) {}
record OccurrenceView(Long id, LocalDate date, LocalTime startTime, LocalTime endTime) {}
record ReservationView(Long id, String reference, String requesterName, String requesterEmail, String subject,
                       String description, int participantCount, LocalDate startDate, LocalDate endDate,
                       LocalTime startTime, LocalTime endTime, String layout, String physicalNeeds,
                       String technicalNeeds, String observations, String priority, String status,
                       RoomView assignedRoom, Boolean facilityValidated, Boolean itValidated,
                       String facilityNote, String itNote, String cancelReason, LocalDateTime createdAt,
                       List<OccurrenceView> occurrences) {}
record OccurrenceScheduleRequest(@NotNull LocalDate date, @NotNull LocalTime startTime, @NotNull LocalTime endTime) {}
record CreateReservationRequest(
        @NotBlank @Size(max=200) String subject,
        @Size(max=4000) String description,
        @Min(1) int participantCount,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotNull LocalTime startTime,
        @NotNull LocalTime endTime,
        @NotNull LayoutType layout,
        @Size(max=1000) String physicalNeeds,
        @Size(max=1000) String technicalNeeds,
        @Size(max=1000) String observations,
        PriorityLevel priority,
        List<@Valid OccurrenceScheduleRequest> occurrences) {}
record CompatibilityView(Long roomId, String roomName, boolean compatible, List<String> reasons) {}
record AssignmentRequest(@NotNull Long roomId, @Size(max=1000) String justification) {}
record PriorityUpdateRequest(@NotNull PriorityLevel priority) {}
record DecisionRequest(boolean approved, @Size(max=1000) String justification) {}
record CancelRequest(@NotBlank @Size(max=1000) String reason) {}
record FeedbackRequest(@NotNull Map<FeedbackCriterion, @NotNull @Min(1) @Max(5) Integer> answers,
                       @NotNull @Min(1) @Max(5) Integer overallRating,
                       @Size(max=2000) String comment, @Pattern(regexp="fr|en") String language) {}
record FeedbackStatusView(boolean eligible, boolean submitted, LocalDate availableFrom) {}
record FeedbackReservationView(Long requestId, String reference, String subject, String roomName,
                               LocalDate eventDate, LocalDate availableFrom, boolean eligible,
                               boolean submitted, Double average, LocalDateTime submittedAt) {}
record FeedbackAnswerView(String criterion, int rating) {}
record FeedbackDetailView(Long id, Long requestId, String reference, String subject, String roomName,
                          String respondentName, LocalDate eventDate, List<FeedbackAnswerView> answers,
                          String comment, String language, LocalDateTime createdAt, double average) {}
record NotificationView(Long id, String title, String message, String eventType, boolean read, LocalDateTime createdAt) {}
record NotificationCountView(long unread) {}
record DashboardView(long totalMeetings, double reservedHours, long totalParticipants, double occupancyRate,
                     long pendingRequests, long cancellations, long priorityRequests, double satisfactionAverage,
                     Map<String, Long> byStatus, Map<String, Long> byBuilding, Map<String, Long> byRoom) {}
record AuditView(Long id, String actorEmail, String actionType, String entityType, String entityId,
                 String details, LocalDateTime createdAt) {}
record RoomCreateRequest(
        @NotBlank @Pattern(regexp="[A-Za-z0-9-]{2,30}") String code,
        @NotBlank @Size(max=160) String name,
        @NotBlank String buildingCode,
        @NotBlank @Size(max=160) String location,
        @Min(0) int bufferMinutes,
        @NotNull RoomStatus status,
        boolean active,
        @Size(max=255) String photoUrl,
        @NotEmpty Map<LayoutType, @Min(1) Integer> capacities,
        Set<@NotBlank String> equipmentCodes) {}
record EquipmentUpdateRequest(@Min(0) int availableQuantity, @NotBlank String status, boolean active) {}
record EquipmentCreateRequest(
        @NotBlank @Pattern(regexp="[A-Za-z0-9_\\-]{2,40}") String code,
        @NotBlank @Size(max=100) String name,
        @NotNull EquipmentType type,
        @Min(0) int totalQuantity,
        @Min(0) int availableQuantity,
        @NotBlank @Pattern(regexp="AVAILABLE|MAINTENANCE|BLOCKED") String status,
        boolean active) {}
record DeleteReasonRequest(@NotBlank @Size(max=1000) String justification) {}
record ResourceDeletionView(String message) {}
record UserCreateRequest(@NotBlank @Size(max=160) String fullName, @Email @NotBlank @Size(max=190) String email,
                         @NotBlank @Pattern(regexp="^(?=\\S{8,100}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).*$",
                                 message="doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial, sans espace") String password,
                         @NotNull RoleName role, @NotBlank @Pattern(regexp="fr|en") String language, boolean active,
                         @NotBlank @Size(max=100) String adminPassword) {}
record UserUpdateRequest(@NotBlank @Size(max=160) String fullName, @Email @NotBlank @Size(max=190) String email,
                         @Pattern(regexp="^$|^(?=\\S{8,100}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).*$",
                                 message="doit être vide ou respecter toutes les règles de sécurité") String password,
                         @NotNull RoleName role, @NotBlank @Pattern(regexp="fr|en") String language, boolean active,
                         @NotBlank @Size(max=100) String adminPassword) {}
record AdminConfirmationRequest(@NotBlank @Size(max=100) String adminPassword, @AssertTrue boolean confirmed) {}
record UserDeletionView(boolean archived, String message) {}
