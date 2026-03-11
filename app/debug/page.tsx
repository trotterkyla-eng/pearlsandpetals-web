export const dynamic = "force-dynamic";
import { createClient } from "@supabase/supabase-js";

export default async function DebugPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  let result = "not tested";
  let errorMsg = "";
  
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("invite_tokens")
      .select("slug, status")
      .limit(3);
    
    if (error) errorMsg = JSON.stringify(error);
    else result = JSON.stringify(data);
  } catch (e: any) {
    errorMsg = e.message;
  }

  return (
    <div style={{ padding: 40, fontFamily: "monospace", fontSize: 12 }}>
      <p>URL: {url}</p>
      <p>Result: {result}</p>
      <p>Error: {errorMsg || "none"}</p>
    </div>
  );
}
