import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { MenuProvider } from "@/components/menu-context";
import { Navbar } from "@/components/navbar";
import { SlideMenu } from "@/components/slide-menu";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <Navbar />
        <SlideMenu />
        <main>
          <Hero />
          <Services />
          <Process />
          <Work />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </MenuProvider>
    </ThemeProvider>
  );
}
