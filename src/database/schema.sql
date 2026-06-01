-- ============================================
-- CoffeeFlow Database Schema
-- ============================================

-- Users (extends Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'cashier' CHECK (role IN ('owner', 'manager', 'cashier')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menus
CREATE TABLE menus (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Coffee',
  price DECIMAL(12,2) NOT NULL,
  description TEXT,
  image TEXT,
  stock INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  total_price DECIMAL(12,2) NOT NULL,
  payment_method TEXT DEFAULT 'Cash',
  notes TEXT,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  menu_id BIGINT REFERENCES menus(id),
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory
CREATE TABLE inventory (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'pcs',
  min_stock INT NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock History
CREATE TABLE stock_history (
  id BIGSERIAL PRIMARY KEY,
  inventory_id BIGINT REFERENCES inventory(id) ON DELETE CASCADE,
  change INT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('restock', 'adjustment', 'sold')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers
CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Points
CREATE TABLE customer_points (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id) ON DELETE CASCADE,
  points INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Transactions
CREATE TABLE customer_transactions (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES orders(id),
  amount DECIMAL(12,2) NOT NULL,
  points_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_menus_category ON menus(category);
CREATE INDEX idx_menus_active ON menus(is_active);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_inventory_stock ON inventory(stock);
CREATE INDEX idx_customer_points ON customer_points(customer_id);
CREATE INDEX idx_customer_transactions ON customer_transactions(customer_id);

-- ============================================
-- Seed Data
-- ============================================
INSERT INTO menus (name, category, price, description, is_active) VALUES
  ('Espresso', 'Coffee', 28000, 'Rich and bold single shot espresso', true),
  ('Cappuccino', 'Coffee', 35000, 'Espresso with steamed milk foam', true),
  ('Caramel Latte', 'Coffee', 42000, 'Smooth latte with caramel syrup', true),
  ('Matcha Latte', 'Non-Coffee', 38000, 'Japanese matcha with steamed milk', true),
  ('Chocolate Croissant', 'Snack', 25000, 'Buttery croissant with chocolate filling', true),
  ('Cheesecake', 'Dessert', 32000, 'New York style cheesecake', true);

INSERT INTO inventory (name, stock, unit, min_stock) VALUES
  ('Coffee Beans', 25, 'kg', 10),
  ('Milk', 30, 'liter', 15),
  ('Sugar', 20, 'kg', 10),
  ('Chocolate Syrup', 15, 'bottle', 5),
  ('Cups', 200, 'pcs', 50);

-- ============================================
-- RPC Functions
-- ============================================

-- Daily Report
CREATE OR REPLACE FUNCTION daily_report(report_date DATE)
RETURNS TABLE (
  total_revenue DECIMAL,
  total_orders BIGINT,
  avg_order_value DECIMAL
) LANGUAGE SQL AS $$
  SELECT
    COALESCE(SUM(total_price), 0),
    COUNT(*),
    COALESCE(AVG(total_price), 0)
  FROM orders
  WHERE DATE(created_at) = report_date;
$$;

-- Weekly Report
CREATE OR REPLACE FUNCTION weekly_report(start_date DATE, end_date DATE)
RETURNS TABLE (
  date DATE,
  revenue DECIMAL,
  orders BIGINT
) LANGUAGE SQL AS $$
  SELECT
    DATE(created_at),
    COALESCE(SUM(total_price), 0),
    COUNT(*)
  FROM orders
  WHERE DATE(created_at) BETWEEN start_date AND end_date
  GROUP BY DATE(created_at)
  ORDER BY DATE(created_at);
$$;

-- Monthly Report
CREATE OR REPLACE FUNCTION monthly_report(report_year INT, report_month INT)
RETURNS TABLE (
  total_revenue DECIMAL,
  total_orders BIGINT,
  best_seller TEXT,
  items_sold BIGINT
) LANGUAGE SQL AS $$
  SELECT
    COALESCE(SUM(o.total_price), 0),
    COUNT(DISTINCT o.id),
    COALESCE(m.name, '-'),
    COALESCE(SUM(oi.quantity), 0)
  FROM orders o
  LEFT JOIN order_items oi ON oi.order_id = o.id
  LEFT JOIN menus m ON m.id = oi.menu_id
  WHERE EXTRACT(YEAR FROM o.created_at) = report_year
    AND EXTRACT(MONTH FROM o.created_at) = report_month
  GROUP BY m.name
  ORDER BY SUM(oi.quantity) DESC
  LIMIT 1;
$$;
