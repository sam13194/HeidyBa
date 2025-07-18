import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.jpeg"
          alt="Heidy Bega en el escenario"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 px-4 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline drop-shadow-lg">
          Heidy Bega
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-body mb-8 max-w-2xl mx-auto drop-shadow-md">
          Canciones que nacen del corazón
        </p>
        <a href="https://open.spotify.com/artist/3Sg3RAl7gR2VexiM1KSh7p" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-8 px-10 rounded-full uppercase tracking-widest shadow-lg transform hover:scale-105 transition-transform duration-300">
            Escuchar ahora
          </Button>
        </a>
      </div>
    </section>
  );
}
