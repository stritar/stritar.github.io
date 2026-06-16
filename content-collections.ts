import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  // Standard Schema (Zod v4) — content-collections validates each file's
  // frontmatter against this and generates types from it.
  schema: z.object({
    title: z.string().max(100),
    summary: z.string().max(160),
    role: z.string().optional(),
    client: z.string().optional(),
    year: z.number().int(),
    // ISO date strings (YYYY-MM-DD) — kept as strings so the generated JSON
    // stays serializable; formatted/sorted in lib/projects.ts.
    publishedDate: z.string(),
    updatedDate: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Optional hex accent used to theme the case-study hero. */
    accent: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    // Raw MDX body — populated by content-collections, declared explicitly.
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, { theme: "github-dark-default", keepBackground: false }],
      ],
    });
    const slug = doc._meta.path;
    return {
      ...doc,
      slug,
      url: `/work/${slug}`,
      mdx,
    };
  },
});

export default defineConfig({
  content: [projects],
});
