import Link from "next/link";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="relative z-10">
      <div className="grid-page items-center py-5">
        <div className="col-span-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-heading text-base font-bold tracking-tight text-fg"
          >
            {site.name}
          </Link>

          <nav className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 sm:flex">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm px-3 py-2 text-xs font-medium text-fg/70 transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeSwitch />
          </nav>
        </div>
      </div>
    </header>
  );
}
