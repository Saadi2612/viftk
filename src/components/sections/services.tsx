import { Code2, Smartphone, Sparkles, Cloud, Layers, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "../reveal";

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke web platforms and internal tools engineered to fit your operating model, not the other way around.",
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
    desc: "Resilient infrastructure on AWS, GCP, and edge runtimes, with observability built in.",
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
          <h2 className="max-w-2xl text-balance text-4xl md:text-5xl">
            A small studio with a wide surface area.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className={`group h-full rounded-xl border transition-colors duration-300 s3-card ${
                  s.featured ? "s3-featured" : "s3-regular border-border"
                } ${s.span ?? ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              >
                <motion.div
                  className="grid h-10 w-10 place-items-center rounded-md bg-accent-soft text-primary"
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon size={18} />
                </motion.div>
                <h3 className={`mt-6 ${s.featured ? "text-2xl" : "text-xl"}`}>{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
