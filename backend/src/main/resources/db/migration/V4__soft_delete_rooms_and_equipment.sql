ALTER TABLE rooms ADD COLUMN deleted_at DATETIME NULL;
ALTER TABLE rooms ADD COLUMN deletion_reason VARCHAR(1000) NULL;
CREATE INDEX idx_rooms_deleted_at ON rooms(deleted_at);

ALTER TABLE equipment ADD COLUMN deleted_at DATETIME NULL;
CREATE INDEX idx_equipment_deleted_at ON equipment(deleted_at);
