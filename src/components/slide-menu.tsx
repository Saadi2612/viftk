import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useMenu } from "./menu-context";

const LINKS = [
  { num: "01", label: "Services", href: "#services" },
  { num: "02", label: "Work", href: "#work" },
  { num: "03", label: "Process", href: "#process" },
  { num: "04", label: "About", href: "#about" },
  { num: "05", label: "Contact", href: "#contact" },
];

const EASE = [0.32, 0.72, 0, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2, ease: "easeOut" as const } },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.25, staggerChildren: 0.06 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

export function SlideMenu() {
  const { open, setOpen } = useMenu();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
            onClick={() => setOpen(false)}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-border bg-background md:w-[360px]"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.4, ease: EASE } }}
            exit={{ x: "100%", transition: { duration: 0.3, ease: EASE, delay: 0.15 } }}
            style={{ padding: "48px 40px 32px" }}
          >
            <div className="mb-12 flex items-center justify-between">
              <a
                href="#top"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 font-semibold tracking-tight"
              >
                Viftk
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent"
              >
                <X size={16} />
              </button>
            </div>

            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-1 flex-col"
            >
              <motion.p variants={itemVariants} className="eyebrow mb-8">
                // Menu
              </motion.p>

              <nav className="flex flex-col gap-6">
                {LINKS.map((link) => (
                  <motion.a
                    key={link.num}
                    variants={itemVariants}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{link.num}</span>
                    <span className="text-[28px] font-medium leading-none tracking-tight transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary md:text-[32px]">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                variants={itemVariants}
                className="mt-auto border-t border-border pt-8"
              >
                <p className="eyebrow mb-3">Get in touch</p>
                <a
                  href="mailto:hello@viftk.co"
                  className="text-base font-medium hover:text-primary"
                >
                  hello@viftk.co
                </a>
                <div className="mt-5 flex gap-3 text-muted-foreground">
                  <a href="#" aria-label="LinkedIn" className="hover:text-primary">LinkedIn</a>
                  <span>·</span>
                  <a href="#" aria-label="GitHub" className="hover:text-primary">GitHub</a>
                  <span>·</span>
                  <a href="#" aria-label="X" className="hover:text-primary">X</a>
                </div>
              </motion.div>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
