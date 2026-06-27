import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getPublishedProjects().map((project) => ({
    url: `${site.url}${project.url}/`,
    lastModified: project.updatedDate ?? project.publishedDate,
  }));

  return [{ url: `${site.url}/` }, ...projects];
}
