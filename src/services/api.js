import { supabase } from "../lib/supabase";

export const api = {
  // ── Menus ──
  menus: {
    list: () => supabase.from("menus").select("*").order("id"),
    create: (data) => supabase.from("menus").insert([data]).select().single(),
    update: (id, data) => supabase.from("menus").update(data).eq("id", id).select().single(),
    remove: (id) => supabase.from("menus").delete().eq("id", id),
  },

  // ── Orders ──
  orders: {
    list: () => supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }),
    create: (order, items) => supabase.rpc("create_order", { p_order: order, p_items: items }),
  },

  // ── Inventory ──
  inventory: {
    list: () => supabase.from("inventory").select("*").order("name"),
    update: (id, data) => supabase.from("inventory").update(data).eq("id", id).select().single(),
    history: (id) => supabase.from("stock_history").select("*").eq("inventory_id", id).order("created_at", { ascending: false }),
  },

  // ── Customers ──
  customers: {
    list: () => supabase.from("customers").select("*, customer_points(*)").order("name"),
    create: (data) => supabase.from("customers").insert([data]).select().single(),
    transactions: (id) => supabase.from("customer_transactions").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
  },

  // ── Reports ──
  reports: {
    daily: (date) => supabase.rpc("daily_report", { report_date: date }),
    weekly: (start, end) => supabase.rpc("weekly_report", { start_date: start, end_date: end }),
    monthly: (year, month) => supabase.rpc("monthly_report", { report_year: year, report_month: month }),
  },
};
