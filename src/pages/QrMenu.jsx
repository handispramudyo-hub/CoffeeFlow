import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Coffee, Search } from "lucide-react";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";

const categories = ["All", "Coffee", "Non-Coffee", "Snack", "Dessert"];

export default function QrMenu() {
  const [menus, setMenus] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.from("menus").select("*").eq("is_active", true).order("category").then(({ data }) => {
      if (data) setMenus(data);
    });
  }, []);

  const filtered = menus.filter((m) => {
    const matchCat = category === "All" || m.category === category;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-coffee-50">
      {/* Header */}
      <div className="bg-coffee-700 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Coffee size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">CoffeeFlow</h1>
          <p className="text-coffee-100 text-sm mt-1">Scan & Order — Our Menu</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Search & Filter */}
        <div className="space-y-3">
          <Input placeholder="Search menu..." icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${category === cat ? "bg-coffee-700 text-white" : "bg-white text-coffee-500 border border-coffee-200 hover:border-coffee-400"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((menu, i) => (
            <motion.div
              key={menu.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-2xl shadow-card border border-coffee-100 p-5 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-coffee-900">{menu.name}</h3>
                  <p className="text-xs text-coffee-400 mt-0.5">{menu.category}</p>
                </div>
                <Badge variant={menu.is_active ? "success" : "default"}>
                  {menu.is_active ? "Available" : "Sold Out"}
                </Badge>
              </div>
              {menu.description && (
                <p className="text-sm text-coffee-500 mt-2">{menu.description}</p>
              )}
              <p className="text-lg font-bold text-coffee-700 mt-3">
                Rp {menu.price.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-coffee-400">
            <Coffee size={32} className="mx-auto mb-2" />
            <p>No menu items found</p>
          </div>
        )}
      </div>
    </div>
  );
}
