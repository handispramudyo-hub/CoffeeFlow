import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Coffee, BarChart3, Bot, Gift, ShoppingCart, Package, ArrowRight, Check, LayoutDashboard } from "lucide-react";

const features = [
  { icon: Coffee, title: "Menu Management", desc: "Manage your coffee menu with categories, images, and pricing." },
  { icon: ShoppingCart, title: "POS System", desc: "Fast and intuitive point-of-sale with multiple payment methods." },
  { icon: Package, title: "Inventory Control", desc: "Track stock levels, get low-stock alerts, and manage supplies." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Daily, weekly, and monthly reports with beautiful charts." },
  { icon: Gift, title: "Loyalty Program", desc: "Reward your customers with points and free drink vouchers." },
  { icon: Bot, title: "AI Marketing", desc: "Generate Instagram captions, promos, and business insights." },
];

export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-coffee-50">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-coffee-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-coffee-700 flex items-center justify-center text-white text-xs font-bold">CF</div>
            <span className="font-bold text-coffee-900 text-lg">CoffeeFlow</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium bg-coffee-700 text-white px-5 py-2 rounded-xl hover:bg-coffee-800 transition-colors shadow-soft">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-coffee-600 hover:text-coffee-900 px-4 py-2">Sign In</Link>
                <Link to="/register" className="text-sm font-medium bg-coffee-700 text-white px-5 py-2 rounded-xl hover:bg-coffee-800 transition-colors shadow-soft">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-coffee-100 text-coffee-700 mb-4">
              AI-Powered Coffee Shop Management
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-coffee-900 leading-tight">
              Run Your Coffee Shop with{" "}
              <span className="text-coffee-700">AI Intelligence</span>
            </h1>
            <p className="mt-4 text-lg text-coffee-500 max-w-xl mx-auto lg:mx-0">
              Manage sales, inventory, customers, and marketing — all in one modern dashboard powered by AI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/register" className="bg-coffee-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-coffee-800 transition-colors shadow-card inline-flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="border border-coffee-300 text-coffee-700 px-8 py-3 rounded-xl font-semibold hover:bg-coffee-50 transition-colors inline-flex items-center justify-center">
                Sign In
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
              {["No credit card", "Free updates", "AI features included"].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-coffee-500">
                  <Check size={14} className="text-success" /> {text}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex-1 w-full max-w-lg">
            <div className="bg-white rounded-3xl shadow-modal border border-coffee-100 p-6">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-coffee-700 to-coffee-900 flex items-center justify-center">
                <Coffee size={64} className="text-white/30" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-3 bg-coffee-100 rounded-full w-3/4" />
                <div className="h-3 bg-coffee-100 rounded-full w-1/2" />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="h-16 rounded-xl bg-coffee-50" />
                  <div className="h-16 rounded-xl bg-coffee-50" />
                  <div className="h-16 rounded-xl bg-coffee-50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-900">Everything you need</h2>
          <p className="mt-3 text-coffee-500 max-w-md mx-auto">All the tools to manage, analyze, and grow your coffee business.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-card border border-coffee-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center mb-3">
                <f.icon size={20} className="text-coffee-700" />
              </div>
              <h3 className="font-semibold text-coffee-900">{f.title}</h3>
              <p className="text-sm text-coffee-500 mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-coffee-100 py-8 text-center text-sm text-coffee-400">
        <p>&copy; {new Date().getFullYear()} CoffeeFlow. AI-Powered Coffee Shop Management.</p>
      </footer>
    </div>
  );
}
