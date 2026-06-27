import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/site/footer";
import { GradientBackdrop } from "@/components/site/gradient-backdrop";
import { Header } from "@/components/site/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { HeroMount } from "@/components/webgl/hero-mount";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edeceb" },
    { media: "(prefers-color-scheme: dark)", color: "#292623" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        {/* Sets [data-theme] before paint to avoid a flash of the wrong mood. */}
        <ThemeScript />
        <ThemeProvider>
          {/* Decorative background stack (behind everything). */}
          <GradientBackdrop />
          {/* Interactive WebGL hero (fixed, pointer-transparent, z-0). */}
          <HeroMount />

          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" className="relative z-[1]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
