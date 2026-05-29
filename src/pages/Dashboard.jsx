import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FiDollarSign, FiShoppingBag, FiAlertTriangle } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, lowStock: [] });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // 1. Ambil total pendapatan & jumlah order
    const { data: orders } = await supabase
      .from("orders")
      .select("total_price");
    const revenue =
      orders?.reduce((acc, curr) => acc + Number(curr.total_price), 0) || 0;

    // 2. Ambil stok yang hampir habis (stock <= min_stock)
    const { data: inventories } = await supabase.from("inventory").select("*");
    const lowStock = inventories?.filter((i) => i.stock <= i.min_stock) || [];

    // 3. Data grafik (Mockup/Dummy dulu, karena butuh grouping SQL yang kompleks untuk data asli)
    setChartData([
      { name: "Senin", sales: 420000 },
      { name: "Selasa", sales: 380000 },
      { name: "Rabu", sales: 510000 },
      { name: "Kamis", sales: 460000 },
      { name: "Jumat", sales: 650000 },
      { name: "Sabtu", sales: 820000 },
      { name: "Minggu", sales: 730000 },
    ]);

    setStats({ revenue, orders: orders?.length || 0, lowStock });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-coffee-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={FiDollarSign}
          title="Total Pendapatan"
          value={`Rp ${stats.revenue.toLocaleString()}`}
          color="bg-green-500"
        />
        <StatCard
          icon={FiShoppingBag}
          title="Total Transaksi"
          value={stats.orders}
          color="bg-blue-500"
        />
        <StatCard
          icon={FiAlertTriangle}
          title="Stok Hampir Habis"
          value={stats.lowStock.length + " Item"}
          color="bg-red-500"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100">
        <h2 className="text-xl font-bold mb-4 text-coffee-800">
          Grafik Penjualan Minggu Ini
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#8B5E3C" />
              <YAxis stroke="#8B5E3C" />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Bar dataKey="sales" fill="#6F4E37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peringatan Stok */}
      {stats.lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center gap-2">
            <FiAlertTriangle /> Peringatan Stok Rendah!
          </h3>
          <ul className="list-disc list-inside text-red-600">
            {stats.lowStock.map((item) => (
              <li key={item.id}>
                {item.name} - Sisa: {item.stock} {item.unit} (Min:{" "}
                {item.min_stock})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100 flex items-center gap-4">
      <div className={`${color} p-4 rounded-lg text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-coffee-500">{title}</p>
        <h3 className="text-2xl font-bold text-coffee-800">{value}</h3>
      </div>
    </div>
  );
}
