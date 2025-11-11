-- run this file to create the tables in the database used for the project

--users table
CREATE TABLE tta_users(
  id SERIAL NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  salt TEXT NOT NULL,

  PRIMARY KEY (id)
);

-- events table 
CREATE TABLE tta_events(
  id SERIAL NOT NULL,
  owner BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  start_time VARCHAR(255),
  end_time VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  description TEXT,
  rsvp_amount BIGINT DEFAULT 0,

  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
);
