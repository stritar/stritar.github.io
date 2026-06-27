import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/work/project-card";
import { getPublishedProjects } from "@/lib/projects";
import { personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export default function HomePage() {
  const projects = getPublishedProjects().slice(0, 4);
  const primarySocial = site.socials[0];

  return (
    <>
      <JsonLd data={personJsonLd()} />

      {/* Hero — content sits over the interactive WebGL backdrop. */}
      <section id="about" className="grid-page min-h-[78vh] content-center py-20">
        <div className="col-span-full max-w-2xl md:col-span-8 lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg/60">
            {site.role} · {site.location}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg/80 sm:text-lg">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="glass">
              <Link href="#work">View selected work</Link>
            </Button>
            {primarySocial ? (
              <Button asChild variant="ghost">
                <Link href={primarySocial.href} target="_blank" rel="me noreferrer">
                  {primarySocial.label} ↗
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Selected work. */}
      <section id="work" className="grid-page scroll-mt-24 py-12">
        <div className="col-span-full flex items-end justify-between border-b border-hairline pb-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-fg/60">
            Selected work
          </h2>
          <span className="font-mono text-xs text-fg/50">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="col-span-full mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="glass col-span-full mt-8 rounded-lg p-10 text-center text-fg/70">
            Case studies are on the way — in the meantime, find me on{" "}
            {primarySocial ? (
              <Link
                href={primarySocial.href}
                target="_blank"
                rel="me noreferrer"
                className="underline underline-offset-4"
              >
                {primarySocial.label}
              </Link>
            ) : (
              "social"
            )}
            .
          </p>
        )}
      </section>
    </>
  );
}
