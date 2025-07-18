import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">
              Únete a mi club de fans
            </h3>
            <p className="text-muted-foreground">
              Recibe noticias exclusivas, preventas y contenido detrás de cámaras.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto md:mx-0 md:ml-auto">
            <Input type="email" placeholder="Tu correo electrónico" className="text-base" aria-label="Email for newsletter"/>
            <Button type="submit" className="bg-primary text-primary-foreground">
              <Mail className="mr-2 h-4 w-4" />
              Suscribirme
            </Button>
          </form>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Heidy Bega. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
