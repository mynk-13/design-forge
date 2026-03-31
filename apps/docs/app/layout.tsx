import type { Metadata } from "next";
import { ThemeProvider } from "../components/Providers";
import "@designforge/themes/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DesignForge",
    template: "%s | DesignForge",
  },
  description:
    "Open-source React component design system with AI-powered generation and Monaco playground.",
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
