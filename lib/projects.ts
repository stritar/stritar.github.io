import { allProjects, type Project } from "content-collections";

export type { Project };

/** Newest-first list of non-draft projects (sorted by updated, then published). */
export function getPublishedProjects(): Project[] {
  return [...allProjects]
    .filter((project) => !project.draft)
    .sort((a, b) => {
      const aDate = a.updatedDate ?? a.publishedDate;
      const bDate = b.updatedDate ?? b.publishedDate;
      return bDate.localeCompare(aDate);
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

/** Slugs for `generateStaticParams` — published projects only. */
export function getProjectSlugs(): string[] {
  return getPublishedProjects().map((project) => project.slug);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
