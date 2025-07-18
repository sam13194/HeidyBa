import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const singles = [
  { title: "Sencillo Uno", cover: "https://placehold.co/500x500", hint: "album cover" },
  { title: "Sencillo Dos", cover: "https://placehold.co/500x500", hint: "album cover" },
  { title: "Sencillo Tres", cover: "https://placehold.co/500x500", hint: "album cover" },
  { title: "Sencillo Cuatro", cover: "https://placehold.co/500x500", hint: "album cover" },
];

export default function MusicSection() {
  return (
    <section id="music" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-headline text-center mb-12 text-primary">
          Mi Música
        </h2>
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden shadow-xl border-none rounded-lg">
            <CardContent className="p-0">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/artist/3Sg3RAl7gR2VexiM1KSh7p?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player for Heidy Vega"
              ></iframe>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {singles.map((single, index) => (
            <Link href="#" key={index} className="group">
              <Card className="overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 transform group-hover:scale-105 shadow-lg rounded-lg">
                <CardContent className="p-0">
                  <Image
                    src={single.cover}
                    alt={single.title}
                    width={500}
                    height={500}
                    className="aspect-square object-cover"
                    data-ai-hint={single.hint}
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
