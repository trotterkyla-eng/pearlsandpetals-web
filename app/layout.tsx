import "./globals.css";

export const metadata = {
  title: "Pearls & Petals",
  description: "A private sanctuary where women flourish together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  <html lang="en">
  <head>
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#F4DDE6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Pearls & Petals" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>

  <body className="bg-pearl-50 text-ink">
    {children}
  </body>
</html>
  );
}
