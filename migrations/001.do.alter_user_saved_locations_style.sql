CREATE TYPE saved_category AS ENUM (
  'Favorites',
  'To Visit'
);

ALTER TABLE user_saved_locations
  ADD COLUMN saved_location_category saved_category;