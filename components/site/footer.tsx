import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-10 mt-24 sm:mt-32">
      <div className="grid-page py-12 sm:py-16">
        <div className="col-span-full flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fg/60">
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-4">
            {site.socials.map((social) => (
              <li key={social.href}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="text-xs font-medium text-fg/70 transition-colors hover:text-fg"
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
