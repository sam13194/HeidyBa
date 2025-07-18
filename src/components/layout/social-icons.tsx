"use client";

import { Instagram, Facebook, MessageCircle, Youtube } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/573213880813', icon: MessageCircle },
  { name: 'Instagram', href: 'https://www.instagram.com/heidybecerraoficial', icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@heidybecerraoficial', icon: TikTokIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@heidy_becerra', icon: Youtube },
  { name: 'Facebook', href: 'https://www.facebook.com/share/15bJUoCn5H/', icon: Facebook },
];

export default function SocialIcons() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Heidy Bega en ${link.name}`}
            className="w-12 h-12 bg-foreground/80 hover:bg-primary text-background rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          >
            <link.icon className="w-6 h-6" />
          </a>
        ))}
      </div>
    </div>
  );
}
