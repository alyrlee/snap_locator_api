BEGIN;

TRUNCATE
  snap_locations,
  snap_locator_users
  RESTART IDENTITY CASCADE;

INSERT INTO snap_locator_users (user_name, password)
VALUES
  ('DemoUser2020', 'DemoUserSnap1234!'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', 'bo-password'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', 'charlie-password'),
  ('s.smith', 'Sam Smith', 'Sam', 'sam-password'),
  ('lexlor', 'Alex Taylor', 'Lex', 'lex-password'),
  ('wippy', 'Ping Won In', 'Ping', 'ping-password');

INSERT INTO snap_locations (id, store_name, address, Address_Line__2, city,state, zip5, zip4, county, longitude, latitude)
VALUES
    ( 
      "id": 1,"Store_Name": "DOLLARTREE 8500", "Address": "978 SE Broad St","Address_Line__2": null, "City": "Metter", "State": "GA",  "Zip5": "30439", "Zip4": "3933",  "County": "CANDLER",  "Longitude": -82.055046, "Latitude": 32.396797 
    ), 
              
(
     "id": 2,"Store_Name": "Mercado's Meat Market No", "Address": "560 N Tehama St","Address_Line__2": null, "City": "Willows", "State": "CA",  "Zip5": "95988", "Zip4": "2533",  "County": "GLENN", "Longitude": -122.19395, "Latitude": 39.526478
    ), 

(
     "id": 3, "Store_Name": "Meijer Gas Station 68", "Address": "37201 Warren Rd", "Address_Line__2": null, "City": "Westland", "State": "MI", "Zip5": "48185", "Zip4": "7219", "County": "WAYNE", "Longitude": -83.405739, "Latitude": 42.332569 
    ), 
 (
      "id": 4, "Store_Name": "Asian Grocery ", "Address": "5669 Farm Pond Ln", "Address_Line__2": null, "City": "Charlotte", "State": "NC", "Zip5": "28212", "Zip4": "3777", "County": "MECKLENBURG", "Longitude": -80.738525, "Latitude": 35.203922 
    ), 
 ( 
     "id": 5, "Store_Name": "Meijer Gas Station 161", "Address": "2145 Sir Barton Way", "Address_Line__2": null, "City": "Lexington", "State": "KY", "Zip5": "40509", "Zip4": "2203", "County": "FAYETTE", "Longitude": -84.418816, "Latitude": 38.020084 
    ),
 ( 
     "id": 6, "Store_Name": "New Entry Sustainable Farming Project - Food Hub", "Address": "733 Cabot St", "Address_Line__2": null, "City": "Beverly", "State": "MA", "Zip5": "01915", "Zip4": "1027", "County": "ESSEX", "Longitude": -70.899086, "Latitude": 42.583797 
    ), 
 (
      "id": 7, "Store_Name": "Mejier Gas Station 308", "Address": "1820 Nagel Rd", "Address_Line__2": null, "City": "Avon", "State": "OH", "Zip5": "44011", "Zip4": "1442", "County": "LORAIN", "Longitude": -81.988991, "Latitude": 41.46114
    ), 
 ( 
     "id": 8, "Store_Name": "Discount Food Mart", "Address": "3208 Martin Luther King Jr Dr SW", "Address_Line__2": null, "City": "Atlanta", "State": "GA", "Zip5": "30311", "Zip4": "1302", "County": "FULTON", "Longitude": -84.492302, "Latitude": 33.752197 
    ), 
(
     "id": 9, "Store_Name": "Meijer Gas Station 214", "Address": "13705 S Route 59", "Address_Line__2": null, "City": "Plainfield", "State": "IL", "Zip5": "60544", "Zip4": "6106", "County": "WILL", "Longitude": -88.201988, "Latitude": 41.632893
    );
COMMIT;    

