"use client";

import { useEffect } from 'react';

export function SnapScroll() {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const sections = [
      'home',
      'music', 
      'bio',
      'about',
      'gallery',
      'dates',
      'repertoire',
      'contact'
    ];

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const getCurrentSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionBottom = sectionTop + rect.height;
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return i;
          }
        }
      }
      return 0;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      const currentSectionIndex = getCurrentSection();
      let targetSection = currentSectionIndex;
      
      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scrolling down
        targetSection = currentSectionIndex + 1;
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        // Scrolling up
        targetSection = currentSectionIndex - 1;
      }
      
      if (targetSection !== currentSectionIndex) {
        isScrolling = true;
        scrollToSection(sections[targetSection]);
        
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      (window as any).touchStartY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touch = e.changedTouches[0];
      const touchEndY = touch.clientY;
      const touchStartY = (window as any).touchStartY;
      
      if (!touchStartY) return;
      
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;
      
      if (Math.abs(deltaY) > threshold) {
        const currentSectionIndex = getCurrentSection();
        let targetSection = currentSectionIndex;
        
        if (deltaY > 0 && currentSectionIndex < sections.length - 1) {
          // Swiping up (scrolling down)
          targetSection = currentSectionIndex + 1;
        } else if (deltaY < 0 && currentSectionIndex > 0) {
          // Swiping down (scrolling up)
          targetSection = currentSectionIndex - 1;
        }
        
        if (targetSection !== currentSectionIndex) {
          isScrolling = true;
          scrollToSection(sections[targetSection]);
          
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    const handleScroll = () => {
      if (isScrolling) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentSectionIndex = getCurrentSection();
        const section = document.getElementById(sections[currentSectionIndex]);
        
        if (section) {
          const rect = section.getBoundingClientRect();
          const threshold = 100;
          
          // Si no está perfectamente alineado, ajustar
          if (Math.abs(rect.top) > threshold) {
            scrollToSection(sections[currentSectionIndex]);
          }
        }
      }, 150);
    };

    // Event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}