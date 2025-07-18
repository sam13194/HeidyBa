import Image from "next/image";

export default function BioSection() {
  return (
    <section id="bio" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl transform md:hover:scale-105 transition-transform duration-500">
            <Image
              src="https://placehold.co/800x1000"
              alt="Retrato personal de Heidy Bega"
              fill
              className="object-cover"
              data-ai-hint="singer personal"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-headline text-primary mb-6">
              Mi Historia
            </h2>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                Desde la vibrante frontera de Cúcuta, Heidy Bega le canta al amor y al desamor con la fuerza de una mujer que conoce sus raíces. Su voz, un torrente de pasión y autenticidad, narra historias que conectan con el alma del pueblo.
              </p>
              <p>
                Cada canción es un pedazo de su corazón, una melodía que nace de vivencias propias y ajenas, transformando el sentimiento popular en arte. Heidy no solo canta, cuenta las historias que todos llevamos dentro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
