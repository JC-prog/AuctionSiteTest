-- Add values into user table
INSERT INTO user (user_id, user_name, user_email, user_password, user_number, user_address, is_admin, is_active) VALUES
(1, 'User1', 'user1@ezauction.com', 'user1', '100', 'user1 address', false, true),
(2, 'User2', 'user1@ezauction.com', 'user1', '100', 'user2 address', false, true),
(3, 'Buyer1', 'buyer1@ezauction.com', 'buyer1', '100', 'buyer1 address', false, true),
(4, 'Seller1', 'seller1@ezauction.com', 'seller1', '100', 'seller1 address', false, true),
(5, 'Admin1', 'admin1@ezauction.com', 'admin1', '100', 'admin1 address', false, true);

-- Add values into item category
INSERT INTO item_category (cat_id, cat_name, is_active) VALUES
(1, 'Electronics', true),
(2, 'Books', true),
(3, 'Clothing', true),
(4, 'Home & Garden', true),
(5, 'Toys', true),
(6, 'Sports', true);

-- Add values into auction_type table
INSERT INTO auction_type (auction_type_id, auction_type_name, is_active) VALUES
(1, 'Low Start High', true),
(2, 'Price Up', true),
(3, 'Normal Auction', true);

-- Add values into duration_preset
INSERT INTO duration_preset (duration_preset_id, duration_preset_name, duration_preset_hours, is_active) VALUES
(1, '1 Day', 24, true),
(2, '3 Days', 72, true),
(3, '1 Week', 168, true),
(4, '2 Weeks', 336, true);

-- Add values into item
INSERT INTO item (item_id, seller_id, item_title, item_category_num, item_condition, description, auction_type, duration_preset_id, start_date, end_date, start_price, min_sell_price, listing_status, is_active) VALUES
(1, 4, 'Bicycle 1', 6, 'new', 'New Bicycle', 2, 1, '2024-06-10 00:00:00', '2024-06-11 00:00:00', 1.00, 1.00, 'active', 1);

