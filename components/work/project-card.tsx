import Link from "next/link";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

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
      className={cn(
        "glass group flex h-full flex-col overflow-hidden rounded-lg",
        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-glass-hover",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt={project.coverAlt ?? ""}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="size-full"
            style={
              project.accent
                ? { background: `linear-gradient(135deg, ${project.accent}33, transparent)` }
                : undefined
            }
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-fg/55">
          <span className="font-mono">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-mono">{project.year}</span>
        </div>

        <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-fg">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg/70">
          {project.summary}
        </p>

        {project.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-hairline px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-fg/60"
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
