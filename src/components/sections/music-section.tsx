import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { VideoPlayer } from "@/components/ui/video-player";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const videos = [
  { 
    title: "Llorona audición LA VOZ KIDS 2023", 
    videoId: "5goSSeddqiQ",
    thumbnail: `https://img.youtube.com/vi/5goSSeddqiQ/hqdefault.jpg`
  },
  { 
    title: "Mala mujer (cover)", 
    videoId: "rq46DpgWFR0",
    thumbnail: `https://img.youtube.com/vi/rq46DpgWFR0/hqdefault.jpg`
  },
];

export default function MusicSection() {
  return (
    <section id="music" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up">
          <h2 className="text-5xl md:text-6xl font-headline text-center mb-12 text-primary">
            Mi Música
          </h2>
        </ScrollAnimation>
        
        {/* Videos de YouTube */}
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-3xl font-serif text-center mb-8 text-foreground">
              Videos Musicales
            </h3>
            <VideoPlayer videos={videos} />
          
          {/* Botón suscribirse al canal */}
          <div className="text-center mt-8">
            <Link 
              href="https://www.youtube.com/@heidy_becerra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Suscríbete a mi Canal
            </Link>
          </div>
          </div>
        </ScrollAnimation>


      </div>
    </section>
  );
}
