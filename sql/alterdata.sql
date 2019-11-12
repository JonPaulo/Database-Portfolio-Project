-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh
-- Sample of SELECT, INSERT, UPDATE, AND DELETE queries to our database

-- Select username and email only from account table
SELECT username, email FROM account;

-- Update: edit username info
UPDATE account SET username = :usernameInput, password = :passwordInput, email = :emailInput, fname = :fnameInput, lname = :lnameInput, street = :streetInput, city = :cityInput, zip = :zipInput WHERE id = :idSelected;

-- Insert account
INSERT INTO account(username, password, email, fname, lname, street, city, zip)
VALUES (:usernameInput, :passwordInput, :emailInput, ::fnameInput, :lnameInput, :streetInput, :cityInput, :zipInput);

-- Delete account where username = whatever the user selected
DELETE FROM account WHERE id = :idSelected;

-- Update product category to NULL
UPDATE product SET category_id = NULL WHERE category_id = :idSelected;
