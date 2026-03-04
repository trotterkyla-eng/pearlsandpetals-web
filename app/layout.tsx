import "./globals.css";
import PWARegister from "./PWARegister";

export const metadata = {
  title: "Pearls & Petals",
  description: "A private sanctuary where women flourish together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#F4DDE6" />

        {/* iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pearls & Petals" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Optional: prettier iOS splash background */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>

      <body className="bg-pearl-50 text-ink">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
