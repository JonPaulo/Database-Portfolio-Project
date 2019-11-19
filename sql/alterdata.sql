-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh
-- Sample of SELECT, INSERT, UPDATE, AND DELETE queries to our database

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
  INSERT INTO product (name, price, inventory, category_id)
  VALUES (:nameInput, :priceInput, :inventoryInput, :selectionOfCategory_Ids)

  -- SELECT product table data
  SELECT id, name, price, inventory, category_id FROM product

  -- UPDATE product
  UPDATE product SET name=:nameInput, price=:priceInput, inventory=:inventoryInput,
  category_id=selectionOfCategory_Ids WHERE id = :idSelected

  -- Delete product at id location
  DELETE FROM product WHERE id = :idSelected;

-- Orders_Product Table Code
-- THIS PART IS STILL UNFINISHED AND TENTATIVE

  -- INSERT new orders_product
  INSERT INTO orders_product (order_id, product_id, quantity, subtotal)
  VALUES (?, ?, ?, ?)

  -- SELECT orders_product table data
  SELECT order_id, product_id, quantity, subtotal FROM orders_product

  -- UPDATE orders_product
  UPDATE orders_product SET order_id=?, product_id=?, quantity=?, subtotal=?
  WHERE id = :idSelected

  -- Delete orders_product at id location
  DELETE FROM orders_product WHERE id = :idSelected;

-- Orders Table Code

  -- INSERT new order
  INSERT INTO product (name, price, inventory, category_id)
  VALUES (:nameOfProduct, :priceInput, :inventoryInput, :selectionOfCategory_Ids)

  -- SELECT orders table data
  SELECT id as oid, user_id, payment_id, order_date, order_total FROM orders

  -- UPDATE orders
  UPDATE orders SET user_id=:dropdownOfAccountList, payment_id=dropdownOfPaymentList,
  order_date=:inputCalendarDate, order_total=:inputPrice WHERE id = :idSelected

  -- DELETE orders at id location
  DELETE FROM product WHERE id = :idSelected;

-- Payment Table Code

  -- INSERT new payment
  INSERT INTO payment (user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year)
  VALUES (:dropdownOfAccountList, :fnameInput, :lnameInput, :streetInput, :cityInput,
  :zipInput, :card_numInput, :dayOfExp_Month, :dayOfExp_Year)

  -- SELECT payment table data
  SELECT id, user_id, fname, lname, street, city, zip, card_num, exp_month, exp_year FROM payment

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
