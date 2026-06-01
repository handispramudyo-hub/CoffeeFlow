import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Gift, Star, TrendingUp } from "lucide-react";
import Card, { CardHeader } from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";

export default function Loyalty() {
  const [customers, setCustomers] = useState([]);
  const [rewards, setRewards] = useState([]);

  const fetchData = async () => {
    const { data: customers } = await supabase.from("customers").select("*, customer_points(*)");
    if (customers) setCustomers(customers);

    const { data: rewards } = await supabase.from("customer_points").select("*, customers(name)").order("points", { ascending: false });
    if (rewards) setRewards(rewards);
  };

  useEffect(() => { (async () => { await fetchData(); })(); }, []);

  const totalPoints = rewards.reduce((sum, r) => sum + (r.points || 0), 0);
  const vouchersAvailable = Math.floor(totalPoints / 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-900">Loyalty Program</h1>
        <p className="text-sm text-coffee-400 mt-0.5">Reward your customers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Gift} label="Total Points Issued" value={totalPoints.toLocaleString()} color="coffee" />
        <StatCard icon={Star} label="Active Members" value={customers.length} color="green" />
        <StatCard icon={TrendingUp} label="Vouchers Available" value={vouchersAvailable} color="yellow" />
      </div>

      <Card>
        <CardHeader title="How It Works" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-coffee-50 rounded-xl">
            <p className="text-2xl font-bold text-coffee-700">Rp10,000</p>
            <p className="text-sm text-coffee-500 mt-1">= 1 Point</p>
          </div>
          <div className="p-4 bg-coffee-50 rounded-xl">
            <p className="text-2xl font-bold text-coffee-700">100</p>
            <p className="text-sm text-coffee-500 mt-1">Points Needed</p>
          </div>
          <div className="p-4 bg-coffee-50 rounded-xl">
            <p className="text-2xl font-bold text-coffee-700">Free Drink</p>
            <p className="text-sm text-coffee-500 mt-1">Voucher Reward</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Leaderboard" subtitle="Top customers by points" />
        {rewards.length === 0 ? (
          <EmptyState icon={Gift} title="No loyalty data yet" description="Points will appear when customers make purchases" />
        ) : (
          <div className="space-y-3">
            {rewards.map((r, i) => (
              <div key={r.id} className="flex items-center gap-3 p-3 bg-coffee-50 rounded-xl">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-orange-300 text-orange-800" : "bg-coffee-200 text-coffee-600"}`}>
                  #{i + 1}
                </span>
                <span className="flex-1 text-sm font-medium text-coffee-900">{r.customers?.name ?? "Unknown"}</span>
                <div className="flex items-center gap-2">
                  <Badge>{r.points} pts</Badge>
                  {r.points >= 100 && <Badge variant="success">Voucher Ready</Badge>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
