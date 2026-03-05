import { supabase } from "./supabaseClient";

export type InviteStatus = "ok" | "expired" | "used" | "missing" | "error";

export async function getInviteStatus(token: string): Promise<InviteStatus> {
  try {
    const { data, error } = await supabase
      .from("invites")
      .select("id, expires_at, used_at")
      .eq("token", token)
      .maybeSingle();

    if (error) return "error";
    if (!data) return "missing";
    if (data.used_at) return "used";

    if (data.expires_at) {
      const exp = new Date(data.expires_at).getTime();
      if (Date.now() > exp) return "expired";
    }

    return "ok";
  } catch {
    return "error";
  }
}

export async function markInviteUsed(token: string) {
  return supabase
    .from("invites")
    .update({ used_at: new Date().toISOString() })
    .eq("token", token)
    .is("used_at", null);
}
