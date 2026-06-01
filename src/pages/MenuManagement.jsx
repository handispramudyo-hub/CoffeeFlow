import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MenuManagement() {
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Ambil data menu dari Supabase
  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const { data } = await supabase
      .from("menus")
      .select("*")
      .order("id", { ascending: true });
    if (data) setMenus(data);
  };

  // Fungsi Tambah Menu Baru
  const handleAddMenu = async (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Isi nama dan harga!");

    const { data, error } = await supabase
      .from("menus")
      .insert([
        {
          name: name,
          price: parseFloat(price),
          category: "Coffee",
          is_active: true,
        },
      ])
      .select();

    if (error) {
      alert("Gagal menambah menu: " + error.message);
    } else {
      setMenus([...menus, ...data]); // Update tampilan tanpa reload
      setName("");
      setPrice("");
      alert("Menu berhasil ditambahkan!");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-coffee-800 mb-6">
        Menu Management
      </h1>

      {/* Form Tambah Menu */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100 mb-8">
        <h2 className="text-xl font-bold text-coffee-700 mb-4">
          Tambah Menu Baru
        </h2>
        <form onSubmit={handleAddMenu} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-coffee-600 mb-1">Nama Menu</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500"
              placeholder="Contoh: Latte"
            />
          </div>
          <div className="w-full md:w-40">
            <label className="block text-coffee-600 mb-1">Harga (Rp)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500"
              placeholder="25000"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-coffee-600 text-white px-6 py-2 rounded-lg hover:bg-coffee-700 transition-colors font-semibold"
          >
            Tambah
          </button>
        </form>
      </div>

      {/* Daftar Menu */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100">
        <h2 className="text-xl font-bold text-coffee-700 mb-4">Daftar Menu</h2>
        <div className="space-y-3">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="flex justify-between items-center border-b border-coffee-50 pb-3"
            >
              <div>
                <h3 className="font-semibold text-coffee-800">{menu.name}</h3>
                <p className="text-sm text-coffee-500">
                  Kategori: {menu.category}
                </p>
              </div>
              <p className="font-bold text-coffee-600">
                Rp {menu.price.toLocaleString()}
              </p>
            </div>
          ))}
          {menus.length === 0 && (
            <p className="text-coffee-500">
              Belum ada menu. Tambahkan di atas!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
