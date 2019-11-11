-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh

-- Removes tables if they previously existed in your database
drop table if exists `order_product`;
drop table if exists `orders`;
drop table if exists `payment`;
drop table if exists `account`;
drop table if exists `product`;
drop table if exists `categories`;

create table `account` (
    `id` int(10) not null auto_increment,
    `username` varchar(255) not null,
    `password` varchar(50) not null,
    `email` varchar(255) not null,
    `fname` varchar(30) not null,
    `lname` varchar(30) not null,
    `street` varchar(30) not null,
    `city` varchar(20) not null,
    `zip` varchar(10) not null,
    primary key (`id`),
    unique `full_name` (fname, lname)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `payment` (
    `id` int(10) not null auto_increment,
    `user_id` int(10) not null,
    `fname` varchar(30) not null,
    `lname` varchar(30) not null,
    `street` varchar(30) not null,
    `city` varchar(20) not null,
    `zip` varchar(10) not null,
    `card_num` int(16) not null,
    `exp_month` int(2) not null,
    `exp_year` int(2) not null,
    primary key (`id`),
    foreign key (user_id) references account(id) on delete cascade
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `orders` (
    `id` int(10) not null auto_increment,
    `user_id` int(10) not null,
    `payment_id` int(10) not null,
    `order_date` timestamp not null,
    `order_total` decimal(10, 2) not null,
    primary key (`id`),
    foreign key (user_id) references account(id) on delete cascade,
    foreign key (payment_id) references payment(id) on delete cascade
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `categories` (
    `id` int(10) auto_increment not null,
    `name` varchar(255) not null,
    primary key (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `product` (
    `id` int(10) not null auto_increment,
    `name` varchar(255) not null,
    `price` decimal(8, 2) not null,
    `inventory` int(10) not null,
    `category_id` int(10),
    primary key (`id`),
    foreign key (category_id) references categories(id) on delete cascade
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `order_product` (
    `order_id` int(10) not null auto_increment,
    `product_id` int(10) not null,
    `quantity` int(3) not null,
    `price` decimal(8, 2) not null,
    primary key (`order_id`),
    foreign key (`order_id`) references orders(id) on delete cascade,
    foreign key (`product_id`) references product(id) on delete cascade
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Tables that don't contain foreign keys must have their data inserted first

insert into account(username, password, email, fname, lname, street, city, zip)
values
    ('barry', 'barry123', 'barryiscool@gmail.com', 'Barack', 'Obama', '123 Fake Street', 'DC', '90210'),
    ('willy', 'whereswill', 'notwillsmith@gmail.com', 'Will', 'Smith', '315 Fake Street', 'Los Angeles', '91111');

insert into payment(user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year)
values
    (1, 'Barack', 'Obama', '123 Fake Street', 'DC', '90210', '1234567890987654', '11', '12');

insert into categories(name)
values
    ('clothing'), ('electronics');

insert into orders(user_id, payment_id, order_date, order_total)
values
    (2, 1, CURRENT_TIMESTAMP, 12345678.90),
    (2, 1, now(), 349.95),
    (2, 1, CURRENT_TIME, 349.95),
    (2, 1, UTC_TIMESTAMP, 349.95);

insert into product(name, price, inventory, category_id)
values
    ('car', 123456.78, 1234567890, 1);

insert into order_product(order_id, product_id, quantity, price)
values
    (1, 1, 24, 123456.78);

DESCRIBE payment;
DESCRIBE account;
DESCRIBE categories;
DESCRIBE orders;
DESCRIBE order_product;
DESCRIBE product;
