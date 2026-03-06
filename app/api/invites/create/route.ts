import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function makeToken() {
  const flower = ["rose", "peony", "orchid", "lily", "iris"];
  const word = flower[Math.floor(Math.random() * flower.length)];
  const tail = Math.random().toString(36).slice(2, 7);
  return `${word}-${tail}`;
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const token = makeToken();

    const { error } = await supabase.from("invites").insert({
      token,
      code: token,
      name: name || null,
      status: "pending",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://pearlsandpetals-web.vercel.app";

    return NextResponse.json({
      token,
      link: `${baseUrl}/i/${token}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create invite" },
      { status: 500 }
    );
  }
}
