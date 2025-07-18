import Image from "next/image";

export default function BioSection() {
  return (
    <section id="bio" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl transform md:hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/misimagenes/WhatsApp Image 2025-07-17 at 10.07.08 PM.jpeg"
              alt="Retrato personal de Heidy Bega"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-headline text-primary mb-6">
              Mi Historia
            </h2>
            <div className="space-y-6 text-lg text-foreground/80">
              <p>
                <strong>Heidy Valeria Becerra Galvis</strong>, artísticamente conocida como "Heidy Bega", nació el 25 de diciembre de 2010 en Cúcuta, Norte de Santander. Desde muy temprana edad, Heidy mostró una inclinación natural por las artes y el deporte, destacándose en la música, el dibujo, el baile y las actividades físicas.
              </p>
              <p>
                A los 5 años, se integró a la cívica infantil, donde fue condecorada por su compromiso y pasión por la música. A esa misma edad, su talento ya destacaba en las presentaciones culturales de su colegio.
              </p>
              <p>
                A sus 8 años, participó en el prestigioso Festival de la Canción del centro comercial Alejandría. Su destacada actuación le valió una beca y la oportunidad de formar parte de un musical navideño, con el cual realizó una gira por diferentes localidades de Cúcuta y municipios del departamento Norte de Santander.
              </p>
              <p>
                Su prometedora carrera artística tomó una pausa debido a la COVID-19. Sin embargo, a los 12 años, Heidy retomó su pasión por la música y el deporte, el taekwondo, disciplina en la que compitió y fue galardonada en diversas batallas.
              </p>
              <p>
                A los 13 años, audicionó exitosamente para <strong>La Voz Kids Colombia</strong>, consolidando su participación en el reconocido programa. Desde entonces, su visibilidad ha crecido a nivel nacional, llevándola a participar activamente en numerosos eventos a nivel departamental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
