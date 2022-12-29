/* Replace with your SQL commands */
/* max price is 99999.99 */
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  price NUMERIC(7,2) NOT NULL,
  category varchar(30),
  PRIMARY KEY (id)
  );

