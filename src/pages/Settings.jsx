import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Store, User, Bell, Palette } from "lucide-react";
import toast from "react-hot-toast";
import Card, { CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Settings() {
  const [general, setGeneral] = useState({ shopName: "CoffeeFlow", address: "Jl. Kopi Nikmat No. 1", phone: "0812-3456-7890" });
  const [profile, setProfile] = useState({ fullName: "John Doe", email: "john@coffeeflow.com" });

  const handleSave = (section) => {
    toast.success(`${section} settings saved!`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-coffee-900">Settings</h1>
        <p className="text-sm text-coffee-400 mt-0.5">Manage your coffee shop preferences</p>
      </div>

      <Card>
        <CardHeader title="General" subtitle="Shop information" icon={Store} />
        <div className="space-y-4">
          <Input label="Shop Name" value={general.shopName} onChange={(e) => setGeneral({ ...general, shopName: e.target.value })} icon={Store} />
          <Input label="Address" value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
          <Input label="Phone" value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} />
          <Button icon={Save} onClick={() => handleSave("General")}>Save Changes</Button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Profile" subtitle="Your account details" icon={User} />
        <div className="space-y-4">
          <Input label="Full Name" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} icon={User} />
          <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <Button icon={Save} onClick={() => handleSave("Profile")}>Save Changes</Button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Notifications" subtitle="Configure alerts" icon={Bell} />
        <div className="space-y-3">
          {["Low stock alerts", "Daily sales report", "New customer signups"].map((item) => (
            <label key={item} className="flex items-center gap-3 p-3 bg-coffee-50 rounded-xl cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-coffee-300 text-coffee-700 focus:ring-coffee-500" />
              <span className="text-sm text-coffee-800">{item}</span>
            </label>
          ))}
          <Button icon={Save} onClick={() => handleSave("Notification")}>Save Changes</Button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Appearance" subtitle="Customize your dashboard" icon={Palette} />
        <div className="space-y-3">
          <div className="flex gap-3">
            {["Coffee", "Matcha", "Latte"].map((theme) => (
              <button key={theme} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-coffee-200 hover:border-coffee-500 text-sm text-coffee-700">
                <div className={`w-4 h-4 rounded-full ${theme === "Coffee" ? "bg-coffee-700" : theme === "Matcha" ? "bg-green-700" : "bg-yellow-700"}`} />
                {theme}
              </button>
            ))}
          </div>
          <Button icon={Save} onClick={() => handleSave("Appearance")}>Save Changes</Button>
        </div>
      </Card>
    </motion.div>
  );
}
