import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Package, Plus, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import EmptyState from "../components/ui/EmptyState";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [form, setForm] = useState({ name: "", stock: "", unit: "pcs", min_stock: "" });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const { data } = await supabase.from("inventory").select("*").order("name");
    if (data) setItems(data);
  };

  const fetchHistory = async (id) => {
    const { data } = await supabase.from("stock_history").select("*").eq("inventory_id", id).order("created_at", { ascending: false });
    if (data) setHistory(data);
  };

  useEffect(() => { (async () => { await fetchItems(); })(); }, []);

  const openAdjust = (item = null) => {
    if (item) {
      setEditId(item.id);
      setForm({ name: item.name, stock: String(item.stock), unit: item.unit, min_stock: String(item.min_stock) });
    } else {
      setEditId(null);
      setForm({ name: "", stock: "", unit: "pcs", min_stock: "10" });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.stock) return toast.error("Name and stock are required");

    const payload = { name: form.name, stock: parseInt(form.stock), unit: form.unit, min_stock: parseInt(form.min_stock) };

    if (editId) {
      const { error } = await supabase.from("inventory").update(payload).eq("id", editId);
      if (error) return toast.error(error.message);
      await supabase.from("stock_history").insert([{ inventory_id: editId, change: parseInt(form.stock), type: "adjustment" }]);
      toast.success("Stock updated");
    } else {
      const { error } = await supabase.from("inventory").insert([payload]);
      if (error) return toast.error(error.message);
      toast.success("Item added");
    }
    setModalOpen(false);
    fetchItems();
  };

  const handleRestock = async (item) => {
    const newStock = item.stock + 10;
    const { error } = await supabase.from("inventory").update({ stock: newStock }).eq("id", item.id);
    if (error) return toast.error(error.message);
    await supabase.from("stock_history").insert([{ inventory_id: item.id, change: 10, type: "restock" }]);
    toast.success(`+10 ${item.unit} added`);
    fetchItems();
  };

  const showHistory = async (item) => {
    await fetchHistory(item.id);
    setHistoryOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">Inventory</h1>
          <p className="text-sm text-coffee-400 mt-0.5">Track and manage stock</p>
        </div>
        <Button icon={Plus} onClick={() => openAdjust()}>Add Item</Button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Package} title="No inventory items" description="Add your first inventory item" action={<Button onClick={() => openAdjust()}>Add Item</Button>} />
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {items.map((item) => {
              const isLow = item.stock <= item.min_stock;
              return (
                <div key={item.id} className={`bg-white rounded-2xl shadow-soft border p-4 ${isLow ? "border-red-200" : "border-coffee-100"}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-coffee-900">{item.name}</h3>
                      <p className="text-xs text-coffee-400">{item.unit}</p>
                    </div>
                    <Badge variant={isLow ? "danger" : "success"}>{isLow ? "Low Stock" : "In Stock"}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-coffee-500">Stock: <strong className="text-coffee-900">{item.stock}</strong></span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => showHistory(item)}>History</Button>
                      <Button size="sm" variant="primary" onClick={() => handleRestock(item)}>+ Restock</Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="ghost" onClick={() => openAdjust(item)}>Adjust</Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-card border border-coffee-100 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-coffee-50 border-b border-coffee-100">
                  <th className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase">Item</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase">Unit</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase">Min Stock</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-coffee-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-50">
                {items.map((item) => {
                  const isLow = item.stock <= item.min_stock;
                  return (
                    <tr key={item.id} className={`bg-white ${isLow ? "bg-red-50/50" : ""}`}>
                      <td className="px-4 py-3 text-sm font-medium text-coffee-900">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-coffee-700">{item.stock}</td>
                      <td className="px-4 py-3 text-sm text-coffee-400">{item.unit}</td>
                      <td className="px-4 py-3 text-sm text-coffee-400">{item.min_stock}</td>
                      <td className="px-4 py-3">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
                            <AlertTriangle size={10} /> Low Stock
                          </span>
                        ) : (
                          <Badge variant="success">In Stock</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => openAdjust(item)}>Adjust</Button>
                          <Button size="sm" variant="primary" onClick={() => handleRestock(item)}>+ Restock</Button>
                          <Button size="sm" variant="ghost" onClick={() => showHistory(item)}>History</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Adjust Stock" : "Add Item"}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Item Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <Input label="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="pcs, kg, ml" />
          </div>
          <Input label="Min Stock Alert" type="number" value={form.min_stock} onChange={(e) => setForm({ ...form, min_stock: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editId ? "Update" : "Add"}</Button>
          </div>
        </form>
      </Modal>

      {/* History Modal */}
      <Modal open={historyOpen} onClose={() => setHistoryOpen(false)} title="Stock History">
        {history.length === 0 ? (
          <p className="text-sm text-coffee-400 text-center py-8">No history recorded.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex justify-between items-center p-3 bg-coffee-50 rounded-xl text-sm">
                <span className="text-coffee-600 capitalize">{h.type}</span>
                <span className="font-semibold text-coffee-900">+{h.change}</span>
                <span className="text-coffee-400 text-xs">{new Date(h.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
