import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useMenu } from "./menu-context";

export function Navbar() {
  const { setOpen } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 backdrop-blur-md ${
        scrolled
          ? "border-b border-border bg-background/80"
          : "border-b border-transparent bg-background/40"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-base">Viftk</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--color-primary-hover)] active:scale-[0.98] sm:inline-flex"
          >
            Book a call
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
