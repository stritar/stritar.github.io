import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { JsonLd } from "@/components/seo/json-ld";
import {
  formatDate,
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/projects";
import { creativeWorkJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Only the slugs produced here are emitted (required by output: export).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: project.canonicalUrl ?? project.url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: project.url,
      publishedTime: project.publishedDate,
      modifiedTime: project.updatedDate ?? project.publishedDate,
      authors: [site.name],
      tags: project.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-fg/55">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-fg">{value}</dd>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.draft) notFound();

  return (
    <>
      <JsonLd data={creativeWorkJsonLd(project)} />

      <article className="grid-page py-16 sm:py-24">
        <header className="col-span-full mx-auto w-full max-w-3xl">
          <Link
            href="/#work"
            className="text-xs font-medium uppercase tracking-[0.2em] text-fg/60 transition-colors hover:text-fg"
          >
            ← Work
          </Link>

          <h1 className="mt-8 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-fg/75">{project.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8 text-sm sm:grid-cols-4">
            {project.role ? <MetaItem label="Role" value={project.role} /> : null}
            {project.client ? (
              <MetaItem label="Client" value={project.client} />
            ) : null}
            <MetaItem label="Year" value={String(project.year)} />
            <MetaItem label="Published" value={formatDate(project.publishedDate)} />
          </dl>
        </header>

        <div className="col-span-full mx-auto mt-14 w-full max-w-2xl">
          <MDXContent code={project.mdx} components={mdxComponents} />
        </div>
      </article>
    </>
  );
}
