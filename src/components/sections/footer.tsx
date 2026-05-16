const COLS = [
  {
    title: "Viftk",
    items: ["A software studio building products for ambitious teams worldwide."],
    isBrand: true,
  },
  {
    title: "Services",
    items: ["Custom Software", "Mobile Apps", "AI Integration", "Cloud & DevOps"],
  },
  {
    title: "Company",
    items: ["About", "Work", "Process", "Careers"],
  },
  {
    title: "Contact",
    items: ["hello@viftk.co", "+1 (415) 555-0140", "San Francisco, CA"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                {c.title}
                {c.isBrand && <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.items.map((it) => (
                  <li key={it}>
                    {c.isBrand ? it : <a href="#" className="hover:text-foreground">{it}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Viftk Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">LinkedIn</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">X</a>
          </div>
          <p className="font-mono tracking-[0.15em] uppercase">Made in San Francisco</p>
        </div>
      </div>
      <div className="mt-16 w-full overflow-hidden">
        <h2
          aria-hidden="true"
          className="select-none text-center font-semibold leading-[0.85] tracking-tighter text-foreground"
          style={{ fontSize: "clamp(80px, 22vw, 360px)" }}
        >
          VIFTK
        </h2>
      </div>
    </footer>
  );
}
