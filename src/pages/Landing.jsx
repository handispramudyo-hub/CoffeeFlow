import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  Coffee, BarChart3, Bot, Gift, ShoppingCart, Package,
  ArrowRight, Check, Menu, X, Star, Quote, ChevronRight,
  TrendingUp, Users, Zap, Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] } }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const features = [
  { icon: ShoppingCart, title: "POS System", desc: "Fast point-of-sale with multiple payment methods, order management, and receipt printing in one seamless flow." },
  { icon: Coffee, title: "Menu Manager", desc: "Organize items by category, set pricing, manage images, and toggle availability in real-time." },
  { icon: Package, title: "Inventory", desc: "Track stock levels with low-stock alerts, auto-adjust on sales, and view usage history." },
  { icon: BarChart3, title: "Analytics", desc: "Daily, weekly, and monthly reports with revenue charts, best-seller tracking, and order trends." },
  { icon: Users, title: "Customers", desc: "Build customer profiles, track transaction history, and manage loyalty points." },
  { icon: Gift, title: "Loyalty", desc: "Points-based rewards system that automatically tracks and redeems customer loyalty points." },
  { icon: Bot, title: "AI Assistant", desc: "Generate marketing captions, promotions, and business insights powered by OpenAI." },
  { icon: TrendingUp, title: "Growth Tools", desc: "Data-driven insights to optimize pricing, identify trends, and grow revenue." },
];

const testimonials = [
  { name: "Sarah Chen", role: "Owner, Brew & Co.", avatar: "SC", quote: "CoffeeFlow transformed how we manage our shop. The AI marketing feature alone saved us hours every week.", rating: 5 },
  { name: "Marcus Johnson", role: "Manager, Urban Grind", avatar: "MJ", quote: "The inventory tracking is a game-changer. We reduced waste by 30% in the first month.", rating: 5 },
  { name: "Elena Rodriguez", role: "Owner, Cafe Sol", avatar: "ER", quote: "Beautiful interface, powerful analytics, and the loyalty program keeps our customers coming back.", rating: 5 },
  { name: "David Kim", role: "Barista Lead, Oak & Bean", avatar: "DK", quote: "The POS is incredibly fast. During rush hour, every second counts and this delivers.", rating: 5 },
];

const plans = [
  { name: "Starter", price: "29", desc: "For small cafes getting started", features: ["Up to 500 orders/mo", "Basic analytics", "Menu management", "Email support"], popular: false },
  { name: "Pro", price: "79", desc: "For growing coffee shops", features: ["Unlimited orders", "Advanced analytics", "AI Marketing", "Inventory management", "Priority support"], popular: true },
  { name: "Enterprise", price: "199", desc: "For multi-location chains", features: ["Everything in Pro", "Multi-store", "Custom integrations", "Dedicated account manager", "99.9% uptime SLA"], popular: false },
];

