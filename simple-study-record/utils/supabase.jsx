import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const selectAll = async () => {
  const { data, error } = await supabase.from("study-record").select("*");
  console.log("Supabase data:", data);
  console.log("Supabase error:", error);
  if (error) {
    console.error("データ取得エラー:", error);
    return null;
  }
  return data;
};
