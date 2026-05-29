import { createClient } from "@supabase/supabase-js";

// PERHATIKAN: Tulisannya supabase.co (bukan supbase.co)
const supabaseUrl = "https://obkubmxglsdyfchzzzsy.supabase.co";

// GANTI TULISAN INI DENGAN PUBLISHABLE KEY KAMU
const supabaseAnonKey = "sb_publishable_nom7ZDmBUvmVjOMCRyNPxg_iOfr-DD_";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
