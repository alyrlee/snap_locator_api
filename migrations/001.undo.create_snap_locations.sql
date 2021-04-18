DROP TABLE IF EXISTS snap_locations;


ALTER TABLE snap_locations
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS snap_test;