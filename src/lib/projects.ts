import { getCollection } from 'astro:content';

export async function getPublishedProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.publishedDate;
    const dateB = b.data.updatedDate ?? b.data.publishedDate;
    return dateB.getTime() - dateA.getTime();
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
