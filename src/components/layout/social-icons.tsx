"use client";

import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M16.6 5.82a4.26 4.26 0 0 1 4.26 4.26v3.37a2.13 2.13 0 0 1-2.13 2.13h-1.06a2.13 2.13 0 0 1-2.13-2.13v-7.44a4.26 4.26 0 0 1 1.06-2.19Z"/>
      <path d="M12.34 5.82a4.26 4.26 0 0 1 4.26 4.26v.01a4.26 4.26 0 0 1-4.26 4.26v-4.26a4.26 4.26 0 0 1-4.26-4.26V3.7A2.13 2.13 0 0 1 10.21 1.57h1.07a2.13 2.13 0 0 1 2.12 2.13Z"/>
    </svg>
);


const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/heidybecerraoficial', icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@heidybecerraoficial', icon: TikTokIcon },
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
