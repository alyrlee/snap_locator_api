CREATE TABLE snap_locations (
    X NUMERIC(10,7),
    Y NUMERIC(10,7),
    ObjectId INTEGER PRIMARY KEY,
    Store_Name TEXT NOT NULL,
    address TEXT,
    Address_Line__2 TEXT,
    City TEXT,
    State TEXT,
    Zip5 INTEGER,
    Zip4 TEXT,
    County TEXT,
    Longitude NUMERIC(10,7),
    Latitude NUMERIC(10,7),
    date_created TIMESTAMPTZ DEFAULT now() 
);

CREATE TABLE snap_app_users (
  user_id uuid DEFAULT uuid_generate_v4() NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL, 
  password TEXT NOT NULL,
  nickname TEXT,
  PRIMARY KEY(user_id),
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);

CREATE TABLE user_saved_locations (
    id INTEGER PRIMARY KEY,
    -- text TEXT,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    ObjectId INTEGER
        REFERENCES snap_locations(ObjectId) 
        ON DELETE CASCADE NOT NULL,
    user_id uuid
        REFERENCES snap_app_users(user_id) 
        ON DELETE CASCADE NOT NULL
);

ALTER TABLE user_saved_locations 
  ADD COLUMN user_id INTEGER REFERENCES user_id(id) ON DELETE SET NULL
;

CREATE TYPE saved_category AS ENUM (
  'Favorites',
  'To Visit'
);

ALTER TABLE user_saved_locations
  ADD COLUMN saved_location_category saved_category;

CREATE TABLE snap_test (
    X NUMERIC(10,7),
    Y NUMERIC(10,7),
    ObjectId INTEGER PRIMARY KEY,
    Store_Name TEXT NOT NULL,
    address TEXT,
    Address_Line__2 TEXT,
    City TEXT,
    State TEXT,
    Zip5 INTEGER,
    Zip4 TEXT,
    County TEXT,
    Longitude NUMERIC(10,7),
    Latitude NUMERIC(10,7),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
); 

