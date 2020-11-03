BEGIN;

TRUNCATE TABLE users;

INSERT INTO users (full_name, userName, email, password) 
VALUES
  ('Demo User', 'DemoUser2020','demo@gmail.com','DemoUser2020*'),
  ('Dee Deboop','Dee Deboop','dee.de@gmail.com','Dem393jnkjfeaoUser2020*'),
  ('Casey Bloggs','Casey Bloggs','casey.bloggs@ymail.com','Demaur783oUser2020*'),
  ('Sam Smith','Sam Smith','sm.s@outlook.com','Dem1564oUser2020*'),
  ('Lexi Lorx','Lexi Lorx','lexi.lors001@gmail.com','DemsdfsfdoUser2020*'),
  ('Wizard WippWax','Wippy Wax','wizard.wipp@hotmail.com','DemoUaaaaser2020*');

  COMMIT;