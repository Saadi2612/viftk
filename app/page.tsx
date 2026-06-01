import { ThemeProvider } from "@/components/theme-provider";
import { MenuProvider } from "@/components/menu-context";
import { Navbar } from "@/components/navbar";
import { SlideMenu } from "@/components/slide-menu";
import { HeroV1 } from "@/components/sections/hero-v1";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { FooterV2 } from "@/components/sections/footer-v2";

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
