import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Image + optional caption for case studies. Pass a real `src` from MDX. */
function Figure({
  src,
  alt,
  caption,
  ratio = "16 / 9",
}: {
  src?: string;
  alt?: string;
  caption?: ReactNode;
  ratio?: string;
}) {
  return (
    <figure className="my-10">
      <div
        className="glass overflow-hidden rounded-lg"
        style={{ aspectRatio: ratio }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} className="size-full object-cover" />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-fg/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Two-up image grid. */
function ImageGrid({ children }: { children?: ReactNode }) {
  return <div className="my-10 grid gap-4 sm:grid-cols-2">{children}</div>;
}

const PassThrough = ({ children }: { children?: ReactNode }) => <>{children}</>;

/** Components available inside MDX case studies — typographic scale on the
 *  mood-aware design tokens, plus a Figure / ImageGrid for visuals. */
export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="mt-14 scroll-mt-28 border-b border-hairline pb-2 font-heading text-2xl font-bold tracking-tight text-fg"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="mt-10 scroll-mt-28 font-heading text-xl font-bold tracking-tight text-fg"
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      {...props}
      className="mt-8 scroll-mt-28 font-heading text-lg font-bold tracking-tight text-fg"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className="mt-5 leading-relaxed text-fg/85" />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      {...props}
      className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-fg/85"
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      {...props}
      className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-fg/85"
    />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} className="pl-1" />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="my-8 border-l-2 border-fg/40 pl-5 text-lg italic text-fg/70"
    />
  ),
  a: ({ href = "#", ...props }: ComponentProps<"a">) => (
    <Link
      href={href}
      className="font-medium text-fg underline underline-offset-4 hover:opacity-70"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-t border-hairline" />,
  strong: (props: ComponentProps<"strong">) => (
    <strong {...props} className="font-semibold text-fg" />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      {...props}
      className={cn(
        "glass rounded-sm px-1.5 py-0.5 font-mono text-[0.85em]",
        props.className,
      )}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      {...props}
      className="glass my-6 overflow-x-auto rounded-lg p-4 font-mono text-sm leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
    />
  ),
  img: (props: ComponentProps<"img">) => (
    <Figure src={props.src as string} alt={props.alt} />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-8 w-full overflow-x-auto">
      <table {...props} className="w-full border-collapse text-left text-sm" />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      {...props}
      className="border-b border-hairline px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-fg/70"
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      {...props}
      className="border-b border-hairline px-3 py-2 align-top text-fg/85"
    />
  ),
  Figure,
  ImageGrid,
  Reveal: PassThrough,
};
