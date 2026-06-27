import localFont from "next/font/local";
import { Inter, Roboto_Mono } from "next/font/google";

/**
 * Campton — self-hosted display face for headings. Source files live in
 * public/fonts/campton (also rescued there for any non-Next consumer).
 * next/font/local inlines + self-hosts them at build time (no runtime fetch).
 */
export const campton = localFont({
  src: [
    {
      path: "../public/fonts/campton/Campton-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/campton/Campton-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-campton",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

/** Inter — body text. Self-hosted by next/font at build (static-export safe). */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Roboto Mono — code blocks and labels. */
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

/** All font CSS-variable classes, ready to spread onto <html>. */
export const fontVariables = `${campton.variable} ${inter.variable} ${robotoMono.variable}`;
