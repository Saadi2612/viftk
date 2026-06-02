import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/theme-provider";
import { MenuProvider } from "@/components/menu-context";
import { Navbar } from "@/components/navbar";
import { SlideMenu } from "@/components/slide-menu";
import { HeroV1 } from "@/components/sections/hero-v1";

// Below-the-fold sections: split into their own client chunks so initial
// hydration only carries the hero. Kept SSR (default) for SEO.
const Services = dynamic(() => import("@/components/sections/services").then((m) => m.Services));
const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process));
const Work = dynamic(() => import("@/components/sections/work").then((m) => m.Work));
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);
const CTA = dynamic(() => import("@/components/sections/cta").then((m) => m.CTA));
const FooterV2 = dynamic(() => import("@/components/sections/footer-v2").then((m) => m.FooterV2));

export default function HomePage() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <Navbar />
        <SlideMenu />
        <main>
          <HeroV1 />
          <Services />
          <Process />
          <Work />
          <Testimonials />
          <CTA />
        </main>
        <FooterV2 />
      </MenuProvider>
    </ThemeProvider>
  );
}
