import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import Card, { CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const weeklyData = [
  { name: "Mon", revenue: 420000, orders: 24 },
  { name: "Tue", revenue: 380000, orders: 20 },
  { name: "Wed", revenue: 510000, orders: 28 },
  { name: "Thu", revenue: 460000, orders: 26 },
  { name: "Fri", revenue: 650000, orders: 35 },
  { name: "Sat", revenue: 820000, orders: 42 },
  { name: "Sun", revenue: 730000, orders: 38 },
];

const bestSellers = [
  { name: "Caramel Latte", value: 35 },
  { name: "Espresso", value: 28 },
  { name: "Cappuccino", value: 22 },
  { name: "Mocha", value: 15 },
];

const COLORS = ["#6F4E37", "#A67B5B", "#D4C5B3", "#8B6548"];

export default function Reports() {
  const [period, setPeriod] = useState("weekly");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">Reports</h1>
          <p className="text-sm text-coffee-400 mt-0.5">Sales analytics and insights</p>
        </div>
        <div className="flex gap-2">
          {["daily", "weekly", "monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${period === p ? "bg-coffee-700 text-white" : "bg-white text-coffee-500 border border-coffee-200 hover:border-coffee-400"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "Rp 3,970,000", trend: "+15.2%" },
          { label: "Total Orders", value: "213", trend: "+8.4%" },
          { label: "Avg Order Value", value: "Rp 18,638", trend: "+3.1%" },
          { label: "Best Day", value: "Saturday", trend: "Rp 820,000" },
        ].map((item) => (
          <Card key={item.label}>
            <p className="text-xs font-medium text-coffee-400 uppercase tracking-wider">{item.label}</p>
            <p className="text-xl font-bold text-coffee-900 mt-1">{item.value}</p>
            <p className="text-xs text-success mt-0.5">{item.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Revenue" subtitle="This period" action={<Button variant="ghost" size="sm" icon={Download}>Export</Button>} />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DC" />
                <XAxis dataKey="name" stroke="#B89A7E" fontSize={12} />
                <YAxis stroke="#B89A7E" fontSize={12} />
                <Tooltip formatter={(v) => `Rp ${v.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: "1px solid #EDE5DC" }} />
                <Bar dataKey="revenue" fill="#6F4E37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Orders Trend" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DC" />
                <XAxis dataKey="name" stroke="#B89A7E" fontSize={12} />
                <YAxis stroke="#B89A7E" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #EDE5DC" }} />
                <Line type="monotone" dataKey="orders" stroke="#A67B5B" strokeWidth={2} dot={{ fill: "#A67B5B", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Best Selling Products" />
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bestSellers} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {bestSellers.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent Orders" />
          <div className="space-y-3">
            {[
              { id: "#1024", items: 3, amount: 85000, status: "Completed" },
              { id: "#1023", items: 2, amount: 62000, status: "Completed" },
              { id: "#1022", items: 1, amount: 28000, status: "Pending" },
              { id: "#1021", items: 4, amount: 120000, status: "Completed" },
              { id: "#1020", items: 2, amount: 55000, status: "Cancelled" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-coffee-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-coffee-900">{order.id}</p>
                  <p className="text-xs text-coffee-400">{order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-coffee-900">Rp {order.amount.toLocaleString()}</p>
                  <Badge variant={order.status === "Completed" ? "success" : order.status === "Pending" ? "warning" : "danger"}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
