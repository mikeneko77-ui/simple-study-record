import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const insertRecord = async (title, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert([{ title: title, time: parseInt(time, 10) }])
    .select();

  if (error) {
    console.error("データ追加エラー:", error.message, error);
    return null;
  }
  return data;
};

export const deleteRecord = async (id) => {
  const { error } = await supabase
    .from("study-record")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("データ削除エラー:", error.message, error);
    return false;
  }
  return true;
};

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
