import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { baseMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Link text
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
