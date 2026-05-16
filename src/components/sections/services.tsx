import {
  ArrowRight,
  Code2,
  Smartphone,
  Sparkles,
  Cloud,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "../reveal";

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke web platforms and internal tools engineered to fit your operating model — not the other way around.",
    span: "md:col-span-2",
    featured: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-feeling iOS and Android products built with React Native and Swift where it counts.",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    desc: "Embed reasoning, search, and automation into existing products with measurable outcomes.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Resilient infrastructure on AWS, GCP, and edge runtimes — observability included.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    desc: "Token-driven systems your team can extend without breaking the product.",
  },
  {
    icon: ShieldCheck,
    title: "Technical Audits",
    desc: "Independent reviews of architecture, security, and team velocity. Clear, ranked recommendations.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-border py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4">// Services</p>
          <h2 className="max-w-2xl text-4xl md:text-5xl">
            A small studio with a wide surface area.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div
                  className={`group h-full rounded-xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 ${
                    s.span ?? ""
                  }`}
                  style={{ boxShadow: "none" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "var(--shadow-hover)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-accent-soft text-primary">
                    <Icon size={18} />
                  </div>
                  <h3 className={`mt-6 ${s.featured ? "text-2xl" : "text-xl"}`}>{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
