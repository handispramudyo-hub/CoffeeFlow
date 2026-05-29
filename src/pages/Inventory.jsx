import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const { data } = await supabase.from("inventory").select("*").order("name");
    if (data) setItems(data);
  };

  const handleRestock = async (id, currentStock) => {
    const newStock = currentStock + 10; // Setiap restock tambah 10
    const { error } = await supabase
      .from("inventory")
      .update({ stock: newStock })
      .eq("id", id);

    if (!error) {
      toast.success("Stok berhasil ditambahkan!");
      fetchInventory(); // Refresh data
    } else {
      toast.error("Gagal update stok");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-coffee-800 mb-6">
        Inventory Management
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-coffee-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-100 border-b border-coffee-200">
            <tr>
              <th className="p-4 text-coffee-700">Nama Bahan</th>
              <th className="p-4 text-coffee-700">Stok</th>
              <th className="p-4 text-coffee-700">Satuan</th>
              <th className="p-4 text-coffee-700">Status</th>
              <th className="p-4 text-coffee-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isLow = item.stock <= item.min_stock;
              return (
                <tr
                  key={item.id}
                  className={`border-b border-coffee-50 ${isLow ? "bg-red-50" : "hover:bg-coffee-50"}`}
                >
                  <td className="p-4 font-medium text-coffee-800">
                    {item.name}
                  </td>
                  <td className="p-4 text-coffee-700">{item.stock}</td>
                  <td className="p-4 text-coffee-500">{item.unit}</td>
                  <td className="p-4">
                    {isLow ? (
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-bold">
                        Hampir Habis
                      </span>
                    ) : (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs font-bold">
                        Aman
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRestock(item.id, item.stock)}
                      className="bg-coffee-600 text-white px-4 py-2 rounded-lg hover:bg-coffee-700 text-sm transition-colors"
                    >
                      + Restock (10)
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="p-4 text-center text-coffee-500">
            Belum ada data bahan.
          </p>
        )}
      </div>
    </div>
  );
}
