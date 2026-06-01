import { Reveal } from "../reveal";

export function CTA() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="v3-surface">
        <div className="container-x cta-inner text-center">
          <Reveal>
            <p className="eyebrow mb-6">// Let&apos;s build</p>
            <h2 className="cta-heading mx-auto max-w-3xl text-balance">
              Have something <span className="v3-word">ambitious</span> in mind?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base v3-muted">
              Tell us about it. We reply within one business day with thoughts, references, and a
              suggested next step.
            </p>
            <a
              href="mailto:hello@viftk.co"
              className="cta-btn mt-10 inline-flex h-12 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground"
            >
              Let&apos;s talk
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
