import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(url, serviceRoleKey);
}

export async function POST(req: Request) {
  try {
    const { token, email, password, fullName } = await req.json();

    const supabase = getServerSupabase();

    const { data: invite } = await supabase
      .from("invites")
      .select("*")
      .eq("token", token)
      .single();

    if (!invite || invite.status !== "unused") {
      return NextResponse.json(
        { error: "Invite is invalid or already used." },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase
      .from("invites")
      .update({ status: "used" })
      .eq("token", token);

    await supabase.from("members").insert({
      user_id: user.user?.id,
      full_name: fullName,
      email,
      invite_token: token,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to accept invite." },
      { status: 500 }
    );
  }
}
