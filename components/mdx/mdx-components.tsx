import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Wireframe placeholder box standing in for any image while           */
/* wireframing — bordered rectangle with crosshatch fill + label.      */
/* ------------------------------------------------------------------ */
function Placeholder({
  label = "IMG",
  ratio = "16/9",
}: {
  label?: string;
  ratio?: string;
}) {
  return (
    <div className="wf-placeholder w-full" style={{ aspectRatio: ratio }}>
      <span className="wf-placeholder-label">{label}</span>
    </div>
  );
}

/** Image with caption for use inside case studies (rendered as a placeholder). */
function Figure({ alt, caption }: { alt?: string; caption?: string }) {
  return (
    <figure className="my-10">
      <Placeholder label={alt ? `IMG · ${alt}` : "IMG"} />
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* Static pass-through wrappers — the old animated building blocks still
   referenced by some MDX now render their children plainly (no motion). */
const PassThrough = ({ children }: { children?: ReactNode }) => <>{children}</>;

/**
 * Components available inside MDX case studies — a complete black & white
 * wireframe typographic scale (h1–h6, prose, code, tables, images) plus the
 * legacy building blocks kept as static pass-throughs.
 */
export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      {...props}
      className="mt-14 scroll-mt-28 text-4xl font-bold tracking-tight"
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="mt-14 scroll-mt-28 border-b border-border pb-2 text-3xl font-bold tracking-tight"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="mt-10 scroll-mt-28 text-2xl font-semibold tracking-tight"
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      {...props}
      className="mt-8 scroll-mt-28 text-xl font-semibold tracking-tight"
    />
  ),
  h5: (props: ComponentProps<"h5">) => (
    <h5
      {...props}
      className="mt-8 scroll-mt-28 text-lg font-semibold tracking-tight"
    />
  ),
  h6: (props: ComponentProps<"h6">) => (
    <h6
      {...props}
      className="mt-8 scroll-mt-28 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className="mt-5 text-base leading-relaxed sm:text-lg" />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="mt-5 list-disc space-y-2 pl-6 leading-relaxed" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      {...props}
      className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed"
    />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} className="pl-1" />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="my-8 border-l-2 border-foreground pl-5 text-lg italic text-muted-foreground"
    />
  ),
  a: ({ href = "#", ...props }: ComponentProps<"a">) => (
    <Link
      href={href}
      className="font-medium underline underline-offset-4 hover:opacity-60"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-t border-border" />,
  strong: (props: ComponentProps<"strong">) => (
    <strong {...props} className="font-semibold" />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      {...props}
      className={cn(
        "border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]",
        props.className,
      )}
    />
  ),
  // rehype-pretty-code emits a styled <pre> (Shiki). Desaturate to grayscale
  // so the block reads black & white, and frame it like the rest of the wireframe.
  pre: (props: ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto border border-border bg-muted p-4 font-mono text-sm leading-relaxed grayscale [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
    />
  ),
  img: (props: ComponentProps<"img">) => <Figure alt={props.alt} />,
  table: (props: ComponentProps<"table">) => (
    <div className="my-8 w-full overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse border border-border text-left text-sm"
      />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead {...props} className="bg-muted" />
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      {...props}
      className="border border-border px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider"
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td {...props} className="border border-border px-3 py-2 align-top" />
  ),
  Figure,
  Reveal: PassThrough,
  Marquee: PassThrough,
  SpotlightCard: PassThrough,
};
