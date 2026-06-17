import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight"
        >
          <span className="grid size-7 place-items-center border border-border font-mono text-xs">
            Logo
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <ul className="flex items-center gap-1">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
