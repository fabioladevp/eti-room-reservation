package com.ecobank.eti.room_reservation;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
class UserAdministrationService {
    private final UserRepository users;
    private final RoleRepository roles;
    private final ReservationRepository requests;
    private final AssignmentRepository assignments;
    private final ValidationRepository validations;
    private final RoomBlockRepository blocks;
    private final NotificationRepository notifications;
    private final FeedbackRepository feedbacks;
    private final AuditLogRepository audits;
    private final PasswordEncoder passwordEncoder;

    UserAdministrationService(UserRepository users, RoleRepository roles, ReservationRepository requests,
                              AssignmentRepository assignments, ValidationRepository validations,
                              RoomBlockRepository blocks, NotificationRepository notifications,
                              FeedbackRepository feedbacks, AuditLogRepository audits,
                              PasswordEncoder passwordEncoder) {
        this.users = users; this.roles = roles; this.requests = requests; this.assignments = assignments;
        this.validations = validations; this.blocks = blocks; this.notifications = notifications;
        this.feedbacks = feedbacks; this.audits = audits; this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    List<UserView> list() {
        return users.findByDeletedAtIsNullOrderByFullNameAsc().stream().map(AuthController::view).toList();
    }

    @Transactional
    UserView create(String actorEmail, UserCreateRequest input) {
        verifyAdministratorPassword(actorEmail, input.adminPassword());
        String email = normalizeEmail(input.email());
        if (users.existsByEmailIgnoreCase(email)) throw new IllegalArgumentException("Cette adresse e-mail est déjà utilisée");
        UserEntity user = new UserEntity();
        user.fullName = input.fullName().trim();
        user.email = email;
        user.passwordHash = passwordEncoder.encode(input.password());
        user.language = input.language();
        user.active = input.active();
        user.roles = new LinkedHashSet<>(Set.of(role(input.role())));
        user = users.save(user);
        audit(actorEmail, "CREATE_USER", user.id, user.email + " - " + input.role());
        return AuthController.view(user);
    }

    @Transactional
    UserView update(String actorEmail, Long id, UserUpdateRequest input) {
        verifyAdministratorPassword(actorEmail, input.adminPassword());
        UserEntity user = activeDirectoryUser(id);
        String email = normalizeEmail(input.email());
        if (users.existsByEmailIgnoreCaseAndIdNot(email, id))
            throw new IllegalArgumentException("Cette adresse e-mail est déjà utilisée");
        boolean isSelf = user.email.equalsIgnoreCase(actorEmail);
        if (isSelf && (!input.active() || input.role() != RoleName.ADMIN))
            throw new IllegalStateException("Vous ne pouvez pas désactiver ou retirer votre propre rôle administrateur");
        protectLastAdministrator(user, input.role(), input.active());

        user.fullName = input.fullName().trim();
        user.email = email;
        user.language = input.language();
        user.active = input.active();
        user.roles = new LinkedHashSet<>(Set.of(role(input.role())));
        if (input.password() != null && !input.password().isBlank()) user.passwordHash = passwordEncoder.encode(input.password());
        audit(actorEmail, "UPDATE_USER", user.id, user.email + " - " + input.role() + " - actif=" + input.active());
        return AuthController.view(user);
    }

    @Transactional
    UserDeletionView delete(String actorEmail, Long id, AdminConfirmationRequest confirmation) {
        if (!confirmation.confirmed()) throw new IllegalArgumentException("La suppression doit être confirmée");
        verifyAdministratorPassword(actorEmail, confirmation.adminPassword());
        UserEntity user = activeDirectoryUser(id);
        if (user.email.equalsIgnoreCase(actorEmail)) throw new IllegalStateException("Vous ne pouvez pas supprimer votre propre compte");
        protectLastAdministrator(user, null, false);
        String details = user.email + " - " + user.fullName;

        if (hasBusinessHistory(id)) {
            user.active = false;
            user.deletedAt = LocalDateTime.now();
            audit(actorEmail, "ARCHIVE_USER", id, details);
            return new UserDeletionView(true, "Le compte a été archivé pour conserver l’historique des opérations.");
        }

        user.roles = new LinkedHashSet<>();
        users.flush();
        users.delete(user);
        audit(actorEmail, "DELETE_USER", id, details);
        return new UserDeletionView(false, "L’utilisateur a été supprimé.");
    }

    private boolean hasBusinessHistory(Long id) {
        return requests.existsByRequesterId(id) || assignments.existsByAssignedById(id)
                || validations.existsByValidatorId(id) || blocks.existsByAuthorId(id)
                || notifications.existsByUserId(id) || feedbacks.existsByRespondentId(id);
    }

    private void protectLastAdministrator(UserEntity user, RoleName newRole, boolean newActive) {
        boolean removesAdmin = user.primaryRole() == RoleName.ADMIN && (newRole != RoleName.ADMIN || !newActive);
        if (removesAdmin && users.countActiveByRole(RoleName.ADMIN) <= 1)
            throw new IllegalStateException("Le dernier administrateur actif ne peut pas être supprimé ou rétrogradé");
    }

    private UserEntity activeDirectoryUser(Long id) {
        UserEntity user = users.findById(id).orElseThrow(() -> new NoSuchElementException("Utilisateur introuvable"));
        if (user.deletedAt != null) throw new NoSuchElementException("Utilisateur introuvable");
        return user;
    }

    private RoleEntity role(RoleName role) {
        return roles.findByName(role).orElseThrow(() -> new NoSuchElementException("Rôle introuvable"));
    }

    private String normalizeEmail(String email) { return email.trim().toLowerCase(Locale.ROOT); }

    private void verifyAdministratorPassword(String actorEmail, String password) {
        UserEntity actor = users.findByEmailIgnoreCase(actorEmail)
                .orElseThrow(() -> new org.springframework.security.access.AccessDeniedException("Administrateur introuvable"));
        if (!passwordEncoder.matches(password, actor.passwordHash))
            throw new org.springframework.security.access.AccessDeniedException("Le mot de passe administrateur est incorrect");
    }

    private void audit(String actor, String action, Long id, String details) {
        AuditLogEntity log = new AuditLogEntity();
        log.actorEmail = actor; log.actionType = action; log.entityType = "USER";
        log.entityId = String.valueOf(id); log.details = details; audits.save(log);
    }
}
