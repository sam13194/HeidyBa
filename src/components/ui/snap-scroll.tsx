"use client";

import { useEffect } from 'react';

export function SnapScroll() {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTime = 0;

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
        const headerHeight = 80; // Height of fixed header
        const elementTop = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      }
    };

    const getCurrentSection = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          return i;
        }
      }
      return 0;
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isScrolling || now - lastScrollTime < 50) return;
      
      // Only prevent default for intentional scroll gestures
      if (Math.abs(e.deltaY) < 10) return;
      
      e.preventDefault();
      lastScrollTime = now;
      
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
        }, 800);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // Ignore multi-touch
      const touch = e.touches[0];
      (window as any).touchStartY = touch.clientY;
      (window as any).touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling || e.changedTouches.length > 1) return;
      
      const touch = e.changedTouches[0];
      const touchEndY = touch.clientY;
      const touchStartY = (window as any).touchStartY;
      const touchStartTime = (window as any).touchStartTime;
      
      if (!touchStartY || !touchStartTime) return;
      
      const deltaY = touchStartY - touchEndY;
      const deltaTime = Date.now() - touchStartTime;
      const velocity = Math.abs(deltaY) / deltaTime;
      
      // Require minimum distance and velocity for snap
      const threshold = 80;
      const minVelocity = 0.3;
      
      if (Math.abs(deltaY) > threshold && velocity > minVelocity) {
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
          }, 800);
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
          const headerHeight = 80;
          const expectedTop = section.offsetTop - headerHeight;
          const actualTop = window.scrollY;
          const threshold = 50;
          
          // Auto-adjust if not properly aligned
          if (Math.abs(actualTop - expectedTop) > threshold) {
            scrollToSection(sections[currentSectionIndex]);
          }
        }
      }, 300);
    };

    // Event listeners with better options
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