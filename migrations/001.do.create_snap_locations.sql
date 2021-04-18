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

