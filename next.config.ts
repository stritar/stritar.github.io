import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { withContentCollections } from "@content-collections/next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Static export — the whole site is pre-rendered to ./out and served by GitHub Pages.
  output: "export",
  // GitHub Pages serves /work/slug/ -> /work/slug/index.html more reliably with trailing slashes.
  trailingSlash: true,
  images: {
    // GitHub Pages has no image-optimization server. Images are optimized at build
    // time via next-image-export-optimizer (see components/media/Image). Keep the
    // built-in optimizer disabled so `next build` doesn't expect a runtime loader.
    unoptimized: true,
  },
  // The legacy Astro site is kept for reference only; never type-check or bundle it.
  // (Also excluded in tsconfig.json.)
};

// content-collections builds the MDX content at config-evaluation time
// (bundler-agnostic — works under Turbopack), then we layer the bundle analyzer.
export default withContentCollections(withBundleAnalyzer(nextConfig));
