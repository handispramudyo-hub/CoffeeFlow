import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingCart, Coffee, CreditCard, QrCode, Banknote } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";

const payments = [
  { value: "Cash", icon: Banknote },
  { value: "QRIS", icon: QrCode },
  { value: "Transfer", icon: CreditCard },
];

export default function PosSystem() {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    supabase.from("menus").select("*").eq("is_active", true).then(({ data }) => {
      if (data) setMenus(data);
    });
  }, []);

  const addToCart = (menu) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menu_id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.menu_id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { menu_id: menu.id, name: menu.name, price: menu.price, quantity: 1 }];
    });
  };

  const updateQty = (menuId, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.menu_id === menuId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (menuId) => {
    setCart((prev) => prev.filter((item) => item.menu_id !== menuId));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");
    setCheckingOut(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{ total_price: total, payment_method: payment, notes: notes || null }])
        .select()
        .single();
      if (orderError) throw orderError;

      const items = cart.map((item) => ({
        order_id: order.id, menu_id: item.menu_id, quantity: item.quantity, price: item.price,
      }));
      const { error: itemsError } = await supabase.from("order_items").insert(items);
      if (itemsError) throw itemsError;

      toast.success("Payment successful!");
      setCart([]);
      setNotes("");
      setPayment("Cash");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Menu grid */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-bold text-coffee-900 mb-4 flex items-center gap-2">
          <Coffee size={18} /> Select Menu
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {menus.map((menu) => (
            <motion.button
              key={menu.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(menu)}
              className="bg-white rounded-xl shadow-soft border border-coffee-100 p-4 text-left hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-semibold text-coffee-900 text-sm">{menu.name}</h3>
              <p className="text-coffee-700 font-bold text-sm mt-1">Rp {menu.price.toLocaleString()}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-96 bg-white rounded-2xl shadow-card border border-coffee-100 flex flex-col">
        <div className="p-4 border-b border-coffee-100">
          <h2 className="font-bold text-coffee-900 flex items-center gap-2">
            <ShoppingCart size={16} /> Cart ({cart.length})
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.map((item) => (
            <div key={item.menu_id} className="flex items-center gap-3 bg-coffee-50 rounded-xl p-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-coffee-900 truncate">{item.name}</p>
                <p className="text-xs text-coffee-400">Rp {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => updateQty(item.menu_id, -1)} className="w-7 h-7 rounded-lg bg-white border border-coffee-200 flex items-center justify-center hover:bg-coffee-100"><Minus size={12} /></button>
                <span className="w-8 text-center text-sm font-semibold text-coffee-900">{item.quantity}</span>
                <button onClick={() => updateQty(item.menu_id, 1)} className="w-7 h-7 rounded-lg bg-white border border-coffee-200 flex items-center justify-center hover:bg-coffee-100"><Plus size={12} /></button>
              </div>
              <p className="text-sm font-bold text-coffee-700 w-20 text-right">Rp {(item.price * item.quantity).toLocaleString()}</p>
              <button onClick={() => removeFromCart(item.menu_id)} className="text-coffee-400 hover:text-danger"><Trash2 size={14} /></button>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-coffee-400">
              <ShoppingCart size={32} className="mb-2" />
              <p className="text-sm">Cart is empty</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-coffee-100 space-y-3">
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-coffee-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/30"
            placeholder="Order notes..." rows={2}
          />

          <div className="flex gap-2">
            {payments.map((p) => (
              <button
                key={p.value}
                onClick={() => setPayment(p.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-all ${payment === p.value ? "bg-coffee-700 text-white border-coffee-700" : "bg-white text-coffee-500 border-coffee-200 hover:border-coffee-400"}`}
              >
                <p.icon size={14} /> {p.value}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-coffee-500">Total</span>
            <span className="text-xl font-bold text-coffee-900">Rp {total.toLocaleString()}</span>
          </div>

          <Button onClick={handleCheckout} loading={checkingOut} className="w-full" size="lg">
            Pay Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
