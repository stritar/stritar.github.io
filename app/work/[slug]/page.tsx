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
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

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

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.draft) notFound();

  const creativeWork = {
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

  return (
    <>
      <JsonLd data={creativeWork} />

      <article className="px-6 pb-24 pt-32 sm:pt-40">
        <header className="mx-auto max-w-3xl">
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            &larr; All work
          </Link>

          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{project.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm sm:grid-cols-4">
            {project.role ? (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Role
                </dt>
                <dd className="mt-1 font-medium">{project.role}</dd>
              </div>
            ) : null}
            {project.client ? (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Client
                </dt>
                <dd className="mt-1 font-medium">{project.client}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Year
              </dt>
              <dd className="mt-1 font-medium">{project.year}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Published
              </dt>
              <dd className="mt-1 font-medium">
                {formatDate(project.publishedDate)}
              </dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto mt-14 max-w-2xl">
          <MDXContent code={project.mdx} components={mdxComponents} />
        </div>
      </article>
    </>
  );
}
