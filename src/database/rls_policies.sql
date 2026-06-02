-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (clean slate)
DROP POLICY IF EXISTS "users_all" ON users;
DROP POLICY IF EXISTS "menus_all" ON menus;
DROP POLICY IF EXISTS "orders_all" ON orders;
DROP POLICY IF EXISTS "order_items_all" ON order_items;
DROP POLICY IF EXISTS "inventory_all" ON inventory;
DROP POLICY IF EXISTS "stock_history_all" ON stock_history;
DROP POLICY IF EXISTS "customers_all" ON customers;
DROP POLICY IF EXISTS "customer_points_all" ON customer_points;
DROP POLICY IF EXISTS "customer_transactions_all" ON customer_transactions;

-- Users: each user can SELECT/INSERT/UPDATE their own row
CREATE POLICY "users_own_select" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_own_insert" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_own_update" ON users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Other tables: all authenticated users have full access (UI controls permissions via ROLE_PERMISSIONS)
CREATE POLICY "menus_all" ON menus FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "orders_all" ON orders FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "order_items_all" ON order_items FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "inventory_all" ON inventory FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "stock_history_all" ON stock_history FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "customers_all" ON customers FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "customer_points_all" ON customer_points FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "customer_transactions_all" ON customer_transactions FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
