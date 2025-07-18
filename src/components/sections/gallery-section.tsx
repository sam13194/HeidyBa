import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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


export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-headline text-center mb-12 text-primary">
          Galería
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 mb-16">
            {photos.map((photo, i) => (
                <div key={i} className={`group relative overflow-hidden rounded-lg shadow-lg ${photo.className || ''}`}>
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}
