package com.ecobank.eti.room_reservation;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

enum RoleName { USER, ADMIN, FACILITY, IT }
enum LayoutType { BOARDROOM, U_SHAPE, CLASSROOM, THEATRE, COCKTAIL }
enum RequestStatus {
    DRAFT, SUBMITTED, ASSIGNED, PENDING_FACILITY, PENDING_IT,
    REJECTED_FACILITY, REJECTED_IT, TO_REASSIGN, CONFIRMED, CANCELLED, COMPLETED, EXPIRED
}
enum RoomStatus { AVAILABLE, OCCUPIED, BLOCKED, MAINTENANCE }
enum EquipmentType { FIXED, MOBILE }
enum PriorityLevel { NORMAL, PRIORITY }
enum FeedbackCriterion {
    VENUE, SETTING_DECOR, STARTING_CLOSING_TIME, SNACKS_QUALITY, SNACKS_QUANTITY,
    LUNCH_QUALITY, LUNCH_QUANTITY, WASHROOM_CLEANLINESS, DINNER_TIME, DINNER_QUALITY,
    DINNER_QUANTITY, EVENT_SCHEDULE, HOTEL_ROOMS_QUALITY, AIRPORT_PICKUP,
    VISA_PROCESS, PRE_CONFERENCE_COMMUNICATION, NETWORK_INTERNET, AUDIO_VISUAL_QUALITY,
    OVERALL_PROGRAMME
}

@Entity @Table(name = "roles")
class RoleEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Enumerated(EnumType.STRING) @Column(nullable = false, unique = true) RoleName name;
}

@Entity @Table(name = "users")
class UserEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(nullable = false, unique = true) String email;
    @Column(name = "password_hash", nullable = false) String passwordHash;
    @Column(name = "full_name", nullable = false) String fullName;
    @Column(nullable = false) String language = "fr";
    @Column(nullable = false) boolean active = true;
    @Column(name = "created_at", nullable = false) LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "deleted_at") LocalDateTime deletedAt;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<RoleEntity> roles = new LinkedHashSet<>();
    RoleName primaryRole() { return roles.stream().map(r -> r.name).findFirst().orElse(RoleName.USER); }
}

@Entity @Table(name = "buildings")
class BuildingEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(nullable = false, unique = true) String code;
    @Column(nullable = false) String name;
}

@Entity @Table(name = "equipment")
class EquipmentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(nullable = false, unique = true) String code;
    @Column(nullable = false) String name;
    @Enumerated(EnumType.STRING) @Column(name = "equipment_type", nullable = false) EquipmentType equipmentType;
    @Column(name = "total_quantity", nullable = false) int totalQuantity;
    @Column(name = "available_quantity", nullable = false) int availableQuantity;
    @Column(nullable = false) String status = "AVAILABLE";
    @Column(nullable = false) boolean active = true;
    @Column(name = "deleted_at") LocalDateTime deletedAt;
}

@Entity @Table(name = "rooms")
class RoomEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(nullable = false, unique = true) String code;
    @Column(nullable = false) String name;
    @ManyToOne(fetch = FetchType.EAGER, optional = false) @JoinColumn(name = "building_id") BuildingEntity building;
    String location;
    @Column(name = "buffer_minutes", nullable = false) int bufferMinutes;
    @Enumerated(EnumType.STRING) @Column(nullable = false) RoomStatus status = RoomStatus.AVAILABLE;
    @Column(nullable = false) boolean active = true;
    @Column(name = "photo_url") String photoUrl;
    @Column(name = "deleted_at") LocalDateTime deletedAt;
    @Column(name = "deletion_reason") String deletionReason;
    @Version long version;
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY) List<RoomCapacityEntity> capacities = new ArrayList<>();
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "room_equipment", joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"))
    Set<EquipmentEntity> equipment = new LinkedHashSet<>();
}

@Entity @Table(name = "room_capacities")
class RoomCapacityEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "room_id") RoomEntity room;
    @Enumerated(EnumType.STRING) @Column(name = "layout_type", nullable = false) LayoutType layoutType;
    @Column(nullable = false) int capacity;
}

