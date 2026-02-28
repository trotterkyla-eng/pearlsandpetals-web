import "./globals.css";

export const metadata = {
  title: "Pearls & Petals",
  description: "A private sanctuary where women flourish together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pearl-50 text-ink">{children}</body>
    </html>
  );
}
