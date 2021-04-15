BEGIN;

-- TRUNCATE TABLE snap_app_users;

INSERT INTO snap_app_users (user_id, full_name, user_name, email, password) 
VALUES
  (1,'Demo User', 'DemoUser2020','demo@gmail.com','DemoUser2020*'),
  (2,'Dee Deboop','Dee Deboop','dee.de@gmail.com','Dem393jnkjfeaoUser2020*'),
  (3,'Casey Bloggs','Casey Bloggs','casey.bloggs@ymail.com','Demaur783oUser2020*'),
  (4,'Sam Smith','Sam Smith','sm.s@outlook.com','Dem1564oUser2020*'),
  (5,'Lexi Lorx','Lexi Lorx','lexi.lors001@gmail.com','DemsdfsfdoUser2020*'),
  (6,'Wizard WippWax','Wippy Wax','wizard.wipp@hotmail.com','DemoUaaaaser2020*');

  COMMIT;

  BEGIN;

-- TRUNCATE TABLE snap_locations;

INSERT INTO snap_locations (X, Y, ObjectId, Store_Name, address, Address_Line__2,City, State, Zip5, Zip4, County, Longitude,Latitude,date_created)
VALUES ({[
    "X": -82.055046,
    "Y": 32.396797,
    "ObjectId": 1,
    "Store_Name": "DOLLARTREE 8500",
    "Address": "978 SE Broad St",
    "Address_Line__2": "",
    "City": "Metter",
    "State": "GA",
    "Zip5": 30439,
    "Zip4": 3933,
    "County": "CANDLER",
    "Longitude": -82.055046,
    "Latitude": 32.396797
  },
  {
    "X": -122.19395,
    "Y": 39.526478,
    "ObjectId": 2,
    "Store_Name": "Mercado's Meat Market No",
    "Address": "560 N Tehama St",
    "Address_Line__2": "",
    "City": "Willows",
    "State": "CA",
    "Zip5": 95988,
    "Zip4": 2533,
    "County": "GLENN",
    "Longitude": -122.19395,
    "Latitude": 39.526478
  },
  {
    "X": -83.405739,
    "Y": 42.332569,
    "ObjectId": 3,
    "Store_Name": "Meijer Gas Station 68",
    "Address": "37201 Warren Rd",
    "Address_Line__2": "",
    "City": "Westland",
    "State": "MI",
    "Zip5": 48185,
    "Zip4": 7219,
    "County": "WAYNE",
    "Longitude": -83.405739,
    "Latitude": 42.332569
  },
  {
    "X": -80.738525,
    "Y": 35.203922,
    "ObjectId": 4,
    "Store_Name": "Asian Grocery",
    "Address": "5669 Farm Pond Ln",
    "Address_Line__2": "",
    "City": "Charlotte",
    "State": "NC",
    "Zip5": 28212,
    "Zip4": 3777,
    "County": "MECKLENBURG",
    "Longitude": -80.738525,
    "Latitude": 35.203922};
 ]})
 
COMMIT; 