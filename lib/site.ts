/** Single source of truth for site-wide identity, navigation, and social links. */
export const site = {
  name: "Denis Stritar",
  role: "Product Designer",
  url: "https://denisstritar.com",
  description:
    "Denis Stritar is a product designer crafting interactive, end-to-end digital products — from systems thinking to pixel-level craft.",
  locale: "en_US",
  email: "hello@denisstritar.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/denisstritar/" },
    { label: "Dribbble", href: "https://dribbble.com/denisstritar" },
    { label: "GitHub", href: "https://github.com/stritar" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
