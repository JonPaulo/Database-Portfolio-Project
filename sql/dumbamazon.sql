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
    `subtotal` decimal(12, 2) NOT NULL,
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
    (3, 'Harry', 'Potter', '1234 Hogwarts Boulevard', 'Unknown', '012345', '28189489485', '01', '01'),
    (2, 'Snoop', 'Dogg', '1234 Some Street', 'Los Angeles', '45610', '04560454545454', '12', '20');

INSERT INTO categories(name)
VALUES
    ('clothing'),
    ('electronics'),
    ('food'),
    ('lifestyle'),
    ('health'),
    ('beauty'),
    ('household'),
    ('security'),
    ('sports'),
    ('productivity');

INSERT INTO orders(user_id, payment_id, order_date)
VALUES
    (2, 1, CURRENT_TIMESTAMP),
    (3, 1, now()),
    (1, 2, CURRENT_TIME),
    (2, 1, UTC_TIMESTAMP),
    (1, 3, "2019-05-05");

INSERT INTO product(name, price, categories_id)
VALUES
    ('car', 12345.67, 1),
    ('television', 349.99, NULL),
    ('phone', 1300, NULL);

INSERT INTO orders_product(orders_id, product_id, quantity, subtotal)
VALUES
    (1, 1, 3, 37037.01);

DESCRIBE payment;
DESCRIBE account;
DESCRIBE categories;
DESCRIBE orders;
DESCRIBE orders_product;
DESCRIBE product;


-- Randomly Generated Data

insert into account (username, password, email, fname, lname, street, city, zip) values ('kminget0', 'QCf7kblN', 'kminget0@mapy.cz', 'Kalila', 'Minget', '71 Fallview Junction', 'Alvito', 90522);
insert into account (username, password, email, fname, lname, street, city, zip) values ('mwesthead1', 'aMRwId', 'mwesthead1@slideshare.net', 'Marc', 'Westhead', '9048 8th Center', 'La Loma', 63350);
insert into account (username, password, email, fname, lname, street, city, zip) values ('zolford2', 'kbiEEtdU75m', 'zolford2@xinhuanet.com', 'Zebulon', 'Olford', '5466 Farragut Center', 'Žďár', 53679);
insert into account (username, password, email, fname, lname, street, city, zip) values ('efriedank3', 'Z0Ffsmip', 'efriedank3@alibaba.com', 'Esme', 'Friedank', '921 Eggendart Drive', 'Poconé', 97552);
insert into account (username, password, email, fname, lname, street, city, zip) values ('mharrild4', 'p0DQkqja', 'mharrild4@discuz.net', 'Mackenzie', 'Harrild', '9 Barby Hill', 'Dolati', 90889);
insert into account (username, password, email, fname, lname, street, city, zip) values ('mbompas5', '0vbS4h', 'mbompas5@hc360.com', 'Mignon', 'Bompas', '6577 Charing Cross Crossing', 'Calvos', 32247);
insert into account (username, password, email, fname, lname, street, city, zip) values ('tglading6', 'AMemxPksoqx', 'tglading6@thetimes.co.uk', 'Trix', 'Glading', '69378 Forster Place', 'Besteiros', 85226);
insert into account (username, password, email, fname, lname, street, city, zip) values ('jdorcey7', 'hYpNvTBJc3', 'jdorcey7@infoseek.co.jp', 'Jacenta', 'Dorcey', '428 Burrows Avenue', 'Pytalovo', 84024);
insert into account (username, password, email, fname, lname, street, city, zip) values ('scrimes8', 'Y2iAHzHiYR', 'scrimes8@gizmodo.com', 'Sydney', 'Crimes', '6 Almo Way', 'Lijiang', 15113);
insert into account (username, password, email, fname, lname, street, city, zip) values ('anehlsen9', 'pFb91nf', 'anehlsen9@theguardian.com', 'Amby', 'Nehlsen', '0285 Rowland Way', 'Reiko', 13807);
insert into account (username, password, email, fname, lname, street, city, zip) values ('aguideraa', 'aMVf7b', 'aguideraa@va.gov', 'Aviva', 'Guidera', '99 3rd Parkway', 'Feni', 84402);
insert into account (username, password, email, fname, lname, street, city, zip) values ('ctibbb', '6PPra1snUz4', 'ctibbb@bandcamp.com', 'Corny', 'Tibb', '2976 Merrick Road', 'Cetinje', 96738);
insert into account (username, password, email, fname, lname, street, city, zip) values ('maizikovitchc', '8aInaOss', 'maizikovitchc@eventbrite.com', 'Margalit', 'Aizikovitch', '4727 Esch Court', 'Himeville', 17481);
insert into account (username, password, email, fname, lname, street, city, zip) values ('lpitkaithlyd', 'ExonXgFtA', 'lpitkaithlyd@wisc.edu', 'Lorain', 'Pitkaithly', '150 Daystar Plaza', 'Sasaguri', 44805);
insert into account (username, password, email, fname, lname, street, city, zip) values ('thousine', '4McMhynuPwu', 'thousine@mtv.com', 'Theadora', 'Housin', '3340 Corry Parkway', 'Tomelilla', 46638);
insert into account (username, password, email, fname, lname, street, city, zip) values ('cbonnysonf', '1XWAuUHS6', 'cbonnysonf@nyu.edu', 'Cally', 'Bonnyson', '76 Summit Lane', 'Manalu', 69383);
insert into account (username, password, email, fname, lname, street, city, zip) values ('dwynessg', '4HuyLpP09vN', 'dwynessg@pbs.org', 'Delilah', 'Wyness', '39 Dovetail Crossing', 'Salamnunggal', 30952);
insert into account (username, password, email, fname, lname, street, city, zip) values ('candriesseh', 'aQQI41', 'candriesseh@npr.org', 'Corette', 'Andriesse', '90 Donald Trail', 'Lens', 33315);
insert into account (username, password, email, fname, lname, street, city, zip) values ('cgodbolti', 'e1EGbx6TTDhy', 'cgodbolti@toplist.cz', 'Collen', 'Godbolt', '7 Morning Parkway', 'Zagreb', 84103);
insert into account (username, password, email, fname, lname, street, city, zip) values ('mglauberj', '7YTSMKj6ceU', 'mglauberj@blinklist.com', 'Maureen', 'Glauber', '041 Mitchell Junction', 'Douarnenez', 33130);


insert into product (name, price, categories_id) values ('Praline Paste', '1239.10', 6);
insert into product (name, price, categories_id) values ('Ice - Clear, 300 Lb For Carving', '1911.02', 7);
insert into product (name, price, categories_id) values ('Sprouts - China Rose', '974.79', 6);
insert into product (name, price, categories_id) values ('Pepperoni Slices', '1671.28', 4);
insert into product (name, price, categories_id) values ('Soup - Tomato Mush. Florentine', '1828.31', 6);
insert into product (name, price, categories_id) values ('Vodka - Smirnoff', '1489.59', 8);
insert into product (name, price, categories_id) values ('Shrimp - 16/20, Iqf, Shell On', '1173.10', 9);
insert into product (name, price, categories_id) values ('Canada Dry', '117.98', 8);
insert into product (name, price, categories_id) values ('Pasta - Bauletti, Chicken White', '1340.17', 10);
insert into product (name, price, categories_id) values ('Pasta - Orzo, Dry', '107.84', 5);
