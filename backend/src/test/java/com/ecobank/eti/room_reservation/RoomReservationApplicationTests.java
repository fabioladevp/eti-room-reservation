package com.ecobank.eti.room_reservation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;

import java.time.*;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class RoomReservationApplicationTests {
    static final String USER = "amelie.koffi@ecobank.com";
    static final String ADMIN = "admin.rooms@ecobank.com";
    static final String PASSWORD = "Ecobank-demo-2026!";

    @Autowired ReservationService service;
    @Autowired ReportingService reporting;
    @Autowired ReservationRepository requests;
    @Autowired AssignmentRepository assignments;
    @Autowired RoomRepository rooms;
    @Autowired RoomBlockRepository blocks;
    @Autowired EquipmentRepository equipment;
    @Autowired UserRepository users;
    @Autowired UserAdministrationService userAdministration;
    @Autowired FeedbackAnswerRepository feedbackAnswers;
    @Autowired FeedbackInvitationScheduler feedbackInvitationScheduler;
    @Autowired RequestExpirationScheduler requestExpirationScheduler;
    @Autowired NotificationRepository notifications;
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @Autowired EntityManager entityManager;

    @Test void contextAndFlywaySchemaLoad() {
        assertThat(rooms.findCatalog()).hasSize(14);
        assertThat(rooms.findCatalog()).allSatisfy(room ->
                assertThat(room.equipment).extracting(item -> item.code)
                        .contains("AIR_CONDITIONING", "WIFI"));
        assertThat(service.catalog()).allSatisfy(room ->
                assertThat(room.capacities()).extracting(CapacityView::layout).doesNotHaveDuplicates());
        assertThat(users.findAll()).hasSize(4);
    }

    @Test void authenticatedActorCanReadUnreadNotificationCount() throws Exception {
        UserEntity user = users.findByEmailIgnoreCase(USER).orElseThrow();
        NotificationEntity notification = new NotificationEntity();
        notification.user = user; notification.title = "Test"; notification.message = "Notification non lue";
        notification.eventType = "TEST"; notifications.save(notification);
        String token = login(USER);

        mvc.perform(get("/notifications/unread-count").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.unread").value(1));
        mvc.perform(patch("/notifications/read-all").header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
        mvc.perform(get("/notifications/unread-count").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.unread").value(0));
    }

    @Test void newRoomsAlwaysIncludeAirConditioningAndWifi() {
        RoomView room = service.createRoom(ADMIN, new RoomCreateRequest(
                "TEST-CONNECT", "Salle connectée", "ACADEMIE", "Rez-de-chaussée", 20,
                RoomStatus.AVAILABLE, true, "/assets/rooms/meeting.svg",
                Map.of(LayoutType.BOARDROOM, 8), Set.of("PROJECTION")));

        assertThat(room.equipment()).extracting(EquipmentView::code)
                .contains("AIR_CONDITIONING", "WIFI", "PROJECTION");
    }

    @Test void administratorCanCreateAndDeleteEquipment() throws Exception {
        String token = login(ADMIN);
        EquipmentCreateRequest input = new EquipmentCreateRequest(
                "PORTABLE_SCREEN", "Écran portable", EquipmentType.MOBILE,
                3, 2, "AVAILABLE", true);
        String createdJson = mvc.perform(post("/admin/equipment")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(input)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("PORTABLE_SCREEN"))
                .andExpect(jsonPath("$.totalQuantity").value(3))
                .andReturn().getResponse().getContentAsString();
        Long id = mapper.readTree(createdJson).get("id").asLong();

        mvc.perform(delete("/admin/equipment/{id}", id)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        assertThat(service.equipment()).extracting(EquipmentView::code).doesNotContain("PORTABLE_SCREEN");

        mvc.perform(delete("/admin/equipment/{id}", 1L)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isConflict());
    }

    @Test void administratorCanModifyAndDeleteRoomWithRequiredJustification() throws Exception {
        RoomView created = service.createRoom(ADMIN, new RoomCreateRequest(
                "EDIT-ROOM", "Salle à modifier", "ACADEMIE", "1er étage", 15,
                RoomStatus.AVAILABLE, true, "/assets/rooms/meeting.svg",
                Map.of(LayoutType.BOARDROOM, 8), Set.of()));
        String token = login(ADMIN);
        RoomCreateRequest update = new RoomCreateRequest(
                "EDITED-ROOM", "Salle modifiée", "PAC", "2e étage", 30,
                RoomStatus.MAINTENANCE, true, "/assets/rooms/boardroom.svg",
                Map.of(LayoutType.U_SHAPE, 16, LayoutType.THEATRE, 30), Set.of("PROJECTION"));

        mvc.perform(put("/admin/rooms/{id}", created.id())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("EDITED-ROOM"))
                .andExpect(jsonPath("$.building").value("PAC"))
                .andExpect(jsonPath("$.capacities.length()").value(2))
                .andExpect(jsonPath("$.equipment[?(@.code == 'WIFI')]").exists())
                .andExpect(jsonPath("$.equipment[?(@.code == 'AIR_CONDITIONING')]").exists());

        mvc.perform(delete("/admin/rooms/{id}", created.id())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"justification\":\"\"}"))
                .andExpect(status().isBadRequest());

        mvc.perform(delete("/admin/rooms/{id}", created.id())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"justification\":\"Réaménagement définitif de l’espace\"}"))
                .andExpect(status().isOk());
        assertThat(service.catalog()).extracting(RoomView::id).doesNotContain(created.id());
        RoomEntity deleted = rooms.findById(created.id()).orElseThrow();
        assertThat(deleted.deletionReason).isEqualTo("Réaménagement définitif de l’espace");
    }

    @Test void administratorCanUploadReplaceAndRemoveRoomPhoto() throws Exception {
        String token = login(ADMIN);
        MockMultipartFile photo = new MockMultipartFile(
                "file", "salle.png", "image/png", new byte[]{(byte) 137, 80, 78, 71, 1, 2, 3});

        String updatedJson = mvc.perform(multipart("/admin/rooms/{id}/photo", 2L)
                        .file(photo).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.photoUrl").value(org.hamcrest.Matchers.startsWith("/api/uploads/rooms/")))
                .andReturn().getResponse().getContentAsString();
        String publicUrl = mapper.readTree(updatedJson).get("photoUrl").asText();

        mvc.perform(get(publicUrl.substring("/api".length())))
                .andExpect(status().isOk())
                .andExpect(content().contentType("image/png"));

        mvc.perform(delete("/admin/rooms/{id}/photo", 2L)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.photoUrl").value("/assets/rooms/meeting.svg"));
        mvc.perform(get(publicUrl.substring("/api".length()))).andExpect(status().isNotFound());
    }

    @Test void loginWorksForFourRolesAndUserCannotOpenAdminRoute() throws Exception {
        for (String email : List.of(USER, ADMIN, "facility.rooms@ecobank.com", "it.rooms@ecobank.com")) {
            mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(new LoginRequest(email, PASSWORD))))
                    .andExpect(status().isOk()).andExpect(jsonPath("$.token").isNotEmpty());
        }
        String token = login(USER);
        mvc.perform(get("/admin/dashboard").header("Authorization", "Bearer " + token)).andExpect(status().isForbidden());
    }

    @Test void administratorCanCreateUpdateAndDeleteUser() throws Exception {
        String token = login(ADMIN);
        UserCreateRequest weakPassword = new UserCreateRequest("Utilisateur Faible", "weak.user@ecobank.com",
                "faible", RoleName.USER, "fr", true, PASSWORD);
        mvc.perform(post("/admin/users").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(weakPassword)))
                .andExpect(status().isBadRequest());
        UserCreateRequest wrongAdminPassword = new UserCreateRequest("Utilisateur Refusé", "denied.user@ecobank.com",
                "MotDePasse-2026!", RoleName.USER, "fr", true, "mauvais-mot-de-passe");
        mvc.perform(post("/admin/users").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(wrongAdminPassword)))
                .andExpect(status().isForbidden());
        UserCreateRequest create = new UserCreateRequest("Utilisateur Test", "user.test@ecobank.com",
                "Abcd123!", RoleName.USER, "fr", true, PASSWORD);
        String createdJson = mvc.perform(post("/admin/users").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(create)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.email").value("user.test@ecobank.com"))
                .andReturn().getResponse().getContentAsString();
        Long id = mapper.readTree(createdJson).get("id").asLong();

        UserUpdateRequest update = new UserUpdateRequest("Utilisateur Test Modifié", "user.test@ecobank.com",
                "", RoleName.IT, "en", true, PASSWORD);
        mvc.perform(put("/admin/users/{id}", id).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(update)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.fullName").value("Utilisateur Test Modifié"))
                .andExpect(jsonPath("$.role").value("IT"));

        mvc.perform(delete("/admin/users/{id}", id).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(new AdminConfirmationRequest(PASSWORD, true))))
                .andExpect(status().isOk()).andExpect(jsonPath("$.archived").value(false));
        assertThat(users.findByEmailIgnoreCase("user.test@ecobank.com")).isEmpty();
    }

    @Test void multiDayRequestCreatesDailyOccurrencesAndEveningStaysFree() {
        ReservationView day = service.create(USER, request("Formation", LocalDate.of(2026,9,7), LocalDate.of(2026,9,9),
                LocalTime.of(9,0), LocalTime.of(17,0), 10, LayoutType.BOARDROOM, ""));
        assertThat(day.occurrences()).extracting(OccurrenceView::date)
                .containsExactly(LocalDate.of(2026,9,7),LocalDate.of(2026,9,8),LocalDate.of(2026,9,9));
        service.assign(ADMIN, day.id(), 2L, "Recette multi-jours");
        ReservationView evening = service.create(USER, request("Réunion du soir", LocalDate.of(2026,9,7), LocalDate.of(2026,9,7),
                LocalTime.of(18,0), LocalTime.of(20,0), 8, LayoutType.BOARDROOM, ""));
        CompatibilityView result = compatibility(evening.id(),2L);
        assertThat(result.compatible()).isTrue();
    }

    @Test void multiDayRequestCanUseDifferentHoursForEachDate() {
        LocalDate from = LocalDate.of(2026,9,14), to = LocalDate.of(2026,9,16);
        List<OccurrenceScheduleRequest> schedules = List.of(
                new OccurrenceScheduleRequest(from, LocalTime.of(13,0), LocalTime.of(16,0)),
                new OccurrenceScheduleRequest(from.plusDays(1), LocalTime.of(13,0), LocalTime.of(16,0)),
                new OccurrenceScheduleRequest(to, LocalTime.of(8,0), LocalTime.of(10,0)));
        CreateReservationRequest input = new CreateReservationRequest("Horaires variables", "Test d'intégration", 10,
                from, to, LocalTime.of(13,0), LocalTime.of(10,0), LayoutType.BOARDROOM, "", "", "",
                PriorityLevel.NORMAL, schedules);

        ReservationView result = service.create(USER, input);

        assertThat(result.occurrences()).extracting(OccurrenceView::date, OccurrenceView::startTime, OccurrenceView::endTime)
                .containsExactly(
                        tuple(from, LocalTime.of(13,0), LocalTime.of(16,0)),
                        tuple(from.plusDays(1), LocalTime.of(13,0), LocalTime.of(16,0)),
                        tuple(to, LocalTime.of(8,0), LocalTime.of(10,0)));
        assertThat(result.startTime()).isEqualTo(LocalTime.of(13,0));
        assertThat(result.endTime()).isEqualTo(LocalTime.of(10,0));
    }

    @Test void exactConflictAndBufferConflictAreExplained() {
        ReservationView first = service.create(USER, request("Réservation existante", LocalDate.of(2026,9,10), LocalDate.of(2026,9,10),
                LocalTime.of(10,0), LocalTime.of(17,0), 8, LayoutType.BOARDROOM, ""));
        service.assign(ADMIN,first.id(),2L,"");
        ReservationView exact = service.create(USER, request("Conflit", LocalDate.of(2026,9,10), LocalDate.of(2026,9,10),
                LocalTime.of(11,0), LocalTime.of(12,0),8,LayoutType.BOARDROOM,""));
        assertThat(compatibility(exact.id(),2L).reasons()).anyMatch(x->x.contains("conflit"));
        ReservationView buffer = service.create(USER, request("Battement", LocalDate.of(2026,9,10), LocalDate.of(2026,9,10),
                LocalTime.of(17,10), LocalTime.of(18,0),8,LayoutType.BOARDROOM,""));
        assertThat(compatibility(buffer.id(),2L).reasons()).anyMatch(x->x.contains("battement"));
    }

    @Test void capacityLayoutFixedAndMobileEquipmentFailuresAreExplained() {
        ReservationView capacity = service.create(USER, request("Grande réunion", LocalDate.of(2026,10,1), LocalDate.of(2026,10,1),
                LocalTime.of(9,0),LocalTime.of(10,0),50,LayoutType.BOARDROOM,""));
        assertThat(compatibility(capacity.id(),2L).reasons()).anyMatch(x->x.contains("capacité insuffisante"));
        ReservationView layout = service.create(USER, request("Cocktail", LocalDate.of(2026,10,2), LocalDate.of(2026,10,2),
                LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.COCKTAIL,""));
        assertThat(compatibility(layout.id(),2L).reasons()).contains("disposition non prise en charge");
        ReservationView fixed = service.create(USER, request("Visio", LocalDate.of(2026,10,3), LocalDate.of(2026,10,3),
                LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.BOARDROOM,"VIDEO_CONF"));
        assertThat(compatibility(fixed.id(),2L).reasons()).anyMatch(x->x.contains("équipement fixe manquant"));
        EquipmentEntity board = equipment.findByCode("WHITEBOARD").orElseThrow(); board.availableQuantity=0;
        ReservationView mobile = service.create(USER, request("Tableau", LocalDate.of(2026,10,4), LocalDate.of(2026,10,4),
                LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.BOARDROOM,"WHITEBOARD"));
        assertThat(compatibility(mobile.id(),2L).reasons()).anyMatch(x->x.contains("équipement mobile indisponible"));
    }

    @Test void roomBlockAndFourteenRoomResultsAreReturned() {
        RoomBlockEntity b=new RoomBlockEntity();b.room=rooms.findById(2L).orElseThrow();b.author=users.findByEmailIgnoreCase(ADMIN).orElseThrow();
        b.startAt=LocalDateTime.of(2026,10,5,8,0);b.endAt=LocalDateTime.of(2026,10,5,18,0);b.reason="Maintenance";blocks.save(b);
        ReservationView r=service.create(USER,request("Pendant blocage",LocalDate.of(2026,10,5),LocalDate.of(2026,10,5),LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.BOARDROOM,""));
        List<CompatibilityView> all=service.compatibility(r.id());
        assertThat(all).hasSize(14);
        assertThat(all.stream().filter(x->x.roomId().equals(2L)).findFirst().orElseThrow().reasons()).anyMatch(x->x.contains("blocage"));
    }

    @Test void assignmentIsAllOccurrenceAndWorkflowRequiresJustificationsAndBothValidations() {
        ReservationView r=service.create(USER,request("Workflow",LocalDate.of(2026,11,2),LocalDate.of(2026,11,4),LocalTime.of(9,0),LocalTime.of(12,0),8,LayoutType.BOARDROOM,""));
        ReservationView assigned=service.assign(ADMIN,r.id(),2L,"");
        assertThat(assigned.assignedRoom()).isNotNull();assertThat(assigned.occurrences()).hasSize(3);
        assertThatThrownBy(()->service.validate("facility.rooms@ecobank.com",r.id(),new DecisionRequest(false,""),RoleName.FACILITY)).isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(()->service.confirm(ADMIN,r.id())).isInstanceOf(IllegalStateException.class);
        service.validate("facility.rooms@ecobank.com",r.id(),new DecisionRequest(true,"Disposition validée"),RoleName.FACILITY);
        service.validate("it.rooms@ecobank.com",r.id(),new DecisionRequest(true,"Technique validée"),RoleName.IT);
        assertThat(service.confirm(ADMIN,r.id()).status()).isEqualTo("CONFIRMED");
    }

    @Test void administratorCanAssignRoomThroughHttpApi() throws Exception {
        ReservationView request = service.create(USER, request("Assignation API", LocalDate.of(2026,12,7),
                LocalDate.of(2026,12,7), LocalTime.of(9,0), LocalTime.of(11,0), 8,
                LayoutType.BOARDROOM, ""));
        String token = login(ADMIN);

        mvc.perform(patch("/admin/requests/{id}/priority", request.id())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(new PriorityUpdateRequest(PriorityLevel.PRIORITY))))
                .andExpect(status().isOk()).andExpect(jsonPath("$.priority").value("PRIORITY"));

        mvc.perform(post("/admin/requests/{id}/assign", request.id())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(new AssignmentRequest(2L, "Test HTTP"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PENDING_FACILITY"))
                .andExpect(jsonPath("$.assignedRoom.id").value(2));

        entityManager.flush();
        entityManager.clear();
        mvc.perform(get("/requests").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].assignedRoom.building").isNotEmpty());
        mvc.perform(get("/admin/dashboard").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalMeetings").isNumber())
                .andExpect(jsonPath("$.byRoom").isMap());
    }

    @Test void modificationWindowCancellationAndFeedbackRulesAreEnforced() {
        LocalDate tomorrow=LocalDate.now(ZoneId.of("Africa/Lome")).plusDays(1);
        ReservationView future=service.create(USER,request("Modifiable",tomorrow,tomorrow,LocalTime.of(12,0),LocalTime.of(13,0),8,LayoutType.BOARDROOM,""));
        assertThat(service.updateMine(USER,future.id(),request("Modifiée",tomorrow,tomorrow,LocalTime.of(13,0),LocalTime.of(14,0),8,LayoutType.BOARDROOM,""))).isNotNull();
        service.updatePriority(ADMIN,future.id(),PriorityLevel.PRIORITY);
        assertThat(service.updateMine(USER,future.id(),request("Modifiée encore",tomorrow,tomorrow,LocalTime.of(14,0),LocalTime.of(15,0),8,LayoutType.BOARDROOM,""))).extracting(ReservationView::priority).isEqualTo("PRIORITY");
        LocalDate today=LocalDate.now(ZoneId.of("Africa/Lome"));LocalTime soon=LocalTime.now(ZoneId.of("Africa/Lome")).plusMinutes(30).withSecond(0).withNano(0);
        if(soon.isBefore(LocalTime.of(22,0))){ReservationView near=service.create(USER,request("H moins un",today,today,soon,soon.plusHours(1),8,LayoutType.BOARDROOM,""));assertThatThrownBy(()->service.updateMine(USER,near.id(),request("Bloquée",today,today,soon,soon.plusHours(1),8,LayoutType.BOARDROOM,""))).isInstanceOf(IllegalStateException.class);}
        service.assign(ADMIN,future.id(),2L,"");
        assertThatThrownBy(()->service.updateMine(USER,future.id(),request("Interdite après assignation",tomorrow,tomorrow,LocalTime.of(15,0),LocalTime.of(16,0),8,LayoutType.BOARDROOM,"")))
                .isInstanceOf(IllegalStateException.class).hasMessage("Seule une demande au statut Soumise peut être modifiée");
        ReservationView cancelled=service.cancel(USER,future.id(),"Réunion reportée",false);assertThat(cancelled.status()).isEqualTo("CANCELLED");assertThat(cancelled.assignedRoom()).isNull();
        ReservationView notFinished=service.create(USER,request("Feedback futur",tomorrow,tomorrow,LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.BOARDROOM,""));
        FeedbackRequest feedback=feedback(5);assertThatThrownBy(()->service.feedback(USER,notFinished.id(),feedback)).isInstanceOf(IllegalStateException.class);
        LocalDate yesterday=LocalDate.now(ZoneId.of("Africa/Lome")).minusDays(1);
        ReservationView finished=service.create(USER,request("Feedback J+1",yesterday,yesterday,LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.BOARDROOM,""));
        ReservationRequestEntity entity=requests.findById(finished.id()).orElseThrow();entity.status=RequestStatus.COMPLETED;
        assertThat(service.feedbackStatus(USER,finished.id()).eligible()).isTrue();
        service.feedback(USER,finished.id(),feedback);
        assertThat(feedbackAnswers.findAll()).filteredOn(answer->answer.feedback.request.id.equals(finished.id())).hasSize(2);
        assertThat(service.myFeedbackReservations(USER)).filteredOn(item->item.requestId().equals(finished.id()))
                .singleElement().satisfies(item->{assertThat(item.submitted()).isTrue();assertThat(item.average()).isEqualTo(5.0);});
        assertThat(service.feedbackResults()).filteredOn(item->item.requestId().equals(finished.id()))
                .singleElement().satisfies(item->{assertThat(item.answers()).hasSize(2);assertThat(item.average()).isEqualTo(5.0);});
        assertThatThrownBy(()->service.feedback(USER,finished.id(),feedback)).isInstanceOf(IllegalStateException.class);
    }

    @Test void overdueUnconfirmedRequestExpiresReleasesRoomAndNotifiesEveryActor() {
        LocalDate tomorrow = LocalDate.now(ZoneId.of("Africa/Lome")).plusDays(1);
        ReservationView request = service.create(USER, request("À expirer", tomorrow, tomorrow,
                LocalTime.of(9, 0), LocalTime.of(10, 0), 8, LayoutType.BOARDROOM, ""));
        service.assign(ADMIN, request.id(), 2L, "Test expiration");

        requestExpirationScheduler.expireOverdueRequests(LocalDateTime.of(tomorrow, LocalTime.of(9, 0)));
        entityManager.flush();
        entityManager.clear();

        ReservationRequestEntity expired = requests.findDetailed(request.id()).orElseThrow();
        assertThat(expired.status).isEqualTo(RequestStatus.EXPIRED);
        assertThat(expired.assignedRoom).isNull();
        assertThat(assignments.findByRequestIdAndActiveTrue(request.id())).isEmpty();

        List<NotificationEntity> expirationNotifications = notifications.findAll().stream()
                .filter(notification -> notification.eventType.equals("REQUEST_EXPIRED"))
                .filter(notification -> notification.message.contains(request.reference()))
                .toList();
        assertThat(expirationNotifications).hasSize(4);
        assertThat(expirationNotifications).extracting(notification -> notification.user.id).doesNotHaveDuplicates();

        CreateReservationRequest update = request("Modification interdite", tomorrow, tomorrow,
                LocalTime.of(11, 0), LocalTime.of(12, 0), 8, LayoutType.BOARDROOM, "");
        assertThatThrownBy(() -> service.updateMine(USER, request.id(), update)).hasMessageContaining("expiré");
        assertThatThrownBy(() -> service.cancel(USER, request.id(), "Annulation", false)).hasMessageContaining("expiré");
        assertThatThrownBy(() -> service.updatePriority(ADMIN, request.id(), PriorityLevel.PRIORITY)).hasMessageContaining("expiré");
        assertThatThrownBy(() -> service.assign(ADMIN, request.id(), 2L, "Réassignation")).hasMessageContaining("expiré");
        assertThatThrownBy(() -> service.validate(ADMIN, request.id(), new DecisionRequest(true, ""), RoleName.FACILITY)).hasMessageContaining("expiré");
        assertThatThrownBy(() -> service.confirm(ADMIN, request.id())).hasMessageContaining("expiré");
    }

    @Test void feedbackInvitationIsSentOnceOnDayAfterLastOccurrence() {
        LocalDate yesterday=LocalDate.now(ZoneId.of("Africa/Lome")).minusDays(1);
        ReservationView finished=service.create(USER,request("Invitation automatique",yesterday,yesterday,
                LocalTime.of(9,0),LocalTime.of(10,0),8,LayoutType.BOARDROOM,""));
        ReservationRequestEntity entity=requests.findById(finished.id()).orElseThrow();entity.status=RequestStatus.CONFIRMED;
        requests.flush();

        feedbackInvitationScheduler.sendFeedbackInvitations();
        long firstCount=notifications.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(USER).stream()
                .filter(item->item.eventType.equals("FEEDBACK_INVITATION")&&item.message.contains(String.valueOf(finished.id()))).count();
        assertThat(firstCount).isEqualTo(1);
        assertThat(entity.feedbackInvitationSentAt).isNotNull();

        feedbackInvitationScheduler.sendFeedbackInvitations();
        long secondCount=notifications.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(USER).stream()
                .filter(item->item.eventType.equals("FEEDBACK_INVITATION")&&item.message.contains(String.valueOf(finished.id()))).count();
        assertThat(secondCount).isEqualTo(1);
    }

    @Test void feedbackViewsAreAvailableToTheExpectedActors() throws Exception {
        String userToken=login(USER),adminToken=login(ADMIN);
        String facilityToken=login("facility.rooms@ecobank.com"),itToken=login("it.rooms@ecobank.com");
        mvc.perform(get("/feedbacks/mine").header("Authorization","Bearer "+userToken)).andExpect(status().isOk());
        mvc.perform(get("/feedbacks").header("Authorization","Bearer "+adminToken)).andExpect(status().isOk());
        mvc.perform(get("/feedbacks").header("Authorization","Bearer "+facilityToken)).andExpect(status().isOk());
        mvc.perform(get("/feedbacks").header("Authorization","Bearer "+itToken)).andExpect(status().isOk());
        mvc.perform(get("/feedbacks").header("Authorization","Bearer "+userToken)).andExpect(status().isForbidden());
    }

    @Test void pdfAndExcelExportsContainData() { assertThat(reporting.pdf().length).isGreaterThan(500);assertThat(reporting.excel().length).isGreaterThan(500); }

    private String login(String email) throws Exception {
        String json=mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(new LoginRequest(email,PASSWORD))))
                .andReturn().getResponse().getContentAsString();return mapper.readTree(json).get("token").asText();
    }
    private CompatibilityView compatibility(Long requestId,Long roomId){return service.compatibility(requestId).stream().filter(x->x.roomId().equals(roomId)).findFirst().orElseThrow();}
    private FeedbackRequest feedback(int rating){Map<FeedbackCriterion,Integer> answers=new EnumMap<>(FeedbackCriterion.class);answers.put(FeedbackCriterion.VENUE,rating);answers.put(FeedbackCriterion.NETWORK_INTERNET,rating);return new FeedbackRequest(answers,rating,"Très bien","fr");}
    private CreateReservationRequest request(String subject,LocalDate from,LocalDate to,LocalTime start,LocalTime end,int participants,LayoutType layout,String technical){
        List<OccurrenceScheduleRequest> schedules=from.datesUntil(to.plusDays(1)).map(date->new OccurrenceScheduleRequest(date,start,end)).toList();
        return new CreateReservationRequest(subject,"Test d'intégration",participants,from,to,start,end,layout,"",technical,"",PriorityLevel.NORMAL,schedules);
    }
}
