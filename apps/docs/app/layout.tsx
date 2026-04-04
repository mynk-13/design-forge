import type { Metadata } from "next";
import { ThemeProvider } from "../components/Providers";
import "@designforge/themes/styles.css";
import "./globals.css";

const siteUrl = "https://designforge-docs.vercel.app";
const siteDescription =
  "Open-source React 19 component design system with AI-powered generation and Monaco playground.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DesignForge",
    template: "%s | DesignForge",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DesignForge",
    title: "DesignForge — React Component Design System",
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DesignForge — React Component Design System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignForge — React Component Design System",
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
