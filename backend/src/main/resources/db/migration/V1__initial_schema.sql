CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    full_name VARCHAR(160) NOT NULL,
    language VARCHAR(5) NOT NULL DEFAULT 'fr',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE buildings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(160) NOT NULL,
    building_id BIGINT NOT NULL,
    location VARCHAR(160),
    buffer_minutes INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    photo_url VARCHAR(255),
    version BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT fk_room_building FOREIGN KEY (building_id) REFERENCES buildings(id),
    CONSTRAINT ck_room_buffer CHECK (buffer_minutes >= 0)
);

CREATE TABLE room_capacities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    layout_type VARCHAR(30) NOT NULL,
    capacity INT NOT NULL,
    UNIQUE (room_id, layout_type),
    CONSTRAINT fk_capacity_room FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT ck_capacity_positive CHECK (capacity > 0)
);

CREATE TABLE room_photos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    display_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_photo_room FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE equipment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(40) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    equipment_type VARCHAR(20) NOT NULL,
    total_quantity INT NOT NULL DEFAULT 1,
    available_quantity INT NOT NULL DEFAULT 1,
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_equipment_quantity CHECK (total_quantity >= 0 AND available_quantity >= 0)
);

CREATE TABLE room_equipment (
    room_id BIGINT NOT NULL,
    equipment_id BIGINT NOT NULL,
    PRIMARY KEY (room_id, equipment_id),
    CONSTRAINT fk_room_equipment_room FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT fk_room_equipment_equipment FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

CREATE TABLE reservation_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(40) NOT NULL UNIQUE,
    requester_id BIGINT NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT,
    participant_count INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    layout_type VARCHAR(30) NOT NULL,
    physical_needs VARCHAR(1000),
    technical_needs VARCHAR(1000),
    observations VARCHAR(1000),
    priority_level VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    status VARCHAR(40) NOT NULL,
    assigned_room_id BIGINT,
    facility_validated BOOLEAN,
    it_validated BOOLEAN,
    facility_note VARCHAR(1000),
    it_note VARCHAR(1000),
    cancel_reason VARCHAR(1000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT fk_request_user FOREIGN KEY (requester_id) REFERENCES users(id),
    CONSTRAINT fk_request_room FOREIGN KEY (assigned_room_id) REFERENCES rooms(id),
    CONSTRAINT ck_request_participants CHECK (participant_count > 0),
    CONSTRAINT ck_request_dates CHECK (end_date >= start_date)
);

CREATE TABLE reservation_occurrences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT NOT NULL,
    occurrence_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE (request_id, occurrence_date),
    CONSTRAINT fk_occurrence_request FOREIGN KEY (request_id) REFERENCES reservation_requests(id)
);

CREATE INDEX idx_occurrence_date_time ON reservation_occurrences(occurrence_date, start_time, end_time);
CREATE INDEX idx_request_room_status ON reservation_requests(assigned_room_id, status);

CREATE TABLE assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    assigned_by BIGINT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    justification VARCHAR(1000),
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignment_request FOREIGN KEY (request_id) REFERENCES reservation_requests(id),
    CONSTRAINT fk_assignment_room FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT fk_assignment_user FOREIGN KEY (assigned_by) REFERENCES users(id)
);

CREATE TABLE validation_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT NOT NULL,
    validator_id BIGINT NOT NULL,
    validation_type VARCHAR(20) NOT NULL,
    decision VARCHAR(20) NOT NULL,
    justification VARCHAR(1000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_validation_request FOREIGN KEY (request_id) REFERENCES reservation_requests(id),
    CONSTRAINT fk_validation_user FOREIGN KEY (validator_id) REFERENCES users(id)
);

CREATE TABLE room_blocks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    -- DATETIME évite les valeurs implicites TIMESTAMP de MariaDB/XAMPP 10.4
    -- lorsque explicit_defaults_for_timestamp est désactivé.
    start_at DATETIME NOT NULL,
    end_at DATETIME NOT NULL,
    reason VARCHAR(500) NOT NULL,
    author_id BIGINT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_block_room FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT fk_block_author FOREIGN KEY (author_id) REFERENCES users(id),
    CONSTRAINT ck_block_dates CHECK (end_at > start_at)
);

CREATE TABLE mobile_equipment_reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT NOT NULL,
    occurrence_id BIGINT NOT NULL,
    equipment_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_mobile_request FOREIGN KEY (request_id) REFERENCES reservation_requests(id),
    CONSTRAINT fk_mobile_occurrence FOREIGN KEY (occurrence_id) REFERENCES reservation_occurrences(id),
    CONSTRAINT fk_mobile_equipment FOREIGN KEY (equipment_id) REFERENCES equipment(id),
    CONSTRAINT ck_mobile_quantity CHECK (quantity > 0)
);

CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message VARCHAR(2000) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    read_flag BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT NOT NULL UNIQUE,
    respondent_id BIGINT NOT NULL,
    room_rating INT NOT NULL,
    comfort_rating INT NOT NULL,
    equipment_rating INT NOT NULL,
    support_rating INT NOT NULL,
    comment_text VARCHAR(2000),
    language VARCHAR(5) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_request FOREIGN KEY (request_id) REFERENCES reservation_requests(id),
    CONSTRAINT fk_feedback_user FOREIGN KEY (respondent_id) REFERENCES users(id),
    CONSTRAINT ck_feedback_room CHECK (room_rating BETWEEN 1 AND 5),
    CONSTRAINT ck_feedback_comfort CHECK (comfort_rating BETWEEN 1 AND 5),
    CONSTRAINT ck_feedback_equipment CHECK (equipment_rating BETWEEN 1 AND 5),
    CONSTRAINT ck_feedback_support CHECK (support_rating BETWEEN 1 AND 5)
);

CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    actor_email VARCHAR(190) NOT NULL,
    action_type VARCHAR(80) NOT NULL,
    entity_type VARCHAR(80) NOT NULL,
    entity_id VARCHAR(80),
    details VARCHAR(2000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles(name) VALUES ('USER'), ('ADMIN'), ('FACILITY'), ('IT');
INSERT INTO buildings(code, name) VALUES ('ACADEMIE', 'Académie'), ('PAC', 'PAC'), ('GRAND', 'Grand bâtiment');

INSERT INTO rooms(code,name,building_id,location,buffer_minutes,status,active,photo_url) VALUES
('ACA-AUD','Auditorium de l''Académie',1,'Académie',45,'AVAILABLE',TRUE,'/assets/rooms/auditorium.svg'),
('ACA-01','Meeting room 01',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('ACA-02','Meeting room 02',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('ACA-03','Meeting room 03',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('ACA-04','Meeting room 04',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('ACA-05','Meeting room 05',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('ACA-06','Meeting room 06',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('ACA-07','Meeting room 07',1,'Académie',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('PAC-AMP','Amphi du PAC',2,'PAC',45,'AVAILABLE',TRUE,'/assets/rooms/auditorium.svg'),
('PAC-VIP','Salon VIP',2,'PAC',30,'AVAILABLE',TRUE,'/assets/rooms/vip.svg'),
('PAC-BAN','Salle de Banquet',2,'PAC',45,'AVAILABLE',TRUE,'/assets/rooms/banquet.svg'),
('PAC-CC02','Salle CC02',2,'PAC',20,'AVAILABLE',TRUE,'/assets/rooms/meeting.svg'),
('PAC-HALL','Hall PAC',2,'PAC',45,'AVAILABLE',TRUE,'/assets/rooms/hall.svg'),
('GRD-CONSEIL','Salle de Conseil du 7e étage',3,'7e étage',30,'AVAILABLE',TRUE,'/assets/rooms/boardroom.svg');

INSERT INTO room_capacities(room_id,layout_type,capacity) VALUES
(1,'THEATRE',120),(1,'CLASSROOM',60),(1,'U_SHAPE',36),
(2,'BOARDROOM',12),(2,'U_SHAPE',10),(3,'BOARDROOM',12),(3,'U_SHAPE',10),
(4,'BOARDROOM',10),(4,'U_SHAPE',8),(5,'BOARDROOM',14),(5,'U_SHAPE',12),
(6,'BOARDROOM',12),(6,'U_SHAPE',10),(7,'BOARDROOM',10),(7,'U_SHAPE',8),
(8,'BOARDROOM',10),(8,'U_SHAPE',8),(9,'THEATRE',180),(9,'CLASSROOM',90),
(10,'BOARDROOM',24),(10,'COCKTAIL',40),(11,'THEATRE',220),(11,'CLASSROOM',110),(11,'COCKTAIL',250),
(12,'BOARDROOM',16),(12,'U_SHAPE',14),(13,'THEATRE',300),(13,'COCKTAIL',400),
(14,'BOARDROOM',28),(14,'U_SHAPE',24),(14,'THEATRE',42);

INSERT INTO equipment(code,name,equipment_type,total_quantity,available_quantity,status,active) VALUES
('AIR_CONDITIONING','Climatisation','FIXED',14,14,'AVAILABLE',TRUE),
('WIFI','Wi-Fi','FIXED',10,10,'AVAILABLE',TRUE),
('PROJECTION','Projection','FIXED',8,8,'AVAILABLE',TRUE),
('SOUND','Sonorisation','FIXED',4,4,'AVAILABLE',TRUE),
('VIDEO_CONF','Vidéoconférence','FIXED',3,3,'AVAILABLE',TRUE),
('INTERPRETATION','Interprétation','FIXED',1,1,'AVAILABLE',TRUE),
('WHITEBOARD','Tableau blanc','MOBILE',4,4,'AVAILABLE',TRUE),
('MOBILE_PROJECTOR','Projecteur mobile','MOBILE',2,2,'AVAILABLE',TRUE);

INSERT INTO room_equipment(room_id,equipment_id) SELECT id,1 FROM rooms;
INSERT INTO room_equipment(room_id,equipment_id) VALUES
(1,3),(1,4),(1,5),
(2,2),(2,3),(3,2),(3,3),(4,2),(5,2),(5,3),(6,2),(6,3),
(9,2),(9,3),(9,4),(9,5),(9,6),(10,2),(11,2),(11,3),(11,4),
(12,2),(13,2),(14,3),(14,4),(14,5);
