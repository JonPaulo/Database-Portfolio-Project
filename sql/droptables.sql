-- Use this code to drop all of the tables from your database
-- The order is specific. Tables can only be dropped if there is no FOREIGN KEY referencing it.
-- Therefore, order_product must be dropped first.

DROP TABLE IF EXISTS `order_product`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `categories`;
