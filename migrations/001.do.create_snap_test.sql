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