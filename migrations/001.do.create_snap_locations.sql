CREATE TABLE snap_locations (
    X NUMERIC(10,7),
    Y NUMERIC(10,7),
    ObjectId INTEGER PRIMARY KEY,
    Store_Name TEXT NOT NULL,
    address TEXT,
    Address_Line__2 TEXT,
    City TEXT,
    Zip5 INTEGER,
    Zip4 INTEGER,
    County TEXT,
    Longitude NUMERIC(10,7),
    Latitude NUMERIC(10,7)
);