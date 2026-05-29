import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function PosSystem() {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Ambil menu yang aktif saja
    const fetchMenus = async () => {
      const { data } = await supabase
        .from("menus")
        .select("*")
        .eq("is_active", true);
      if (data) setMenus(data);
    };
    fetchMenus();
  }, []);

  // Tambah ke keranjang
  const addToCart = (menu) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menu_id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.menu_id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        { menu_id: menu.id, name: menu.name, price: menu.price, quantity: 1 },
      ];
    });
  };

  // Hitung Total Harga
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Proses Pembayaran
  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Keranjang kosong!");

    try {
      // 1. Simpan ke tabel Orders
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          { total_price: total, payment_method: "Cash", user_id: null }, // user_id sementara null
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Siapkan data order items
      const orderItems = cart.map((item) => ({
        order_id: orderData.id,
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: item.price,
      }));

      // 3. Simpan ke tabel Order Items
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
      if (itemsError) throw itemsError;

      alert("Pembayaran Berhasil!");
      setCart([]); // Kosongkan keranjang
    } catch (error) {
      alert("Gagal memproses: " + error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Daftar Menu (Kiri) */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-coffee-800">Pilih Menu</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => addToCart(menu)}
              className="bg-white p-4 rounded-lg shadow-sm border border-coffee-100 hover:shadow-md transition text-left"
            >
              <h3 className="font-semibold text-coffee-800">{menu.name}</h3>
              <p className="text-coffee-600 text-sm mt-1">
                Rp {menu.price.toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Keranjang (Kanan) */}
      <div className="w-full md:w-96 bg-white p-6 rounded-xl shadow-sm border border-coffee-100 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-coffee-800">Keranjang</h2>
        <div className="flex-1 overflow-y-auto space-y-3">
          {cart.map((item) => (
            <div
              key={item.menu_id}
              className="flex justify-between items-center border-b border-coffee-50 pb-2"
            >
              <div>
                <p className="font-medium text-coffee-800">{item.name}</p>
                <p className="text-sm text-coffee-500">
                  {item.quantity}x Rp {item.price.toLocaleString()}
                </p>
              </div>
              <p className="font-semibold text-coffee-800">
                Rp {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
          {cart.length === 0 && (
            <p className="text-coffee-400 text-center mt-10">Belum ada item</p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-coffee-200 space-y-4">
          <div className="flex justify-between text-2xl font-bold text-coffee-900">
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-coffee-600 text-white py-3 rounded-lg hover:bg-coffee-700 font-bold text-lg transition-colors"
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
