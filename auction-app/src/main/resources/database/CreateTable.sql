-- Create the User table
CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_number VARCHAR(255),
    user_address VARCHAR(255),
    is_admin BOOLEAN,
    is_active BOOLEAN
);

-- Create the ItemCategory table
CREATE TABLE IF NOT EXISTS item_category (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    cat_name VARCHAR(255),
    is_Active BOOLEAN
);

-- Create the AuctionType table
CREATE TABLE IF NOT EXISTS auction_type (
    auction_type_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_type_name VARCHAR(255),
    is_active BOOLEAN
);

-- Create the DurationPreset table
CREATE TABLE IF NOT EXISTS duration_preset (
    duration_preset_id INT AUTO_INCREMENT PRIMARY KEY,
    duration_preset_name VARCHAR(255),
    duration_preset_hours INT,
    is_active BOOLEAN
);

-- Create the Item table
CREATE TABLE IF NOT EXISTS item (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT,
    item_title VARCHAR(255),
    item_category_num INT,
    item_condition VARCHAR(255),
    description TEXT,
    auction_type INT,
    duration_preset_id INT,
    start_date DATETIME,
    end_date DATETIME,
    start_price DECIMAL(10, 2),
    min_sell_price DECIMAL(10, 2),
    listing_status VARCHAR(255),
    is_active BOOLEAN,
    FOREIGN KEY (seller_id) REFERENCES user(user_id),
    FOREIGN KEY (item_category_num) REFERENCES item_category(cat_id),
    FOREIGN KEY (auction_type) REFERENCES auction_type(auction_type_id),
    FOREIGN KEY (duration_preset_id) REFERENCES duration_preset(duration_preset_id)
);

-- Create the Bid table
CREATE TABLE IF NOT EXISTS bid (
    bid_id INT AUTO_INCREMENT PRIMARY KEY,
    bidder_id INT,
    item_id INT,
    bid_amount DECIMAL(10, 2),
    bid_timestamp DATETIME,
    is_active BOOLEAN,
    FOREIGN KEY (bidder_id) REFERENCES user(user_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

-- Create the Transaction table
CREATE TABLE IF NOT EXISTS transaction (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    seller_id INT,
    item_id INT,
    sale_amount DECIMAL(10, 2),
    status VARCHAR(255),
    transaction_timestamp DATETIME,
    is_active BOOLEAN,
    FOREIGN KEY (buyer_id) REFERENCES user(user_id),
    FOREIGN KEY (seller_id) REFERENCES user(user_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

-- Create the Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT KEY,
    sender_id INT,
    message TEXT,
    feedback_timestamp DATETIME,
    FOREIGN KEY (sender_id) REFERENCES user(user_id)
);

-- Create the Watchlist table
CREATE TABLE IF NOT EXISTS Watchlist (
    watchlist_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    item_id INT,
    watchlist_timestamp DATETIME,
    is_active BOOLEAN,
    FOREIGN KEY (buyer_id) REFERENCES user(user_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

-- Create the TradeRequest table
CREATE TABLE IF NOT EXISTS TradeRequest (
    trade_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    seller_id INT,
    buyer_item_id INT,
    seller_item_id INT,
    status VARCHAR(255),
    trade_request_timestamp DATETIME,
    is_active BOOLEAN,
    FOREIGN KEY (buyer_id) REFERENCES user(user_id),
    FOREIGN KEY (seller_id) REFERENCES user(user_id),
    FOREIGN KEY (buyer_item_id) REFERENCES item(item_id),
    FOREIGN KEY (seller_item_id) REFERENCES item(item_id)
);