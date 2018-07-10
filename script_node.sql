\c node_db
CREATE TABLE Products (
    product_id integer UNIQUE PRIMARY KEY NOT NULL,
    name varchar(40) NOT NULL,
	price REAL
);
INSERT INTO Products (product_id, name, price) VALUES
    (01, 'Product 1', 10.50),
    (02, 'Product 2', 9.00);
CREATE TABLE Users (
     user_id integer UNIQUE PRIMARY KEY NOT NULL,
     name varchar(40) NOT NULL CHECK (name <> '')
);
INSERT INTO Users (user_id, name) VALUES
    (1, 'Ivan Ivanov'),
    (2, 'Anton Peev'),
    (3, 'Ana Ilieva'),
    (4, 'Harry Potter');