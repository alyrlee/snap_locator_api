CREATE TABLE snap_app_users (
  user_id uuid DEFAULT uuid_generate_v4() NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL, 
  password TEXT NOT NULL,
  nickname TEXT,
  PRIMARY KEY(user_id),
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);

