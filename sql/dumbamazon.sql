-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh

-- Removes tables if they previously existed in your database
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `orders_product`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `orders_product`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `account` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `username` varchar(20) NOT NULL,
    `password` varchar(50) NOT NULL,
    `email` varchar(255) NOT NULL,
    `fname` varchar(30) NOT NULL,
    `lname` varchar(30) NOT NULL,
    `street` varchar(30) NOT NULL,
    `city` varchar(20) NOT NULL,
    `zip` varchar(10) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE `full_name` (fname, lname)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `payment` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `user_id` int(10) NOT NULL,
    `fname` varchar(30) NOT NULL,
    `lname` varchar(30) NOT NULL,
    `street` varchar(30) NOT NULL,
    `city` varchar(20) NOT NULL,
    `zip` varchar(10) NOT NULL,
    `card_num` varchar(16) NOT NULL,
    `exp_month` int(2) NOT NULL,
    `exp_year` int(2) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `user_id` int(10) NOT NULL,
    `payment_id` int(10) NOT NULL,
    `order_date` date NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `categories` (
    `id` int(10) AUTO_INCREMENT NOT NULL,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `product` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `price` decimal(8, 2) NOT NULL,
    `categories_id` int(10) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (categories_id) REFERENCES categories(id) ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders_product` (
    `orders_id` int(10) NOT NULL,
    `product_id` int(10) NOT NULL,
    `quantity` int(3) NOT NULL,
    `subtotal` decimal(8, 2) NOT NULL,
    PRIMARY KEY (`orders_id`, `product_id`),
    FOREIGN KEY (`orders_id`) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES product(id) ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Tables that don't contain FOREIGN KEYs must have their data inserted first

INSERT INTO account(username, password, email, fname, lname, street, city, zip)
VALUES
    ('barry', 'barry123', 'barryiscool@gmail.com', 'Barack', 'Obama', '123 Fake Street', 'DC', '90210'),
    ('snoopy', 'cb532', 'charliebrown@gmail.com', 'Charlie', 'Brown', '1234 Rodeo Drive', 'Los Angeles', '17283'),
    ('willy', 'whereswill', 'notwillsmith@gmail.com', 'Will', 'Smith', '315 Fake Street', 'Los Angeles', '91111');

INSERT INTO payment(user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year)
VALUES
    (1, 'Barack', 'Obama', '123 Fake Street', 'DC', '90210', '1234567890987654', '11', '12'),
    (2, 'Charlie', 'Brown', '1234 Rodeo Drive', 'Los Angeles', '17283', '1111222233334444', '12', '25'),
    (3, 'Harry', 'Potter', '1234 Hogwarts Boulevard', 'Unknown', '012345', '28189489485', '01', '01');

INSERT INTO categories(name)
VALUES
    ('clothing'),
    ('electronics'),
    ('food');

INSERT INTO orders(user_id, payment_id, order_date)
VALUES
    (2, 1, CURRENT_TIMESTAMP),
    (2, 1, now()),
    (2, 1, CURRENT_TIME),
    (2, 1, UTC_TIMESTAMP),
    (1, 3, "2019-05-05");

INSERT INTO product(name, price, categories_id)
VALUES
    ('car', 123456.78, 1),
    ('television', 349.99, NULL),
    ('phone', 1300, NULL);

INSERT INTO orders_product(orders_id, product_id, quantity, subtotal)
VALUES
    (1, 1, 24, 123456.78);

DESCRIBE payment;
DESCRIBE account;
DESCRIBE categories;
DESCRIBE orders;
DESCRIBE orders_product;
DESCRIBE product;
