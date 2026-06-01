const COLS = [
  {
    title: "Viftk",
    items: ["A software studio building products for ambitious teams worldwide."],
    isBrand: true,
  },
  {
    title: "Services",
    links: [
      { label: "Custom Software", href: "#services" },
      { label: "Mobile Apps", href: "#services" },
      { label: "AI Integration", href: "#services" },
      { label: "Cloud & DevOps", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@viftk.co", href: "mailto:hello@viftk.co" },
      { label: "San Francisco, CA", href: "#" },
    ],
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
              {c.isBrand ? (
                <p className="text-sm text-muted-foreground">{c.items![0]}</p>
              ) : (
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {c.links!.map((it) => (
                    <li key={it.label}>
                      <a href={it.href} className="hover:text-foreground">
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Viftk Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="hover:text-foreground">
              X
            </a>
          </div>
          <p className="font-mono tracking-[0.15em] uppercase">Made in San Francisco</p>
        </div>
      </div>
    </footer>
  );
}
