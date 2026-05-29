import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCoffee,
  FiShoppingCart,
  FiPackage,
  FiCpu,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { to: "/", icon: FiHome, label: "Dashboard" },
  { to: "/menu", icon: FiCoffee, label: "Menu" },
  { to: "/pos", icon: FiShoppingCart, label: "POS" },
  { to: "/inventory", icon: FiPackage, label: "Inventory" },
  { to: "/ai", icon: FiCpu, label: "AI Assistant" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-bux-50 overflow-hidden">
      {/* Sidebar Desktop (Hijau Tua) */}
      <aside className="hidden md:flex md:flex-shrink-0 w-64 bg-bux-700 text-white flex-col">
        <div className="p-6 border-b border-bux-800">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🌿 CoffeFlow
          </h1>
          <p className="text-xs text-bux-100 mt-1 tracking-widest uppercase">
            Manage. Analyze. Grow.
          </p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${isActive ? "bg-bux-500 text-white shadow-lg" : "hover:bg-bux-800 text-bux-100"}`
              }
            >
              <item.icon /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-bux-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-full hover:bg-bux-800 transition-colors text-bux-100"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-bux-700 text-white shadow-md">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={24} />
          </button>
          <h1 className="font-bold text-lg">🌿 CoffeFlow</h1>
          <div className="w-6"></div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-bux-50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-bux-700 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-bux-800">
              <h1 className="text-2xl font-bold">🌿 CoffeFlow</h1>
              <p className="text-xs text-bux-100 mt-1 tracking-widest uppercase">
                Manage. Analyze. Grow.
              </p>
            </div>
            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-bux-800"
                >
                  <item.icon /> {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-bux-800">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-full hover:bg-bux-800 transition-colors"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
