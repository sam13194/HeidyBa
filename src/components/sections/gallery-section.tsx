"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ScrollAnimation, StaggerAnimation } from "@/components/ui/scroll-animation";
import { GalleryModal } from "@/components/ui/gallery-modal";
import { useState } from "react";

const photos = [
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.41 PM.jpeg", alt: "Heidy Bega en presentación", className: "row-span-2" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.42 PM.jpeg", alt: "Heidy Bega en sesión de fotos" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.45 PM.jpeg", alt: "Heidy Bega en evento" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.47 PM.jpeg", alt: "Heidy Bega sonriendo", className: "row-span-2" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.03.16 PM.jpeg", alt: "Heidy Bega en concierto" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 9.48.36 PM.jpeg", alt: "Heidy Bega profesional" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 9.49.09 PM.jpeg", alt: "Heidy Bega en evento especial" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.11.34 PM.jpeg", alt: "Heidy Bega backstage" },
];


interface GallerySectionProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

export default function GallerySection({ onModalStateChange }: GallerySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    onModalStateChange?.(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onModalStateChange?.(false);
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up">
          <h2 className="text-5xl md:text-6xl font-headline text-center mb-12 text-primary">
            Galería
          </h2>
        </ScrollAnimation>
        
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 mb-16">
          {photos.map((photo, i) => (
            <ScrollAnimation key={i} direction="up" delay={i * 0.1}>
              <div 
                className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 h-full ${photo.className || ''}`}
                onClick={() => openModal(i)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium">Ver imagen</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Gallery Modal */}
        <GalleryModal
          photos={photos}
          isOpen={isModalOpen}
          onClose={closeModal}
          initialIndex={selectedImageIndex}
        />

      </div>
    </section>
  );
}
