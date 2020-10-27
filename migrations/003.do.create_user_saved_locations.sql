CREATE TABLE user_saved_locations (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    ObjectId INTEGER
        REFERENCES snap_locations(ObjectId) 
        ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES users(id) 
        ON DELETE CASCADE NOT NULL
);
