/* Replace with your SQL commands */
CREATE TABLE order_product (
  order_id UUID NOT NULL,
  product_id UUID NOT NULL,
  qty SMALLINT NOT NULL,
  PRIMARY KEY (order_id,product_id),
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);