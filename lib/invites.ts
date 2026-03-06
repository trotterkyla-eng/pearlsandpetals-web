import { supabase } from "./supabaseClient";

export type InviteStatus = "ok" | "used" | "missing" | "error";

export async function getInviteStatus(token: string): Promise<InviteStatus> {
  try {
    const { data, error } = await supabase
      .from("invites")
      .select("id, status")
      .eq("token", token)
      .maybeSingle();

    if (error) return "error";
    if (!data) return "missing";

    if (data.status === "used") return "used";
    if (data.status !== "unused") return "missing";

    return "ok";
  } catch {
    return "error";
  }
}

export async function markInviteUsed(token: string) {
  return supabase
    .from("invites")
    .update({ status: "used" })
    .eq("token", token)
    .eq("status", "unused");
}
