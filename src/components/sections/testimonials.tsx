"use client";

import { motion } from "motion/react";
import { Reveal } from "../reveal";

export function Testimonials() {
  return (
    <section id="about" className="border-t border-border py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-10">// What clients say</p>
          <blockquote
            className="max-w-4xl text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            &ldquo;Viftk works like an extension of our team. They ship faster than our internal
            engineers and ask better questions than our consultants.&rdquo;
          </blockquote>
        </motion.div>
        <motion.div
          className="mt-8 text-sm"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-medium">Mara Linden</p>
          <p className="text-muted-foreground">VP Product, Northwind Logistics</p>
        </motion.div>
      </div>
    </section>
  );
}
