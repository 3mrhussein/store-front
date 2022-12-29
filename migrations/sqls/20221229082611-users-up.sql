/* Replace with your SQL commands */
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid(),
  firstName VARCHAR(50) NOT NULL,
  lastNAME VARCHAR(50) NOT NULL,
  password CHAR(60) NOT NULL,
  PRIMARY KEY (id)
  );