import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={project.url}
      className="group flex h-full flex-col border border-border bg-card transition-colors hover:bg-foreground hover:text-background"
    >
      {/* Placeholder image rectangle (wireframe) */}
      <div className="wf-placeholder aspect-[16/9] w-full border-x-0 border-t-0">
        <span className="wf-placeholder-label">IMG 16:9</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground group-hover:text-background/70">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-background/80">
          {project.summary}
        </p>

        {project.tags?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="border border-border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider group-hover:border-background"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
