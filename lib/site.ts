/** Single source of truth for site-wide identity, navigation, and social links. */
export const site = {
  name: "Denis Stritar",
  role: "Product Designer",
  url: "https://denisstritar.com",
  location: "Berlin, Germany",
  description:
    "Berlin-based product designer crafting intuitive, customer-facing analytics experiences that work seamlessly out of the box.",
  locale: "en_US",
  /** Contact is social-only — no inline form or mailto. */
  email: "denis.stritar@gmail.com",
  socials: [
    // TODO: confirm the exact LinkedIn handle before launch.
    { label: "LinkedIn", href: "https://www.linkedin.com/in/denisstritar/" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
