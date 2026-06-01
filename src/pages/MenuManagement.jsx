import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Coffee } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input, { Select } from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import EmptyState from "../components/ui/EmptyState";

const categories = [
  { value: "Coffee", label: "Coffee" },
  { value: "Non-Coffee", label: "Non-Coffee" },
  { value: "Snack", label: "Snack" },
  { value: "Dessert", label: "Dessert" },
];

export default function MenuManagement() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Coffee", price: "", description: "", is_active: true });

  const fetchMenus = async () => {
    const { data } = await supabase.from("menus").select("*").order("id");
    if (data) setMenus(data);
  };

  useEffect(() => { (async () => { await fetchMenus(); })(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", category: "Coffee", price: "", description: "", is_active: true });
    setModalOpen(true);
  };

  const openEdit = (menu) => {
    setEditing(menu);
    setForm({ name: menu.name, category: menu.category, price: String(menu.price), description: menu.description || "", is_active: menu.is_active });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return toast.error("Name and price are required");

    const payload = { name: form.name, category: form.category, price: parseFloat(form.price), description: form.description, is_active: form.is_active };

    if (editing) {
      const { error } = await supabase.from("menus").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Menu updated!");
    } else {
      const { error } = await supabase.from("menus").insert([payload]);
      if (error) return toast.error(error.message);
      toast.success("Menu created!");
    }
    setModalOpen(false);
    fetchMenus();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    const { error } = await supabase.from("menus").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Menu deleted");
    fetchMenus();
  };

  const filtered = menus.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || m.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">Menu Management</h1>
          <p className="text-sm text-coffee-400 mt-0.5">Manage your coffee shop menu</p>
        </div>
        <Button icon={Plus} onClick={openCreate}>Add Menu</Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Input placeholder="Search menu..." icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select options={[{ value: "All", label: "All Categories" }, ...categories]} value={filterCat} onChange={(e) => setFilterCat(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Coffee} title="No menu items" description={search ? "Try a different search" : "Add your first menu item"} action={<Button onClick={openCreate}>Add Menu</Button>} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((menu) => (
              <div key={menu.id} className="bg-coffee-50 rounded-xl p-4 border border-coffee-100 hover:shadow-soft transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-coffee-900 truncate">{menu.name}</h3>
                    <p className="text-xs text-coffee-400 mt-0.5">{menu.category}</p>
                  </div>
                  <Badge variant={menu.is_active ? "success" : "default"}>{menu.is_active ? "Active" : "Inactive"}</Badge>
                </div>
                <p className="text-lg font-bold text-coffee-700 mt-2">Rp {menu.price.toLocaleString()}</p>
                {menu.description && <p className="text-xs text-coffee-400 mt-1 line-clamp-2">{menu.description}</p>}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" icon={Edit2} onClick={() => openEdit(menu)}>Edit</Button>
                  <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleDelete(menu.id)} className="text-danger hover:bg-red-50">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Menu" : "Add Menu"}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Menu Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" options={categories} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input label="Price (Rp)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </div>
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded border-coffee-300" />
            <label htmlFor="is_active" className="text-sm text-coffee-700">Active</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
