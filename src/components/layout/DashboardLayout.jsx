import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard, Coffee, ShoppingCart, Package, BarChart3, Users, Gift, Bot, Settings, LogOut, Menu, X,
} from "lucide-react";

const navConfig = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", feature: "dashboard", end: true },
  { to: "/dashboard/menu", icon: Coffee, label: "Menu", feature: "menu" },
  { to: "/dashboard/pos", icon: ShoppingCart, label: "POS", feature: "pos" },
  { to: "/dashboard/inventory", icon: Package, label: "Inventory", feature: "inventory" },
  { to: "/dashboard/reports", icon: BarChart3, label: "Reports", feature: "reports" },
  { to: "/dashboard/customers", icon: Users, label: "Customers", feature: "customers" },
  { to: "/dashboard/loyalty", icon: Gift, label: "Loyalty", feature: "loyalty" },
  { to: "/dashboard/ai", icon: Bot, label: "AI Assistant", feature: "ai" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings", feature: "settings" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, signOut, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const allowedNav = navConfig.filter((n) => hasPermission(n.feature));

  return (
    <div className="flex h-screen bg-coffee-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-coffee-100 flex flex-col transition-transform duration-200 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-coffee-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-coffee-700 flex items-center justify-center text-white text-sm font-bold">CF</div>
            <div>
              <h1 className="text-base font-bold text-coffee-900">CoffeeFlow</h1>
              <p className="text-[10px] text-coffee-400 uppercase tracking-widest">Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {allowedNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-coffee-700 text-white shadow-soft" : "text-coffee-500 hover:text-coffee-900 hover:bg-coffee-100"}`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Profile & Logout */}
        <div className="p-3 border-t border-coffee-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-coffee-200 flex items-center justify-center text-xs font-bold text-coffee-700 uppercase">
              {profile?.full_name?.charAt(0) ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-coffee-900 truncate">{profile?.full_name ?? "User"}</p>
              <p className="text-[10px] text-coffee-400 capitalize">{profile?.role ?? "—"}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm text-coffee-400 hover:text-coffee-700 hover:bg-coffee-100 transition-colors mt-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-coffee-100 flex items-center justify-between px-4 md:px-6">
          <button className="md:hidden p-2 rounded-lg hover:bg-coffee-100 text-coffee-500" onClick={() => setSidebarOpen(true)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-coffee-400 hidden sm:block">
              {profile?.role && `${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}`}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
