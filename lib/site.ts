/** Single source of truth for site-wide identity, navigation, and social links. */
export const site = {
  name: "Heading 1",
  role: "Label text",
  url: "https://denisstritar.com",
  description: "Body text",
  locale: "en_US",
  email: "link@example.com",
  socials: [
    { label: "Link text", href: "#" },
    { label: "Link text", href: "#" },
    { label: "Link text", href: "#" },
  ],
  nav: [
    { label: "Nav link", href: "/#work" },
    { label: "Nav link", href: "/#about" },
    { label: "Nav link", href: "/#contact" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
