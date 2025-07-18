"use client";

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
import { SimpleFloatingPlayer } from "@/components/ui/simple-floating-player";
import { useState } from "react";

export default function Home() {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <ThemeToggle />
      <Header />
      <main>
        <HeroSection />
        <MusicSection />
        <BioSection />
        <AboutSection />
        <GallerySection onModalStateChange={setIsGalleryModalOpen} />
        <ConcertsSection />
        <RepertoireSection />
        <ContactSection />
      </main>
      <SocialIcons />
      <Footer />
      <SimpleFloatingPlayer
        audioSrc="/audio/heidy-demo.mp3"
        title="Demo Vocal"
        artist="Heidy Bega"
        artwork="/images/logo-removebg-preview (1).png"
        hideWhenModalOpen={isGalleryModalOpen}
      />
    </div>
  );
}