@Entity @Table(name = "reservation_requests")
class ReservationRequestEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(nullable = false, unique = true) String reference;
    @ManyToOne(fetch = FetchType.EAGER, optional = false) @JoinColumn(name = "requester_id") UserEntity requester;
    @Column(nullable = false) String subject;
    @Column(columnDefinition = "TEXT") String description;
    @Column(name = "participant_count", nullable = false) int participantCount;
    @Column(name = "start_date", nullable = false) LocalDate startDate;
    @Column(name = "end_date", nullable = false) LocalDate endDate;
    @Column(name = "start_time", nullable = false) LocalTime startTime;
    @Column(name = "end_time", nullable = false) LocalTime endTime;
    @Enumerated(EnumType.STRING) @Column(name = "layout_type", nullable = false) LayoutType layoutType;
    @Column(name = "physical_needs") String physicalNeeds;
    @Column(name = "technical_needs") String technicalNeeds;
    String observations;
    @Enumerated(EnumType.STRING) @Column(name = "priority_level", nullable = false) PriorityLevel priorityLevel = PriorityLevel.NORMAL;
    @Enumerated(EnumType.STRING) @Column(nullable = false) RequestStatus status = RequestStatus.SUBMITTED;
    @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "assigned_room_id") RoomEntity assignedRoom;
    @Column(name = "facility_validated") Boolean facilityValidated;
    @Column(name = "it_validated") Boolean itValidated;
    @Column(name = "facility_note") String facilityNote;
    @Column(name = "it_note") String itNote;
    @Column(name = "cancel_reason") String cancelReason;
    @Column(name = "created_at", nullable = false) LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "updated_at", nullable = false) LocalDateTime updatedAt = LocalDateTime.now();
    @Column(name = "feedback_invitation_sent_at") LocalDateTime feedbackInvitationSentAt;
    @Version long version;
    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("occurrenceDate ASC") List<ReservationOccurrenceEntity> occurrences = new ArrayList<>();
}

@Entity @Table(name = "reservation_occurrences")
class ReservationOccurrenceEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "request_id") ReservationRequestEntity request;
    @Column(name = "occurrence_date", nullable = false) LocalDate occurrenceDate;
    @Column(name = "start_time", nullable = false) LocalTime startTime;
    @Column(name = "end_time", nullable = false) LocalTime endTime;
}

@Entity @Table(name = "assignments")
class AssignmentEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "request_id") ReservationRequestEntity request;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "room_id") RoomEntity room;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "assigned_by") UserEntity assignedBy;
    @Column(nullable = false) boolean active = true;
    String justification;
    @Column(name = "assigned_at", nullable = false) LocalDateTime assignedAt = LocalDateTime.now();
}

@Entity @Table(name = "validation_records")
class ValidationRecordEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "request_id") ReservationRequestEntity request;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "validator_id") UserEntity validator;
    @Column(name = "validation_type", nullable = false) String validationType;
    @Column(nullable = false) String decision;
    String justification;
    @Column(name = "created_at", nullable = false) LocalDateTime createdAt = LocalDateTime.now();
}

@Entity @Table(name = "room_blocks")
class RoomBlockEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "room_id") RoomEntity room;
    @Column(name = "start_at", nullable = false) LocalDateTime startAt;
    @Column(name = "end_at", nullable = false) LocalDateTime endAt;
    @Column(nullable = false) String reason;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "author_id") UserEntity author;
    @Column(nullable = false) boolean active = true;
}

@Entity @Table(name = "notifications")
class NotificationEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id") UserEntity user;
    @Column(nullable = false) String title;
    @Column(nullable = false) String message;
    @Column(name = "event_type", nullable = false) String eventType;
    @Column(name = "read_flag", nullable = false) boolean readFlag;
    @Column(name = "created_at", nullable = false) LocalDateTime createdAt = LocalDateTime.now();
}

@Entity @Table(name = "feedbacks")
class FeedbackEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @OneToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "request_id", unique = true) ReservationRequestEntity request;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "respondent_id") UserEntity respondent;
    @Column(name = "room_rating", nullable = false) int roomRating;
    @Column(name = "comfort_rating", nullable = false) int comfortRating;
    @Column(name = "equipment_rating", nullable = false) int equipmentRating;
    @Column(name = "support_rating", nullable = false) int supportRating;
    @Column(name = "overall_rating", nullable = false) int overallRating = 3;
    @Column(name = "comment_text") String commentText;
    @Column(nullable = false) String language;
    @Column(name = "created_at", nullable = false) LocalDateTime createdAt = LocalDateTime.now();
    @OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL, orphanRemoval = true)
    List<FeedbackAnswerEntity> answers = new ArrayList<>();
}

@Entity @Table(name = "feedback_answers")
class FeedbackAnswerEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "feedback_id") FeedbackEntity feedback;
    @Enumerated(EnumType.STRING) @Column(name = "criterion_code", nullable = false) FeedbackCriterion criterion;
    @Column(nullable = false) int rating;
}

@Entity @Table(name = "audit_logs")
class AuditLogEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(name = "actor_email", nullable = false) String actorEmail;
    @Column(name = "action_type", nullable = false) String actionType;
    @Column(name = "entity_type", nullable = false) String entityType;
    @Column(name = "entity_id") String entityId;
    String details;
    @Column(name = "created_at", nullable = false) LocalDateTime createdAt = LocalDateTime.now();
}
