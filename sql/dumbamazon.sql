-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh

drop table if exists `account`;
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

drop table if exists `payment`;
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
    foreign key (user_id) references account(id)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `orders` (
    `id` int(10) not null auto_increment,
    `user_id` int(10) not null,
    `payment_id` int(10) not null,
    `order_date` timestamp not null,
    `order_total` decimal(10, 2) not null,
    primary key (`id`),
    foreign key (user_id) references account(id),
    foreign key (payment_id) references payment(id)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `categories` (
    `id` int(10) not null auto_increment,
    `name` varchar(255),
    primary key (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `product` (
    `id` int(10) not null auto_increment,
    `name` varchar(255) not null,
    `price` decimal(8, 2) not null,
    `inventory` int(10) not null,
    `category_id` int(10) not null,
    primary key (`id`),
    foreign key (category_id) references categories(id)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `order_product` (
    `order_id` int(10) not null auto_increment,
    `product_id` int(10) not null,
    `quantity` int(3) not null,
    `price` decimal(8, 2) not null,
    primary key (`order_id`),
    foreign key (`order_id`) references orders(id),
    foreign key (`product_id`) references product(id)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into account(username, password, email, fname, lname, street, city, zip)
values
    ('barry', 'barry123', 'barryiscool@gmail.com', 'Barack', 'Obama', '123 Fake Street', 'DC', '90210'),
    ('willy', 'whereswill', 'notwillsmith@gmail.com', 'Will', 'Smith', '315 Fake Street', 'Los Angeles', '91111');

insert into payment(user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year)
values
    (1, 'Barack', 'Obama', '123 Fake Street', 'DC', '90210', '1234567890987654', '11', '12');


DESCRIBE payment;
DESCRIBE account;
DESCRIBE categories;
DESCRIBE orders;
DESCRIBE order_product;
DESCRIBE product;
