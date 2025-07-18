"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Música', href: '#music' },
  { name: 'Bio', href: '#bio' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Galería', href: '#gallery' },
  { name: 'Fechas', href: '#dates' },
  { name: 'Repertorio', href: '#repertoire' },
  { name: 'Contacto', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Header principal */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="#home" className="flex items-center">
              <Image
                src="/images/logo-removebg-preview (1).png"
                alt="Logo oficial de Heidy Bega"
                width={220}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            
            {/* Botón hamburguesa siempre visible */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)} 
              aria-label="Abrir menú"
              className="z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between p-6 border-b">
            <Image
              src="/images/logo-removebg-preview (1).png"
              alt="Logo oficial de Heidy Bega"
              width={160}
              height={60}
              className="h-12 w-auto"
            />
            <Button variant="ghost" size="icon" onClick={closeSidebar} aria-label="Cerrar menú">
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Navegación */}
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={closeSidebar}
                    className="block text-xl font-medium text-foreground hover:text-primary transition-colors duration-200 py-2"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer del sidebar */}
          <div className="p-6 border-t">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Heidy Bega
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
