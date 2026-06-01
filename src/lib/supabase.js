import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://obkubmxglsdyfchzzzsy.supabase.co";
const supabaseAnonKey = "sb_publishable_nom7ZDmBUvmVjOMCRyNPxg_iOfr-DD_";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
