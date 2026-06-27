import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid-page min-h-[70vh] content-center py-24">
      <div className="col-span-full max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg/60">
          404
        </p>
        <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          This page drifted off.
        </h1>
        <p className="mt-4 text-fg/75">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-8">
          <Button asChild variant="glass">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
