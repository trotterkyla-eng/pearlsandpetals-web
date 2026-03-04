import "./globals.css";
import type { ReactNode } from "react";
import PWARegister from "./PWARegister";

export const metadata = {
  title: "Pearls & Petals",
  description: "A private sanctuary where women flourish together.",
  manifest: "/manifest.webmanifest",
  themeColor: "#F4DDE6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pearls & Petals",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pearl-50 text-ink">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
