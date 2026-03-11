export const dynamic = "force-dynamic";

export default function DebugPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Debug</h1>
      <p>SUPABASE_URL: {url ?? "MISSING"}</p>
      <p>SERVICE_KEY exists: {String(hasKey)}</p>
    </div>
  );
}
