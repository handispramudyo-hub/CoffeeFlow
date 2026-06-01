import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import {
  DollarSign, ShoppingBag, AlertTriangle, TrendingUp, Coffee,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import StatCard from "../components/ui/StatCard";
import Card, { CardHeader } from "../components/ui/Card";
import Badge from "../components/ui/Badge";

export default function Dashboard() {
  const [stats, setStats] = useState({ revenue: 0, revenueMonth: 0, orders: 0, products: 0, lowStock: [] });
  const [salesChart, setSalesChart] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: orders } = await supabase.from("orders").select("total_price, created_at");
      const { data: menus } = await supabase.from("menus").select("id", { count: "exact" });
      const { data: inventory } = await supabase.from("inventory").select("*");
      const { data: orderItems } = await supabase.from("order_items").select("menu_id, quantity, menus(name)");

      const revenue = orders?.reduce((a, o) => a + Number(o.total_price), 0) || 0;
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const monthOrders = orders?.filter((o) => o.created_at >= monthStart) || [];
      const revenueMonth = monthOrders.reduce((a, o) => a + Number(o.total_price), 0);

      const lowStock = inventory?.filter((i) => i.stock <= i.min_stock) || [];

      // Sales chart (dummy weekly)
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      setSalesChart(days.map((d) => ({ name: d, sales: 300000 + Math.random() * 500000, revenue: 400000 + Math.random() * 600000 })));

      // Best sellers
      if (orderItems) {
        const grouped = {};
        orderItems.forEach((item) => {
          const name = item.menus?.name || "Unknown";
          grouped[name] = (grouped[name] || 0) + item.quantity;
        });
        setBestSellers(Object.entries(grouped).sort((a, b) => b[1] - a[1]).slice(0, 5));
      }

      setStats({ revenue, revenueMonth, orders: orders?.length || 0, products: menus?.length || 0, lowStock });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { (async () => { await fetchData(); })(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-coffee-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-900">Dashboard</h1>
        <p className="text-sm text-coffee-400 mt-0.5">Your coffee shop at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Revenue Today" value={`Rp ${stats.revenue.toLocaleString()}`} trend="+12.5%" color="coffee" />
        <StatCard icon={TrendingUp} label="Revenue This Month" value={`Rp ${stats.revenueMonth.toLocaleString()}`} color="green" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.orders} color="blue" />
        <StatCard icon={Coffee} label="Total Products" value={stats.products} color="yellow" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Sales Trend" subtitle="This week" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DC" />
                <XAxis dataKey="name" stroke="#B89A7E" fontSize={12} />
                <YAxis stroke="#B89A7E" fontSize={12} />
                <Tooltip formatter={(v) => `Rp ${v.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: "1px solid #EDE5DC" }} />
                <Bar dataKey="sales" fill="#6F4E37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Revenue Trend" subtitle="This week" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DC" />
                <XAxis dataKey="name" stroke="#B89A7E" fontSize={12} />
                <YAxis stroke="#B89A7E" fontSize={12} />
                <Tooltip formatter={(v) => `Rp ${v.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: "1px solid #EDE5DC" }} />
                <Line type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} dot={{ fill: "#16A34A", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Best Selling Products" />
          <div className="space-y-3">
            {bestSellers.length === 0 && <p className="text-sm text-coffee-400">No sales data yet.</p>}
            {bestSellers.map(([name, qty], i) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-coffee-100 flex items-center justify-center text-xs font-bold text-coffee-600">#{i + 1}</span>
                <span className="flex-1 text-sm text-coffee-800">{name}</span>
                <span className="text-sm font-semibold text-coffee-700">{qty} sold</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Low Stock Alert" subtitle={`${stats.lowStock.length} items need attention`} />
          <div className="space-y-3">
            {stats.lowStock.length === 0 && <p className="text-sm text-coffee-400">All stock levels are healthy.</p>}
            {stats.lowStock.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-danger" />
                  <span className="text-sm font-medium text-coffee-800">{item.name}</span>
                </div>
                <Badge variant="danger">{item.stock} {item.unit} left</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
