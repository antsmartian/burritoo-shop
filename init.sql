CREATE TABLE burrito (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size VARCHAR(255) NOT NULL,
  price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE option (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE burrito_option (
  id SERIAL PRIMARY KEY,
  burrito_id INT REFERENCES burrito(id),
  option_id INT REFERENCES option(id),
  price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE "order" (
  id SERIAL PRIMARY KEY,
  total_cost DECIMAL(8, 2) NOT NULL,
  date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE order_item (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES "order"(id),
  burrito_option_id INT REFERENCES burrito_option(id),
  quantity INT NOT NULL
);


-- Insert sample burrito data
INSERT INTO burrito (name, size, price)
VALUES ('Chicken Burrito', 'Regular', 3.99),
       ('Beef Burrito', 'Large', 5.99),
       ('Vegetarian Burrito', 'Regular', 4.99);

-- Insert sample option data
INSERT INTO option (name, quantity, price)
VALUES ('Black Olives', 10, 0.99),
       ('Sour Cream', 15, 0.49),
       ('Guacamole', 8, 1.99);

-- Insert sample burrito_option data
-- Insert sample burrito_option data with price
INSERT INTO burrito_option (burrito_id, option_id, price)
VALUES (1, 1, 0.99),
       (1, 2, 0.49),
       (2, 2, 0.49),
       (3, 1, 0.99),
       (3, 3, 1.99),
       (3, NULL, 3.99),
       (3, NULL, 4.99);


-- Insert sample order data
INSERT INTO "order" (total_cost)
VALUES (9.97),
       (8.48),
       (5.99),
       (10.99),
       (9.99);

-- Insert sample order_item data
INSERT INTO order_item (order_id, burrito_option_id, quantity)
VALUES (1, 1, 2),
       (1, 2, 4),
       (2, 2, 1),
       (3, 3, 3),
       (4, 6, 1),
       (5, 7, 4);



CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  user_id INTEGER, -- Optional: If associating API key with a user
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);


INSERT INTO api_keys (key, user_id, created_at, expires_at)
VALUES
  ('kWF2Ae36hIRpaRKCrZToQyOo4jjw5BD3VGScLF9LmtdPY3EoplGSiJ7ubjI3eXBJ', 1, NOW(), NOW() + INTERVAL '1 month'),
  ('OsXTdCPnbQl29KqVD1YyYvXykduQVlHzcBa25WKkbhtjdpj0JDG8Z1NDxKicYbqO', 2, NOW(), NOW() + INTERVAL '2 month'),
  ('Yb4fkfZrkzwYwrMF2NbMHaNRmaHNziqHVp9j60QQLicPjq8G593elg1vo8QnIPUZ', NULL, NOW(), NOW() + INTERVAL '3 month');