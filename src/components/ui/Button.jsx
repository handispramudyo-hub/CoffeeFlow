import { motion } from "framer-motion";

const variants = {
  primary: "bg-coffee-700 text-white hover:bg-coffee-800 shadow-soft",
  secondary: "bg-coffee-100 text-coffee-700 hover:bg-coffee-200",
  outline: "border border-coffee-300 text-coffee-700 hover:bg-coffee-50",
  ghost: "text-coffee-600 hover:bg-coffee-100",
  danger: "bg-danger text-white hover:bg-red-700 shadow-soft",
  success: "bg-success text-white hover:bg-green-700 shadow-soft",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({ children, variant = "primary", size = "md", className = "", icon: Icon, loading, disabled, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coffee-500/40 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? <Icon size={16} /> : null}
      {children}
    </motion.button>
  );
}
