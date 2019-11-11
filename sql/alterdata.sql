-- Dumb Amazon by Jon Paulo Bautista and Sae Hyoung Oh
-- Sample of SELECT, INSERT, UPDATE, AND DELETE queries to our database

-- Select username and email only from account table
SELECT username, email FROM account;

-- Update: change username from barry to barrybonds
update account set username = 'barrybonds' where username = 'barry';

-- Insert account
insert into account(username, password, email, fname, lname, street, city, zip)
values
    ('tswizzie124', '1password1', 'totallynottaylorswift@gmail.com', 'Taylor', 'Swift', '123 Millionaire Row', 'Bel-Air', '90210');

-- Delete account where username = barrybonds
DELETE FROM account WHERE username = 'barrybonds';

-- Update product category to NULL
update product set category_id = NULL where category_id = 1;