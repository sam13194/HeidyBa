import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero-section";
import MusicSection from "@/components/sections/music-section";
import BioSection from "@/components/sections/bio-section";
import AboutSection from "@/components/sections/about-section";
import GallerySection from "@/components/sections/gallery-section";
import ConcertsSection from "@/components/sections/concerts-section";
import ContactSection from "@/components/sections/contact-section";
import RepertoireSection from "@/components/sections/repertoire-section";
import Footer from "@/components/layout/footer";
import SocialIcons from "@/components/layout/social-icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SnapScroll } from "@/components/ui/snap-scroll";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SnapScroll />
      <ThemeToggle />
      <Header />
      <main>
        <HeroSection />
        <MusicSection />
        <BioSection />
        <AboutSection />
        <GallerySection />
        <ConcertsSection />
        <RepertoireSection />
        <ContactSection />
      </main>
      <SocialIcons />
      <Footer />
    </div>
  );
}
