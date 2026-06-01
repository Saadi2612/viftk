"use client";

import { Linkedin, Github, MapPin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FooterV2() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* CTA Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {"Let's build something great together"}
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Ready to transform your ideas into reality? Get in touch with our team.
          </p>
          <Button className="mt-8 gap-2" size="lg" asChild>
            <a href="mailto:hello@viftk.co">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 rounded-2xl border bg-card p-8 lg:grid-cols-12 lg:gap-8 lg:p-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">Viftk</span>
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
              A software studio building products for ambitious teams worldwide. We turn complex
              challenges into elegant solutions.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@viftk.co" className="hover:text-foreground">
                  hello@viftk.co
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h3 className="font-medium">Services</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Custom Software", href: "#services" },
                  { label: "Mobile Apps", href: "#services" },
                  { label: "AI Integration", href: "#services" },
                  { label: "Cloud & DevOps", href: "#services" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Company</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "About", href: "#about" },
                  { label: "Work", href: "#work" },
                  { label: "Process", href: "#process" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Connect</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Viftk Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <span className="font-mono text-xs tracking-wider">MADE IN SAN FRANCISCO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
