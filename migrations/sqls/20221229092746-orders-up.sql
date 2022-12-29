/* Replace with your SQL commands */
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  status VARCHAR(10) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);