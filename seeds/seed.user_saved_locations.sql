BEGIN;

-- TRUNCATE TABLE user_saved_locations;

INSERT INTO user_saved_locations (id, date_created, ObjectId, user_id, saved_location_category) 
VALUES
  ('1','2020-12-15 20:57:43.539035-05','6567','4c4b260f-d786-4b9f-b293-ba523827b848','Favorites');

  COMMIT;