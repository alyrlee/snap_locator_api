BEGIN;

TRUNCATE snap_locator_users, RESTART IDENTITY CASCADE;

INSERT INTO snap_locator_users (id, user_name, password) 
VALUES
  (1,'DemoUser2020','$2a$04$iRkAgxuV6nvP4vKvw18kTOCoVOOw2jIkSwm.F9oRQfIPHckV8bvUe'),
  (2,'b.deboop','$2a$04$ledKZ4NamXKGHMsBa7ta8uHwWfb6KKQmOS0QpIA2dp0XMkfCPLtIO'),
  (3,'c.bloggs','$2a$04$nYf034X.KEBBvaiy.seoTOubfsrnFw0LTESI89PgSeh5mNB2ALuZu'),
  (4,'s.smith','$2a$04$aLrlpMPvENXnztX/dA5B5.nCn1Q/VpyNSiE0IM.wmiy2sOYynobRK'),
  (5,'lexlor','$2a$05$6tbrsiOs2Tz8BAz57bbhN.EziWDkPkxHXDNnCbgPkPeI.fn.RMGK2'),
  (6,'wippy','$2a$06$OnC4woXhQkybJ4otHEWHi.i6/kyhO5rhabBrYKhg0tAw8dpLmrhnK');

  COMMIT;