export default function Landing() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(253,251,249,0)", "rgba(253,251,249,0.85)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(237,229,220,1)"]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-coffee-900 overflow-hidden">
      {/* Nav */}
      <motion.header
        style={{ background: navBg, borderBottomColor: navBorder }}
        className="fixed top-0 inset-x-0 z-50 border-b transition-shadow duration-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-coffee-700 flex items-center justify-center text-white text-sm font-bold group-hover:bg-coffee-800 transition-colors">CF</div>
            <span className="font-bold text-xl tracking-tight">CoffeeFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-coffee-500 hover:text-coffee-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-coffee-500 hover:text-coffee-900 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm text-coffee-500 hover:text-coffee-900 transition-colors">Pricing</a>
            {user ? (
              <Link to="/dashboard" className="text-sm font-medium bg-coffee-700 text-white px-5 py-2.5 rounded-xl hover:bg-coffee-800 transition-all shadow-soft">
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-coffee-600 hover:text-coffee-900 px-4 py-2 transition-colors">Sign In</Link>
                <Link to="/register" className="text-sm font-medium bg-coffee-700 text-white px-5 py-2.5 rounded-xl hover:bg-coffee-800 transition-all shadow-soft">
                  Get Started
                </Link>
              </div>
            )}
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-coffee-100 text-coffee-500" onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMenuOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#FDFBF9] p-6 shadow-2xl"
            >
              <div className="flex justify-end mb-8">
                <button className="p-2 rounded-lg hover:bg-coffee-100" onClick={() => setMenuOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                <a href="#features" onClick={() => setMenuOpen(false)} className="text-lg text-coffee-500 hover:text-coffee-900 transition-colors">Features</a>
                <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-lg text-coffee-500 hover:text-coffee-900 transition-colors">Testimonials</a>
                <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-lg text-coffee-500 hover:text-coffee-900 transition-colors">Pricing</a>
                {user ? (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-center text-base font-medium bg-coffee-700 text-white px-5 py-3 rounded-xl hover:bg-coffee-800">
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="text-center text-base font-medium text-coffee-600 border border-coffee-300 px-5 py-3 rounded-xl">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="text-center text-base font-medium bg-coffee-700 text-white px-5 py-3 rounded-xl">
                      Get Started
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── Hero ───── */}
      <section className="relative pt-24 md:pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-100/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-coffee-700/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="flex-1 text-center lg:text-left max-w-xl">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coffee-700/10 text-coffee-700 border border-coffee-700/20">
                  <Zap size={12} /> AI-Powered Coffee Shop Management
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight"
              >
                Run Your
                <br />
                <span className="text-coffee-700">Coffee Shop</span>
                <br />
                with AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-coffee-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                The modern platform for managing sales, inventory, customers, and marketing — powered by artificial intelligence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link to="/register" className="group bg-coffee-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-coffee-800 transition-all shadow-card inline-flex items-center justify-center gap-2 text-base">
                  Start Free Trial <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a href="#features" className="border border-coffee-300 text-coffee-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-coffee-50 transition-colors inline-flex items-center justify-center text-base">
                  Learn More
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-5 justify-center lg:justify-start"
              >
                {["No credit card", "Free updates", "AI features included"].map((text) => (
                  <span key={text} className="flex items-center gap-1.5 text-sm text-coffee-500">
                    <Check size={14} className="text-coffee-700" /> {text}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Hero mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 w-full max-w-2xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-transparent to-transparent z-10 pointer-events-none" />
                <div className="bg-white rounded-3xl shadow-2xl border border-coffee-200/60 overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3 bg-coffee-50 border-b border-coffee-100">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs text-coffee-400 font-mono">dashboard.coffeeflow.io</span>
                  </div>
                  <div className="p-5 md:p-8">
                    {/* Stat cards */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label: "Today's Revenue", value: "$1,284", change: "+12.5%", up: true },
                        { label: "Orders", value: "47", change: "+8.2%", up: true },
                        { label: "Avg. Order", value: "$27.32", change: "+3.1%", up: true },
                      ].map((s) => (
                        <div key={s.label} className="bg-coffee-50 rounded-xl p-3 md:p-4">
                          <p className="text-[10px] md:text-xs text-coffee-400 font-medium uppercase tracking-wider">{s.label}</p>
                          <p className="text-lg md:text-2xl font-bold text-coffee-900 mt-1">{s.value}</p>
                          <p className={`text-[10px] md:text-xs font-medium mt-0.5 ${s.up ? 'text-green-600' : 'text-red-500'}`}>{s.change}</p>
                        </div>
                      ))}
                    </div>
                    {/* Chart */}
                    <div className="bg-white rounded-xl border border-coffee-100 p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm font-semibold text-coffee-900">Weekly Revenue</p>
                        <span className="text-[10px] text-coffee-400">This week</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-24">
                        {[35, 45, 30, 55, 60, 75, 65].map((h, i) => (
                          <motion.div
                            key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                            transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                            className="flex-1 bg-coffee-700/20 rounded-t-lg relative group hover:bg-coffee-700/40 transition-colors cursor-pointer"
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-coffee-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">${h * 20}</div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex gap-1.5 mt-1.5">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                          <span key={d} className="flex-1 text-center text-[9px] text-coffee-400">{d}</span>
                        ))}
                      </div>
                    </div>
                    {/* Bottom row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-coffee-50 rounded-xl p-3 md:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee size={14} className="text-coffee-700" />
                          <p className="text-xs font-semibold text-coffee-900">Best Seller</p>
                        </div>
                        <p className="text-sm font-bold text-coffee-900">Caramel Latte</p>
                        <p className="text-[10px] text-coffee-400">42 sold today</p>
                      </div>
                      <div className="bg-coffee-50 rounded-xl p-3 md:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Package size={14} className="text-coffee-700" />
                          <p className="text-xs font-semibold text-coffee-900">Low Stock</p>
                        </div>
                        <p className="text-sm font-bold text-coffee-900">Coffee Beans</p>
                        <p className="text-[10px] text-orange-500">4 kg remaining</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="py-24 md:py-32 bg-white border-y border-coffee-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16 md:mb-20">
            <motion.span variants={fadeUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coffee-700/10 text-coffee-700 border border-coffee-700/20 mb-4">
              Everything you need
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Built for coffee shops
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-coffee-500 max-w-xl mx-auto">
              All the tools to manage, analyze, and grow your coffee business in one place.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title} variants={fadeUp} custom={i}
                className="group p-6 rounded-2xl border border-coffee-100 bg-white hover:border-coffee-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center mb-4 group-hover:bg-coffee-700 group-hover:text-white transition-colors">
                  <f.icon size={20} className="text-coffee-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-coffee-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-coffee-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── Dashboard Preview ───── */}
      <section className="py-24 md:py-32 bg-[#FDFBF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex-1 max-w-lg">
              <motion.span variants={fadeUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coffee-700/10 text-coffee-700 border border-coffee-700/20 mb-4">
                <Layers size={12} className="mr-1" /> Dashboard
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Everything at a glance
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-lg text-coffee-500 leading-relaxed">
                A clean, intuitive dashboard that shows your key metrics — revenue, orders, low stock alerts, and best sellers — all updated in real time.
              </motion.p>
              <motion.ul variants={stagger} className="mt-6 space-y-3">
                {["Real-time revenue tracking", "Order and sales analytics", "Low inventory alerts", "Best-selling products"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-coffee-700">
                    <Check size={16} className="text-coffee-700 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 w-full"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-coffee-200/60 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 bg-coffee-50 border-b border-coffee-100">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Revenue", value: "$12,847", change: "+18.2%" },
                      { label: "Orders", value: "423", change: "+12.5%" },
                      { label: "Customers", value: "189", change: "+22.1%" },
                      { label: "Items Sold", value: "1,247", change: "+15.8%" },
                    ].map((s) => (
                      <div key={s.label} className="bg-coffee-50 rounded-xl p-4">
                        <p className="text-xs text-coffee-400 mb-1">{s.label}</p>
                        <p className="text-xl font-bold text-coffee-900">{s.value}</p>
                        <p className="text-xs text-green-600 font-medium">{s.change}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-5">
                    <p className="text-sm font-semibold text-coffee-900 mb-4">Monthly Revenue</p>
                    <div className="flex items-end gap-2 h-32">
                      {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          className="flex-1 bg-gradient-to-t from-coffee-700 to-coffee-500 rounded-t-lg"
                        >
                          <div className="h-full w-full rounded-t-lg bg-black/5" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                        <span key={m} className="flex-1 text-center text-[8px] text-coffee-400">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── Analytics ───── */}
      <section className="py-24 md:py-32 bg-white border-y border-coffee-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex-1 max-w-lg">
              <motion.span variants={fadeUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coffee-700/10 text-coffee-700 border border-coffee-700/20 mb-4">
                <BarChart3 size={12} className="mr-1" /> Analytics
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Data that drives decisions
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-lg text-coffee-500 leading-relaxed">
                From daily reports to monthly trends, understand exactly how your business is performing with beautiful, interactive charts.
              </motion.p>
              <motion.ul variants={stagger} className="mt-6 space-y-3">
                {["Daily, weekly & monthly reports", "Best-seller identification", "Revenue forecasting", "Exportable data"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-coffee-700">
                    <Check size={16} className="text-coffee-700 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 w-full"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-coffee-200/60 overflow-hidden p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm font-semibold text-coffee-900">Best Selling Products</p>
                  <span className="text-xs text-coffee-400">This month</span>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Caramel Latte", percent: 100, amount: "$4,280" },
                    { name: "Espresso", percent: 78, amount: "$3,340" },
                    { name: "Cappuccino", percent: 62, amount: "$2,650" },
                    { name: "Matcha Latte", percent: 45, amount: "$1,920" },
                    { name: "Cheesecake", percent: 30, amount: "$1,280" },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-coffee-900 font-medium">{item.name}</span>
                        <span className="text-coffee-500">{item.amount}</span>
                      </div>
                      <div className="h-2 bg-coffee-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${item.percent}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-coffee-700 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── AI Marketing ───── */}
      <section className="py-24 md:py-32 bg-[#3E2A1C] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-800/50 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coffee-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex-1 max-w-lg">
              <motion.span variants={fadeUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 mb-4">
                <Bot size={12} className="mr-1" /> AI Marketing
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Marketing powered by AI
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-lg text-white/60 leading-relaxed">
                Generate Instagram captions, promotional content, and business insights with one click. No marketing experience needed.
              </motion.p>
              <motion.ul variants={stagger} className="mt-6 space-y-3">
                {["AI-generated Instagram captions", "Promotional content creation", "Business insights & recommendations", "Multi-language support"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-white/70">
                    <Check size={16} className="text-coffee-300 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="mt-8">
                <Link to="/register" className="inline-flex items-center gap-2 bg-white text-coffee-900 px-6 py-3 rounded-xl font-semibold hover:bg-coffee-100 transition-colors">
                  Try AI Features <ChevronRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-coffee-600 flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AI Assistant</p>
                    <p className="text-[10px] text-white/40">OpenAI powered</p>
                  </div>
                  <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/20">Active</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 mb-3">
                  <p className="text-sm text-white/60">Generate a weekend promo caption for our new Caramel Latte with buy-1-get-1 offer.</p>
                </div>
                <div className="bg-coffee-700/30 rounded-xl p-4 border border-coffee-600/30">
                  <p className="text-sm text-white/90 leading-relaxed">
                    ☕️ <strong className="text-white">Weekend Bliss</strong> — This Saturday & Sunday, grab a friend and enjoy our <strong className="text-white">Caramel Latte</strong> on a Buy 1 Get 1 Free deal! 🎉<br /><br />
                    Made with rich espresso, steamed milk, and house-made caramel syrup — the perfect weekend treat. See you at CoffeeFlow! ✨<br /><br />
                    #CoffeeFlow #WeekendVibes #CaramelLatte #CoffeeLovers #BOGO
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex -space-x-1">
                    {["SC", "MJ", "ER"].map((a) => (
                      <div key={a} className="w-6 h-6 rounded-full bg-coffee-600 border-2 border-coffee-800 flex items-center justify-center text-[8px] font-bold text-white">{a}</div>
                    ))}
                  </div>
                  <span className="text-xs text-white/40">Loved by marketers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section id="testimonials" className="py-24 md:py-32 bg-white border-y border-coffee-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coffee-700/10 text-coffee-700 border border-coffee-700/20 mb-4">
              <Quote size={12} className="mr-1" /> Testimonials
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Loved by coffee shops
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}
                className="bg-coffee-50 rounded-2xl p-6 border border-coffee-100 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-coffee-700 text-coffee-700" />
                  ))}
                </div>
                <p className="text-sm text-coffee-700 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-coffee-700 flex items-center justify-center text-xs font-bold text-white">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-coffee-900">{t.name}</p>
                    <p className="text-xs text-coffee-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── Pricing ───── */}
      <section id="pricing" className="py-24 md:py-32 bg-[#FDFBF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.span variants={fadeUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-coffee-700/10 text-coffee-700 border border-coffee-700/20 mb-4">
              Pricing
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Simple, transparent pricing
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-coffee-500 max-w-xl mx-auto">
              Start free. Upgrade as you grow. No hidden fees.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name} variants={fadeUp}
                className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-300 ${
                  plan.popular
                    ? "bg-coffee-700 text-white border-coffee-700 shadow-xl scale-[1.02] md:scale-105"
                    : "bg-white text-coffee-900 border-coffee-100 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-coffee-900 text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className={`text-sm mt-1 mb-4 ${plan.popular ? 'text-white/60' : 'text-coffee-400'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">${plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/40' : 'text-coffee-400'}`}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <Check size={14} className={plan.popular ? 'text-coffee-300' : 'text-coffee-700'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-white text-coffee-900 hover:bg-coffee-100"
                      : "bg-coffee-100 text-coffee-700 hover:bg-coffee-200"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-24 md:py-32 bg-coffee-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-800 to-coffee-700 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coffee-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Ready to transform your coffee shop?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-white/60 max-w-lg mx-auto">
              Join thousands of coffee shops using CoffeeFlow to manage, grow, and delight their customers.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="bg-white text-coffee-900 px-8 py-3.5 rounded-xl font-semibold hover:bg-coffee-100 transition-all shadow-lg inline-flex items-center justify-center gap-2 text-base">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <a href="#features" className="border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-base">
                Learn More
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-6 text-sm text-white/40">
              No credit card required. Free updates. AI features included.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="bg-coffee-900 text-white/60 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-coffee-700 flex items-center justify-center text-white text-xs font-bold">CF</div>
                <span className="font-bold text-lg text-white">CoffeeFlow</span>
              </div>
              <p className="text-sm leading-relaxed">AI-Powered coffee shop management platform.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Documentation"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Support", links: ["Help Center", "Contact", "Status", "Security"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} CoffeeFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
