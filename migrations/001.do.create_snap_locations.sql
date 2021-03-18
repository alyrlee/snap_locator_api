CREATE TYPE saved_category AS ENUM (
  'Favorites',
  'To Visit'
);

CREATE TABLE snap_locations (
    X NUMERIC(10,7),
    Y NUMERIC(10,7),
    ObjectId INTEGER PRIMARY KEY,
    Store_Name TEXT NOT NULL,
    address TEXT,
    address_line__2 TEXT,
    city TEXT,
    state TEXT,
    zip5 INTEGER,
    zip4 TEXT,
    county TEXT,
    longitude NUMERIC(10,7),
    latitude NUMERIC(10,7),
    date_created TIMESTAMPTZ DEFAULT now() 
);

CREATE TABLE snap_app_users (
  user_id INTEGER PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL, 
  password TEXT NOT NULL,
  nickname TEXT,
  -- PRIMARY KEY(user_id),
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
    user_id INTEGER 
        REFERENCES snap_app_users(user_id) 
        ON DELETE CASCADE NOT NULL,
    saved_location_category saved_category
);

CREATE TABLE snap_test (
    X NUMERIC(10,7),
    Y NUMERIC(10,7),
    ObjectId INTEGER PRIMARY KEY,
    Store_Name TEXT NOT NULL,
    address TEXT,
    address_line__2 TEXT,
    city TEXT,
    state TEXT,
    zip5 INTEGER,
    zip4 TEXT,
    county TEXT,
    longitude NUMERIC(10,7),
    latitude NUMERIC(10,7),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
); 

