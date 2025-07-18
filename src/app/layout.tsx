import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Heidy Bega | Cantante de Música Popular - Sitio Oficial',
  description: 'Sitio web oficial de Heidy Valeria Becerra Galvis (Heidy Bega), cantante de música popular de Cúcuta. Participante de La Voz Kids Colombia. Escucha su música, conoce su historia y entérate de sus próximos conciertos.',
  keywords: ['Heidy Bega', 'Heidy Valeria Becerra Galvis', 'música popular', 'cantante', 'La Voz Kids Colombia', 'Cúcuta', 'Norte de Santander', 'música colombiana'],
  authors: [{ name: 'Heidy Bega' }],
  creator: 'Heidy Bega',
  publisher: 'Heidy Bega',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Heidy Bega | Cantante de Música Popular',
    description: 'Sitio web oficial de Heidy Bega, cantante de música popular de Cúcuta, participante de La Voz Kids Colombia.',
    url: 'https://heidybega.com',
    siteName: 'Heidy Bega',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heidy Bega | Cantante de Música Popular',
    description: 'Sitio web oficial de Heidy Bega, cantante de música popular.',
    creator: '@heidybega',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased bg-background text-foreground")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
