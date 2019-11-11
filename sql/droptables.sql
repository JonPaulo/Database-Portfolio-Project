-- Use this code to drop all of the tables from your database
-- The order is specific. Tables can only be dropped if there is no foreign key referencing it.
-- Therefore, order_product must be dropped first.

drop table if exists `order_product`;
drop table if exists `orders`;
drop table if exists `payment`;
drop table if exists `account`;
drop table if exists `product`;
drop table if exists `categories`;
