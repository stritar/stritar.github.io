import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Label text
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-3xl font-bold tracking-tight underline underline-offset-4 hover:opacity-60 sm:text-5xl"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-5">
            {site.socials.map((social) => (
              <li key={social.href}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
