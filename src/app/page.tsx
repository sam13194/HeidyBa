import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero-section";
import MusicSection from "@/components/sections/music-section";
import BioSection from "@/components/sections/bio-section";
import GallerySection from "@/components/sections/gallery-section";
import ConcertsSection from "@/components/sections/concerts-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/layout/footer";
import SocialIcons from "@/components/layout/social-icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MusicSection />
        <BioSection />
        <GallerySection />
        <ConcertsSection />
        <ContactSection />
      </main>
      <SocialIcons />
      <Footer />
    </div>
  );
}
