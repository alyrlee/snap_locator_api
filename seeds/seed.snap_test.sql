BEGIN;

TRUNCATE TABLE snap_test;

INSERT INTO snap_test (X, Y, ObjectId, Store_Name, address, Address_Line__2,City, State, Zip5, Zip4, County, Longitude,Latitude,date_created)
VALUES
(-82.055046,32.396797,1,'DOLLARTREE 8500','978 SE Broad St','null','Metter','GA',30439,3933,'CANDLER',-82.055046,32.396797,'2020-09-28 01:00:00');

COMMIT; 
