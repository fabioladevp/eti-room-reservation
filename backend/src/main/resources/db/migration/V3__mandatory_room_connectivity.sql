-- Toutes les salles ETI disposent obligatoirement de la climatisation et du Wi-Fi.
-- La requête couvre les 14 salles initiales ainsi que toute salle déjà créée par un administrateur.
INSERT INTO room_equipment(room_id, equipment_id)
SELECT r.id, e.id
FROM rooms r
CROSS JOIN equipment e
WHERE e.code IN ('AIR_CONDITIONING', 'WIFI')
  AND NOT EXISTS (
      SELECT 1
      FROM room_equipment re
      WHERE re.room_id = r.id AND re.equipment_id = e.id
  );

UPDATE equipment
SET total_quantity = (SELECT COUNT(*) FROM rooms),
    available_quantity = (SELECT COUNT(*) FROM rooms)
WHERE code IN ('AIR_CONDITIONING', 'WIFI');
