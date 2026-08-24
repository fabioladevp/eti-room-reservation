ALTER TABLE reservation_requests
    ADD COLUMN feedback_invitation_sent_at DATETIME NULL;

CREATE TABLE feedback_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    feedback_id BIGINT NOT NULL,
    criterion_code VARCHAR(60) NOT NULL,
    rating INT NOT NULL,
    CONSTRAINT uq_feedback_answer_criterion UNIQUE (feedback_id, criterion_code),
    CONSTRAINT fk_feedback_answer_feedback FOREIGN KEY (feedback_id) REFERENCES feedbacks(id) ON DELETE CASCADE,
    CONSTRAINT ck_feedback_answer_rating CHECK (rating IN (1, 3, 5))
);
