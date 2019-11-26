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

-- create tables
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
insert into product (name, price, categories_id) values ('Ice - Clear, 300 Lb For Carving', '1.02', 7);
insert into product (name, price, categories_id) values ('Sprouts - China Rose', '97.79', 6);
insert into product (name, price, categories_id) values ('Pepperoni Slices', '16.28', 4);
insert into product (name, price, categories_id) values ('Soup - Tomato Mush. Florentine', '12.31', 6);
insert into product (name, price, categories_id) values ('Vodka - Smirnoff', '149.59', 8);
insert into product (name, price, categories_id) values ('Shrimp - 16/20, Iqf, Shell On', '17.10', 9);
insert into product (name, price, categories_id) values ('Canada Dry', '11.98', 8);
insert into product (name, price, categories_id) values ('Pasta - Bauletti, Chicken White', '14.17', 10);
insert into product (name, price, categories_id) values ('Pasta - Orzo, Dry', '17.84', 5);

insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (4, 'Gaylor', 'Spedroni', '9568 Graceland Road', 'Sonquil', 83173, '6767939231486282', 9, 38);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (13, 'Hastings', 'Gabits', '77 Bay Alley', 'Detroit', 66562, '4041375204567', 7, 88);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (12, 'Sanford', 'Oliver', '90190 Burrows Place', 'Vinsady', 82814, '630449777762645923', 1, 63);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (3, 'Tammy', 'Johnikin', '47 Huxley Terrace', 'Paraty', 76641, '3545161080926435', 4, 30);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (12, 'Claudelle', 'Harpur', '238 Warner Junction', 'Litvínovice', 61771, '3530171840484465', 8, 57);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (8, 'Morley', 'Meikle', '87347 Meadow Ridge Parkway', 'Pancur', 88026, '3583478688121026', 10, 52);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (5, 'Ingrid', 'Colbourne', '40407 Sunbrook Crossing', 'Świnna', 14515, '5110737011255240', 5, 20);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (15, 'Hewet', 'Sheran', '14810 Fulton Place', 'Al Madān', 69873, '3529760208272257', 2, 55);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (23, 'Ailene', 'Sonley', '1347 Grover Street', 'Ondoy', 43379, '3569258839442424', 11, 2);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (15, 'Brigg', 'Morford', '60 Hauk Road', 'Yanhe', 23397, '3571839462092291', 6, 28);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (6, 'Darelle', 'Hargraves', '218 Comanche Avenue', 'Benešov', 80639, '3561863347076750', 10, 58);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (9, 'Rogerio', 'Sommerly', '8287 Shelley Center', 'Vila Chã', 75677, '30538939555739', 3, 79);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (3, 'Alair', 'McCarly', '31632 Susan Alley', 'Asbestos', 77693, '670981288330781158', 9, 91);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (20, 'Filberte', 'Querree', '95 Erie Trail', 'Barra de São Francisco', 51618, '4041379867906', 3, 52);
insert into payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year) values (14, 'Dian', 'Gamet', '54 Dahle Circle', 'Purorejo', 95438, '6759758011988063', 6, 39);
