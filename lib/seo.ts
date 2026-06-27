import type { Metadata } from "next";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Base metadata applied site-wide via the root layout. Pages extend this with
 * `generateMetadata` (e.g. project case studies). `metadataBase` lets relative
 * OG/canonical URLs resolve against the production domain.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/** Person JSON-LD for the home page. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: site.socials.map((s) => s.href),
  };
}

/** CreativeWork JSON-LD for a case-study page. */
export function creativeWorkJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}${project.url}`,
    datePublished: project.publishedDate,
    dateModified: project.updatedDate ?? project.publishedDate,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: project.tags?.join(", "),
  };
}
