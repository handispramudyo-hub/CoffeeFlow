import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Users, Plus, Phone, Mail, Clock } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const fetchCustomers = async () => {
    const { data } = await supabase.from("customers").select("*, customer_points(*)").order("name");
    if (data) setCustomers(data);
  };

  const fetchTransactions = async (id) => {
    const { data } = await supabase.from("customer_transactions").select("*").eq("customer_id", id).order("created_at", { ascending: false });
    if (data) setTransactions(data);
  };

  useEffect(() => { (async () => { await fetchCustomers(); })(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error("Name is required");
    const { error } = await supabase.from("customers").insert([form]);
    if (error) return toast.error(error.message);
    toast.success("Customer added!");
    setModalOpen(false);
    setForm({ name: "", phone: "", email: "" });
    fetchCustomers();
  };

  const viewDetail = async (c) => {
    setSelected(c);
    await fetchTransactions(c.id);
    setDetailOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-coffee-900">Customers</h1>
          <p className="text-sm text-coffee-400 mt-0.5">Manage your customer base</p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>Add Customer</Button>
      </div>

      {customers.length === 0 ? (
        <EmptyState icon={Users} title="No customers yet" description="Add your first customer" action={<Button onClick={() => setModalOpen(true)}>Add Customer</Button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((c) => {
            const points = c.customer_points?.[0]?.points ?? 0;
            return (
              <Card key={c.id} hover onClick={() => viewDetail(c)}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coffee-700 flex items-center justify-center text-white font-bold text-sm">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-coffee-900">{c.name}</h3>
                    <div className="flex flex-col gap-0.5 mt-1">
                      {c.phone && <span className="text-xs text-coffee-400 flex items-center gap-1"><Phone size={10} /> {c.phone}</span>}
                      {c.email && <span className="text-xs text-coffee-400 flex items-center gap-1"><Mail size={10} /> {c.email}</span>}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-coffee-100 flex justify-between items-center">
                  <span className="text-xs text-coffee-400"><Clock size={10} className="inline" /> {c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}</span>
                  <Badge>{points} pts</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Customer">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Modal>

      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title={selected?.name} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-coffee-50 rounded-xl p-3 text-center">
                <p className="text-xs text-coffee-400">Points</p>
                <p className="text-xl font-bold text-coffee-900">{selected.customer_points?.[0]?.points ?? 0}</p>
              </div>
              <div className="bg-coffee-50 rounded-xl p-3 text-center">
                <p className="text-xs text-coffee-400">Transactions</p>
                <p className="text-xl font-bold text-coffee-900">{transactions.length}</p>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-coffee-700">Transaction History</h4>
            {transactions.length === 0 ? (
              <p className="text-sm text-coffee-400">No transactions yet.</p>
            ) : (
              <div className="space-y-2">
                {transactions.map((t) => (
                  <div key={t.id} className="flex justify-between p-3 bg-coffee-50 rounded-xl text-sm">
                    <span className="text-coffee-600">Rp {t.amount.toLocaleString()}</span>
                    <span className="text-coffee-400">{new Date(t.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
