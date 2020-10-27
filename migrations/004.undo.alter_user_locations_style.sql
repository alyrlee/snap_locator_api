ALTER TABLE users_saved_locations
  DROP COLUMN IF EXISTS saved_location_category;

DROP TABLE IF EXISTS users;