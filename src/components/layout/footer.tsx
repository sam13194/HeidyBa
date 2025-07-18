import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo principal */}
        <div className="text-center mb-12">
          <Image
            src="/images/logo-removebg-preview (1).png"
            alt="Logo oficial de Heidy Bega"
            width={600}
            height={240}
            className="h-48 w-auto mx-auto mb-4"
          />
          <p className="text-muted-foreground max-w-md mx-auto">
            Canciones que nacen del corazón
          </p>
        </div>

        {/* Newsletter */}
        <div className="max-w-md mx-auto mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">
              Únete a mi club de fans
            </h3>
            <p className="text-muted-foreground">
              Recibe noticias exclusivas, preventas y contenido detrás de cámaras.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input type="email" placeholder="Tu correo electrónico" className="text-base" aria-label="Email for newsletter"/>
            <Button type="submit" className="bg-primary text-primary-foreground">
              <Mail className="mr-2 h-4 w-4" />
              Suscribirme
            </Button>
          </form>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center text-muted-foreground text-sm space-y-2">
          <p>&copy; {currentYear} Heidy Bega. Todos los derechos reservados.</p>
          <p className="text-xs">
            Desarrollado con ❤️ por{' '}
            <a 
              href="https://synergyatech.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-colors duration-200 font-medium"
            >
              Synergyatech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
