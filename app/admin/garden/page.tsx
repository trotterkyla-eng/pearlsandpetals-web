async function createInvite() {
  setLoading(true);
  setError("");
  setLink("");

  try {
    const res = await fetch("/api/invites/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const text = await res.text();

    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      throw new Error(data.error || data.message || data.raw || "Failed to create invite");
    }

    setLink(data.link);
    setName("");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong");
  } finally {
    setLoading(false);
  }
}
