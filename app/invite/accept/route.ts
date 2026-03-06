import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return createClient(url, serviceRoleKey);
}

export async function POST(req: Request) {
  try {
    const { token, email, password, fullName } = await req.json();

    if (!token || !email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = getServerSupabase();

    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .select("id, status, token")
      .eq("token", token)
      .maybeSingle();

    if (inviteError) {
      return NextResponse.json(
        { error: inviteError.message },
        { status: 500 }
      );
    }

    if (!invite || invite.status !== "unused") {
      return NextResponse.json(
        { error: "This invitation is no longer valid." },
        { status: 400 }
      );
    }

    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          invite_token: token,
        },
      });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    const userId = authData.user?.id;

    const { error: updateError } = await supabase
      .from("invites")
      .update({
        status: "used",
      })
      .eq("token", token)
      .eq("status", "unused");

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    if (userId) {
      await supabase.from("members").insert({
        user_id: userId,
        full_name: fullName,
        email,
        invite_token: token,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to accept invite.",
      },
      { status: 500 }
    );
  }
}
