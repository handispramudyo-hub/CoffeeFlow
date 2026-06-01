import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-card border border-coffee-100 p-6 ${hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-coffee-900">{title}</h3>
        {subtitle && <p className="text-sm text-coffee-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
