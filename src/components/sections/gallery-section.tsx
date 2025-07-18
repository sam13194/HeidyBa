import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const photos = [
  { src: "https://placehold.co/600x800", alt: "Heidy Vega en concierto", hint: "singer concert", className: "row-span-2" },
  { src: "https://placehold.co/600x400", alt: "Heidy Vega en sesión de fotos", hint: "singer photoshoot" },
  { src: "https://placehold.co/600x400", alt: "Detalle de micrófono", hint: "microphone stage" },
  { src: "https://placehold.co/600x800", alt: "Heidy Vega sonriendo", hint: "singer smiling", className: "row-span-2" },
  { src: "https://placehold.co/600x400", alt: "Público en un concierto", hint: "concert crowd" },
  { src: "https://placehold.co/600x400", alt: "Heidy Vega en backstage", hint: "singer backstage" },
];

const videos = [
  { id: "dQw4w9WgXcQ", title: "Videoclip Oficial" },
  { id: "3tmd-ClpJxA", title: "Presentación en Vivo" },
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
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={photo.hint}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>
            ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-xl border-none rounded-lg">
              <CardContent className="p-0 aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
