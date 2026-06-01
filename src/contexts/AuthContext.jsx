import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const ROLES = { owner: "owner", manager: "manager", cashier: "cashier" };

const ROLE_PERMISSIONS = {
  [ROLES.owner]: ["dashboard", "menu", "pos", "inventory", "reports", "customers", "loyalty", "ai", "settings"],
  [ROLES.manager]: ["dashboard", "menu", "inventory", "reports"],
  [ROLES.cashier]: ["pos"],
};

export { ROLES, ROLE_PERMISSIONS };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId, userEmail) => {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
    if (data) { setProfile(data); return; }
    if (error && error.code !== 'PGRST116') {
      console.error("fetchProfile error:", error.message);
      return;
    }
    // No row found — auto-create owner profile so login works
    const { data: created } = await supabase
      .from("users")
      .insert([{ id: userId, email: userEmail || "", full_name: "Owner", role: "owner" }])
      .select()
      .single();
    if (created) setProfile(created);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id, u.email);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id, u.email);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, fullName, role = "cashier") => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert([{ id: data.user.id, email, full_name: fullName, role }]);
      if (insertError) throw insertError;
      await fetchProfile(data.user.id, email);
    }
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) await fetchProfile(data.user.id, email);
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const hasPermission = (feature) => {
    if (!profile) return false;
    return ROLE_PERMISSIONS[profile.role]?.includes(feature) ?? false;
  };

  const isRole = (role) => profile?.role === role;

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, hasPermission, isRole }}>
      {children}
    </AuthContext.Provider>
  );
};
