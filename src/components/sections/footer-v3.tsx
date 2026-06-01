import { Linkedin, Github, ExternalLink } from "lucide-react";

export function FooterV3() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Large Brand Section */}
        <div className="border-b py-16 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-semibold tracking-tight lg:text-5xl">Viftk</span>
                <span className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <p className="mt-4 max-w-md text-lg text-muted-foreground leading-relaxed">
                A software studio building products for ambitious teams worldwide.
              </p>
            </div>
            <a
              href="mailto:hello@viftk.co"
              className="group inline-flex items-center gap-2 text-lg font-medium transition-colors hover:text-muted-foreground"
            >
              hello@viftk.co
              <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Links Section - Horizontal Layout */}
        <div className="border-b py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Services as Tags */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                What we do
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Custom Software", "Mobile Apps", "AI Integration", "Cloud & DevOps"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#services"
                      className="inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-x-12 gap-y-4 lg:justify-end">
              {[
                { label: "About", href: "#about" },
                { label: "Work", href: "#work" },
                { label: "Process", href: "#process" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-muted-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-8 py-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Copyright and Location */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
            <span>© {new Date().getFullYear()} Viftk Studio</span>
            <span className="hidden sm:inline">·</span>
            <span>San Francisco, CA</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-mono text-xs tracking-[0.15em]">MADE WITH ♥</span>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-1">
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
