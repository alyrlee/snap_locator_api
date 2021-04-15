BEGIN;

-- TRUNCATE TABLE snap_app_users;

INSERT INTO snap_app_users (id, full_name, user_name, email, password) 
VALUES
  (1,'Demo User', 'DemoUser2020','demo@gmail.com','DemoUser2020*'),
  (2,'Dee Deboop','Dee Deboop','dee.de@gmail.com','Dem393jnkjfeaoUser2020*'),
  (3,'Casey Bloggs','Casey Bloggs','casey.bloggs@ymail.com','Demaur783oUser2020*'),
  (4,'Sam Smith','Sam Smith','sm.s@outlook.com','Dem1564oUser2020*'),
  (5,'Lexi Lorx','Lexi Lorx','lexi.lors001@gmail.com','DemsdfsfdoUser2020*'),
  (6,'Wizard WippWax','Wippy Wax','wizard.wipp@hotmail.com','DemoUaaaaser2020*');

  COMMIT;