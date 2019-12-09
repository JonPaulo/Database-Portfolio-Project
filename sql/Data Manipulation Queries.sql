-- DATA MANIPULATION QUERIES

-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh
-- SELECT, INSERT, UPDATE, AND DELETE queries used for our database

-- Account Table Code

  -- INSERT new account
  INSERT INTO account(username, password, email, fname, lname, street, city, zip)
  VALUES (:usernameInput, :passwordInput, :emailInput, :fnameInput, :lnameInput, :streetInput, :cityInput, :zipInput);

  -- SELECT account table data
  SELECT id, username, password, email, fname, lname, street, city, zip FROM account

  -- UPDATE account

  UPDATE account SET username = :usernameInput, password = :passwordInput, email = :emailInput,
    fname = :fnameInput, lname = :lnameInput, street = :streetInput, city = :cityInput, zip = :zipInput
    WHERE id = :idSelected;

  -- DELETE account where username = whatever the user selected
  DELETE FROM account WHERE id = :idSelected;




-- Product Table Code

  -- INSERT new product
  INSERT INTO product (name, price, categories_id)
  VALUES (:nameInput, :priceInput, :selectionOfcategories_ids)

  -- SELECT product table data and include category name
  SELECT product.id as id, product.name as name, price, categories_id, categories.name as categories_name FROM product LEFT JOIN categories on product.categories_id = categories.id

  -- UPDATE product

  -- UPDATE when assigning a product to a NULL Category
  UPDATE product SET name=:nameInput, price=:priceInput, categories_id=NULL
  WHERE id = :idSelected

  -- UPDATE when assigning a product with a Category
  UPDATE product SET name=:nameInput, price=:priceInput, categories_id=:selectedCategoryID
  WHERE id = :idSelected

  -- Delete product at id location
  DELETE FROM product WHERE id = :idSelected;




-- Orders_Product Table Code

  -- INSERT new orders_product
  INSERT INTO orders_product (order_id, product_id, quantity)
  VALUES (:order_id, :newProductID, :newQuantity)

  -- SELECT orders_product table data with product data
  SELECT orders_id, product_id, product.name, product.price, quantity FROM orders_product INNER JOIN product on orders_product.product_id = product.id

  -- UPDATE orders_product
  UPDATE orders_product SET order_id=:orderSelected, product_id= :productSelected, quantity= :quantityChosen
  WHERE id = :idSelected AND product_id = :productSelected

  -- Delete orders_product at id location
  DELETE FROM DELETE FROM orders_product WHERE orders_id = :idSelected AND product_id = :productSelected;



-- Orders Table Code

  -- INSERT new order
  INSERT INTO product (name, price, categories_id)
  VALUES (:nameOfProduct, :priceInput, :selectionOfcategories_ids)

  -- SELECT orders table data
  SELECT id as oid, user_id, payment_id, order_date FROM orders

  -- UPDATE orders
  UPDATE orders SET user_id=:dropdownOfAccountList, payment_id=dropdownOfPaymentList,
  order_date=:inputCalendarDate WHERE id = :idSelected

  -- DELETE orders at id location
  DELETE FROM product WHERE id = :idSelected;




-- Payment Table Code

  -- INSERT new payment
  INSERT INTO payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year)
  VALUES (:dropdownOfAccountList, :fnameInput, :lnameInput, :streetInput, :cityInput,
  :zipInput, :card_numInput, :dayOfExp_Month, :dayOfExp_Year)

  -- SELECT payment table data with Account information
  SELECT payment.id as pid, user_id, username, payment.fname, payment.lname, payment.street, payment.city, payment.zip, card_num, exp_month, exp_year FROM payment INNER JOIN account on payment.user_id = account.id

  -- UPDATE payment
  UPDATE payment SET user_id=:dropdownOfAccountList, fname=?, lname=?,
  street=:streetInput, city=:cityInput, zip=:zipInput, card_num=:card_numInput,
  exp_month=:dayOfExp_Month, exp_year=:dayOfExp_Year
  WHERE id = :idSelected

  -- DELETE payment at id location
  DELETE FROM payment WHERE id = :idSelected;




-- Categories Table Code

  -- INSERT new category
  INSERT INTO categories (name) VALUES (:categoryInput)

  -- SELECT category table data
  SELECT id, name FROM categories

  -- UPDATE category
  UPDATE categories SET name = :categoryInput WHERE id = :idSelected

  -- DELETE category at id location
  DELETE FROM categories WHERE id = :idSelected
