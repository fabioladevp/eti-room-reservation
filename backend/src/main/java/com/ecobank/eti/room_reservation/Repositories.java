package com.ecobank.eti.room_reservation;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.time.*;
import java.util.*;

interface RoleRepository extends JpaRepository<RoleEntity, Long> { Optional<RoleEntity> findByName(RoleName name); }
interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("select u from UserEntity u where lower(u.email)=lower(:email) and u.deletedAt is null")
    Optional<UserEntity> findByEmailIgnoreCase(@Param("email") String email);
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);
    List<UserEntity> findByDeletedAtIsNullOrderByFullNameAsc();
    @Query("select count(distinct u) from UserEntity u join u.roles r where r.name=:role and u.active=true and u.deletedAt is null")
    long countActiveByRole(@Param("role") RoleName role);
}
interface BuildingRepository extends JpaRepository<BuildingEntity, Long> { Optional<BuildingEntity> findByCodeIgnoreCase(String code); }
interface EquipmentRepository extends JpaRepository<EquipmentEntity, Long> {
    @Query("select e from EquipmentEntity e where e.code=:code and e.deletedAt is null")
    Optional<EquipmentEntity> findByCode(@Param("code") String code);
    List<EquipmentEntity> findByDeletedAtIsNullOrderByNameAsc();
    boolean existsByCodeIgnoreCase(String code);
}
interface RoomCapacityRepository extends JpaRepository<RoomCapacityEntity, Long> { void deleteByRoomId(Long roomId); }

interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    @Query("select distinct r from RoomEntity r join fetch r.building left join fetch r.capacities left join fetch r.equipment where r.deletedAt is null order by r.id")
    List<RoomEntity> findCatalog();
    @Query(value = "select * from rooms where id=:id for update", nativeQuery = true)
    Optional<RoomEntity> findByIdForUpdate(@Param("id") Long id);
    boolean existsByCodeIgnoreCase(String code);
    boolean existsByCodeIgnoreCaseAndIdNot(String code, Long id);
}

interface ReservationRepository extends JpaRepository<ReservationRequestEntity, Long> {
    @Query("select distinct r from ReservationRequestEntity r join fetch r.requester left join fetch r.assignedRoom left join fetch r.occurrences where r.id=:id")
    Optional<ReservationRequestEntity> findDetailed(@Param("id") Long id);
    @Query(value = "select * from reservation_requests where id=:id for update", nativeQuery = true)
    Optional<ReservationRequestEntity> findByIdForUpdate(@Param("id") Long id);
    List<ReservationRequestEntity> findByRequesterEmailIgnoreCaseOrderByCreatedAtDesc(String email);
    List<ReservationRequestEntity> findAllByOrderByCreatedAtDesc();
    List<ReservationRequestEntity> findByStatusInOrderByCreatedAtAsc(Collection<RequestStatus> statuses);
    @Query("select distinct r from ReservationRequestEntity r join fetch r.requester left join fetch r.occurrences where r.status in :statuses")
    List<ReservationRequestEntity> findExpirationCandidates(@Param("statuses") Collection<RequestStatus> statuses);
    @Query("select r from ReservationRequestEntity r join fetch r.requester where r.feedbackInvitationSentAt is null and r.status in :statuses and (select max(o.occurrenceDate) from ReservationOccurrenceEntity o where o.request=r) < :today")
    List<ReservationRequestEntity> findFeedbackInvitationCandidates(@Param("today") LocalDate today,
                                                                     @Param("statuses") Collection<RequestStatus> statuses);
    @Query("select distinct r from ReservationRequestEntity r join fetch r.occurrences where r.assignedRoom.id=:roomId and r.status in :statuses")
    List<ReservationRequestEntity> findActiveForRoom(@Param("roomId") Long roomId, @Param("statuses") Collection<RequestStatus> statuses);
    long countByStatus(RequestStatus status);
    long countByPriorityLevel(PriorityLevel priorityLevel);
    boolean existsByRequesterId(Long requesterId);
}

interface AssignmentRepository extends JpaRepository<AssignmentEntity, Long> { List<AssignmentEntity> findByRequestIdAndActiveTrue(Long requestId); boolean existsByAssignedById(Long userId); }
interface ValidationRepository extends JpaRepository<ValidationRecordEntity, Long> { boolean existsByValidatorId(Long userId); }
interface RoomBlockRepository extends JpaRepository<RoomBlockEntity, Long> {
    @Query("select b from RoomBlockEntity b where b.room.id=:roomId and b.active=true and b.startAt < :end and b.endAt > :start")
    List<RoomBlockEntity> findOverlapping(@Param("roomId") Long roomId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    boolean existsByAuthorId(Long userId);
}
interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByUserEmailIgnoreCaseOrderByCreatedAtDesc(String email);
    long countByUserEmailIgnoreCaseAndReadFlagFalse(String email);
    boolean existsByUserId(Long userId);
}
interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long> {
    boolean existsByRequestId(Long requestId);
    boolean existsByRespondentId(Long userId);
    Optional<FeedbackEntity> findByRequestId(Long requestId);
    @Query("select distinct f from FeedbackEntity f join fetch f.request r join fetch f.respondent left join fetch r.assignedRoom left join fetch f.answers order by f.createdAt desc")
    List<FeedbackEntity> findDetailedAll();
    @Query("select avg((f.roomRating + f.comfortRating + f.equipmentRating + f.supportRating) / 4.0) from FeedbackEntity f") Double averageRating();
}
interface FeedbackAnswerRepository extends JpaRepository<FeedbackAnswerEntity, Long> {
    @Query("select avg(a.rating) from FeedbackAnswerEntity a") Double averageRating();
}
interface AuditLogRepository extends JpaRepository<AuditLogEntity, Long> { List<AuditLogEntity> findTop200ByOrderByCreatedAtDesc(); }
