import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, trend, color = "coffee" }) {
  const colors = {
    coffee: "bg-coffee-700 text-white",
    green: "bg-success text-white",
    yellow: "bg-warning text-white",
    red: "bg-danger text-white",
    blue: "bg-blue-600 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-card border border-coffee-100 p-5 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color] ?? colors.coffee}`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-coffee-400 uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-coffee-900 mt-0.5">{value}</p>
        {trend && <p className={`text-xs mt-0.5 ${trend.startsWith("+") ? "text-success" : "text-danger"}`}>{trend}</p>}
      </div>
    </motion.div>
  );
}
