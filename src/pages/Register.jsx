import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Coffee, Loader2 } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password, fullName);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50 px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-modal border border-coffee-100 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-coffee-700 flex items-center justify-center mx-auto mb-4">
              <Coffee size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-coffee-900">Create Account</h1>
            <p className="text-sm text-coffee-400 mt-1">Join CoffeeFlow today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-coffee-700">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-2.5 text-sm text-coffee-900 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500/30 focus:border-coffee-500 transition-all"
                placeholder="John Doe" required />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-coffee-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-2.5 text-sm text-coffee-900 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500/30 focus:border-coffee-500 transition-all"
                placeholder="you@example.com" required />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-coffee-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-2.5 text-sm text-coffee-900 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500/30 focus:border-coffee-500 transition-all"
                placeholder="Min 6 characters" minLength={6} required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-coffee-700 text-white py-2.5 rounded-xl font-semibold hover:bg-coffee-800 transition-colors shadow-soft disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-coffee-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-coffee-700 hover:text-coffee-800">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
