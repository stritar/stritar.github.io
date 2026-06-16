import { JsonLd } from "@/components/seo/json-ld";
import { ProjectCard } from "@/components/work/project-card";
import { getPublishedProjects } from "@/lib/projects";
import { personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export default function HomePage() {
  const projects = getPublishedProjects().slice(0, 4);

  return (
    <>
      <JsonLd data={personJsonLd()} />

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 sm:pt-40">
        {/* Intro — short and centered above the work grid */}
        <section className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {site.role}
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </section>

        {/* Selected work — latest 4 projects */}
        <section id="work" className="mt-20 sm:mt-24">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Selected work
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {projects.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="mt-8 border border-dashed border-border p-10 text-center text-muted-foreground">
              No case studies yet. Add an MDX file under{" "}
              <code className="font-mono text-foreground">
                content/projects/
              </code>{" "}
              to populate this grid.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
