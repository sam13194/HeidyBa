import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

const repertoire = [
  { song: "La hija de nadie", artist: "Llorona del río" },
  { song: "El crucifijo de piedra", artist: "Miguel Aceves Mejía" },
  { song: "Me gustas mucho", artist: "Rocío Dúrcal" },
  { song: "Costumbres", artist: "Rocío Dúrcal" },
  { song: "Así fue", artist: "Isabel Pantoja" },
  { song: "O me quieres o me dejas", artist: "Maricela" },
  { song: "El cigarrillo", artist: "Paola Jara" },
  { song: "El rey", artist: "Vicente Fernández" },
  { song: "La tequilera", artist: "Ángela Aguilar (versión)" },
  { song: "Sola con mi soledad", artist: "Maricela" },
  { song: "Si se fue se fue", artist: "Maricela" },
  { song: "Malagueña", artist: "Ángela Aguilar" },
  { song: "La cigarra", artist: "Natalia Giménez" },
  { song: "Que hablen de mí", artist: "Francy" },
  { song: "El pastor", artist: "Aída Cuevas" },
  { song: "La basurita", artist: "Ángela Aguilar" },
  { song: "Cielo rojo", artist: "Ángela Aguilar" },
  { song: "Cucurrucucú", artist: "Rocío Dúrcal" },
  { song: "Deja que salga la luna", artist: "Paloma del río" },
  { song: "Como quien pierde una estrella", artist: "Alejandro Fernández" },
  { song: "Como quien pierde una estrella", artist: "Belinda (versión)" },
  { song: "Murió el amor", artist: "Paola Jara" },
  { song: "Como la flor", artist: "Selena Quintanilla" },
  { song: "Si una vez", artist: "Selena Quintanilla" },
  { song: "Mátelas", artist: "Alejandro Fernández" },
  { song: "El popurrí", artist: "Juan Gabriel" },
];

export default function RepertoireSection() {
  return (
    <section id="repertoire" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-headline text-primary mb-6">
            Mi Repertorio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una selección de las canciones que interpreto, desde clásicos de la música popular hasta versiones contemporáneas
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repertoire.map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Music className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
                        {item.song}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.artist}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Music className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-serif text-primary">
                  ¿Buscas algo específico?
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Tengo un amplio repertorio que abarca diferentes géneros y épocas. 
                Si tienes alguna canción especial en mente, no dudes en consultarme.
              </p>
              <a 
                href="https://wa.me/573213880813?text=Hola%20Heidy,%20me%20interesa%20conocer%20más%20sobre%20tu%20repertorio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Consultar Repertorio
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}