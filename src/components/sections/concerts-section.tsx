import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Ticket } from "lucide-react";

export default function ConcertsSection() {
  const hasDates = false; // Set to true to show a list of dates
  
  const dates = [
    { date: "30 AGO 2024", place: "Movistar Arena", city: "Bogotá, CO" },
    { date: "15 SEP 2024", place: "La Macarena", city: "Medellín, CO" },
    { date: "28 SEP 2024", place: "Plaza de Toros", city: "Cali, CO" },
  ];

  return (
    <section id="dates" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-headline text-primary mb-12">
          Conciertos
        </h2>
        
        {hasDates ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {dates.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 rounded-lg bg-background hover:bg-background/80 transition-colors duration-300 shadow-sm">
                <p className="font-bold text-lg text-primary">{item.date}</p>
                <p className="md:col-span-2 text-lg font-semibold">{item.place}</p>
                <p className="text-muted-foreground">{item.city}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Music className="mx-auto h-16 w-16 text-primary/50 mb-4" />
            <p className="text-2xl font-semibold mb-4">
              Preparando nuevas sorpresas.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              ¡Suscríbete y no te pierdas mis próximos conciertos!
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input type="email" placeholder="Tu correo electrónico" className="text-base" />
              <Button type="submit" className="bg-primary text-primary-foreground">
                <Ticket className="mr-2 h-4 w-4"/>
                Notificarme
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
