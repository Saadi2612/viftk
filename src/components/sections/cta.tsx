import { Reveal } from "../reveal";

export function CTA() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="bg-[var(--color-surface-invert)] text-[var(--color-surface-invert-foreground)]">
        <div className="container-x py-32 text-center">
          <Reveal>
            <p
              className="eyebrow mb-6"
              style={{ color: "color-mix(in oklab, currentColor 60%, transparent)" }}
            >
              // Let&apos;s build
            </p>
            <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl">
              Have something ambitious in mind?
            </h2>
            <p
              className="mx-auto mt-6 max-w-xl text-base"
              style={{ color: "color-mix(in oklab, currentColor 65%, transparent)" }}
            >
              Tell us about it. We reply within one business day with thoughts, references, and
              a suggested next step.
            </p>
            <a
              href="mailto:hello@stratosphere.co"
              className="mt-10 inline-flex h-12 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
            >
              Let&apos;s talk
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
