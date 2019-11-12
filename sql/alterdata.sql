-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh
-- Sample of SELECT, INSERT, UPDATE, AND DELETE queries to our database

-- Select username and email only from account table
SELECT username, email FROM account;

-- Update: change username from barry to barrybonds
UPDATE account SET username = 'barrybonds' WHERE username = 'barry';

-- Insert account
INSERT INTO account(username, password, email, fname, lname, street, city, zip)
VALUES
    ('tswizzie124', '1password1', 'totallynottaylorswift@gmail.com', 'Taylor', 'Swift', '123 Millionaire Row', 'Bel-Air', '90210');

-- Delete account where username = snoopy
DELETE FROM account WHERE username = 'snoopy';

-- Update product category to NULL
UPDATE product SET category_id = NULL WHERE category_id = 1;
