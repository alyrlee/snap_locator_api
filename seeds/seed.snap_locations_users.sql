BEGIN;

TRUNCATE TABLE users;

INSERT INTO users (full_name, userName, email, password) 
VALUES
  ('Demo User', 'Demo User','demo@gmail.com','$2a$04$iRkAgxuV6nvP4vKvw18kTOCoVOOw2jIkSwm.F9oRQfIPHckV8bvUe'),
  ('Dee Deboop','Dee Deboop','dee.de@gmail.com','$2a$04$ledKZ4NamXKGHMsBa7ta8uHwWfb6KKQmOS0QpIA2dp0XMkfCPLtIO'),
  ('Casey Bloggs','Casey Bloggs','casey.bloggs@ymail.com','$2a$04$nYf034X.KEBBvaiy.seoTOubfsrnFw0LTESI89PgSeh5mNB2ALuZu'),
  ('Sam Smith','Sam Smith','sm.s@outlook.com','$2a$04$aLrlpMPvENXnztX/dA5B5.nCn1Q/VpyNSiE0IM.wmiy2sOYynobRK'),
  ('Lexi Lorx','Lexi Lorx','lexi.lors001@gmail.com','$2a$05$6tbrsiOs2Tz8BAz57bbhN.EziWDkPkxHXDNnCbgPkPeI.fn.RMGK2'),
  ('Wizard WippWax','Wippy Wax','wizard.wipp@hotmail.com','$2a$06$OnC4woXhQkybJ4otHEWHi.i6/kyhO5rhabBrYKhg0tAw8dpLmrhnK');

  COMMIT;