import "server-only";
import { createClient } from "@supabase/supabase-js";

export const databaseReady = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);

function getDb() {
  if (!databaseReady) throw new Error("Supabase 연결 정보를 설정하세요.");
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getOrCreateUser(userId) {
  const db = getDb();
  const { error: insertError } = await db.from("demoapp_users")
    .upsert({ id: userId }, { onConflict: "id", ignoreDuplicates: true });
  if (insertError) throw insertError;

  const { data, error } = await db.from("demoapp_users")
    .select("id, onboarding_completed").eq("id", userId).single();
  if (error) throw error;
  return data;
}

export async function markOnboardingComplete(userId) {
  const { error } = await getDb().from("demoapp_users")
    .update({ onboarding_completed: true }).eq("id", userId).select("id").single();
  if (error) throw error;
}
