CREATE TABLE user_saved_locations (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    ObjectId INTEGER
        REFERENCES snap_locations(ObjectId) 
        ON DELETE CASCADE NOT NULL,
    user_id uuid
        REFERENCES snap_app_users(user_id) 
        ON DELETE CASCADE NOT NULL
);
