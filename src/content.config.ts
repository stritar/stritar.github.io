import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().max(100).describe('Project title'),
    summary: z.string().max(160).describe('Short summary used as meta description'),
    role: z.string().optional().describe('Your role, e.g. "Product Designer"'),
    client: z.string().optional().describe('Client or company name'),
    year: z.number().int().describe('Year the project shipped'),
    publishedDate: z.coerce.date().describe('Date this case study was published'),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional().describe('Path to cover image (relative to /)'),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional().describe('Custom OG image override'),
    canonicalUrl: z.string().url().optional().describe('Canonical URL if cross-posted'),
  }),
});

export const collections = { projects };
