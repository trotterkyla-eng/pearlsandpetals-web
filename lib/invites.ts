import { createClient } from "@supabase/supabase-js";

export type InviteStatus = "ok" | "used" | "missing" | "error";

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return createClient(url, serviceRoleKey);
}

export async function getInviteStatus(token: string): Promise<InviteStatus> {
  try {
    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from("invites")
      .select("id, status")
      .eq("token", token)
      .maybeSingle();

    if (error) {
      console.error("getInviteStatus Supabase error:", error);
      return "error";
    }

    if (!data) return "missing";
    if (data.status === "used") return "used";
    if (data.status !== "unused") return "missing";

    return "ok";
  } catch (err) {
    console.error("getInviteStatus fatal error:", err);
    return "error";
  }
}

export async function markInviteUsed(token: string) {
  const supabase = getServerSupabase();

  return supabase
    .from("invites")
    .update({ status: "used" })
    .eq("token", token)
    .eq("status", "unused");
}
