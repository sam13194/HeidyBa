"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getAudioTracks, AudioTrack } from "@/lib/database";

interface SimpleFloatingPlayerProps {
  audioSrc: string;
  title: string;
  artist: string;
  artwork?: string;
  hideWhenModalOpen?: boolean;
}

export function SimpleFloatingPlayer({ audioSrc, title, artist, artwork, hideWhenModalOpen = false }: SimpleFloatingPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ audioSrc, title, artist, artwork });

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      const footer = document.querySelector('footer');
      
      if (heroSection && footer) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        const footerTop = footer.offsetTop;
        
        // Show after hero section but hide when reaching footer
        const shouldBeVisible = scrollPosition > heroBottom + 100 && window.scrollY + window.innerHeight < footerTop + 50;
        setIsVisible(shouldBeVisible && !hideWhenModalOpen);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideWhenModalOpen]);

  // Update visibility when modal state changes
  useEffect(() => {
    if (hideWhenModalOpen) {
      setIsVisible(false);
    } else {
      // Re-check scroll position
      const heroSection = document.getElementById('home');
      const footer = document.querySelector('footer');
      
      if (heroSection && footer) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        const footerTop = footer.offsetTop;
        
        const shouldBeVisible = scrollPosition > heroBottom + 100 && window.scrollY + window.innerHeight < footerTop + 50;
        setIsVisible(shouldBeVisible);
      }
    }
  }, [hideWhenModalOpen]);

  // Load tracks from Firebase
  useEffect(() => {
    const loadFirebaseTracks = async () => {
      const { data: tracks } = await getAudioTracks();
      if (tracks && tracks.length > 0) {
        // Use the first track from Firebase
        const firstTrack = tracks[0];
        setCurrentTrack({
          audioSrc: firstTrack.audioUrl,
          title: firstTrack.title,
          artist: firstTrack.artist,
          artwork: firstTrack.artwork || artwork
        });
      }
      // If no tracks in Firebase, keep the default/fallback track
    };

    loadFirebaseTracks();
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        console.log('Audio paused');
      } else {
        console.log('Attempting to play audio...');
        setIsLoading(true);
        
        // Verificar si el audio está listo
        if (audio.readyState < 2) {
          console.log('Audio not ready, loading...');
          audio.load();
          await new Promise((resolve) => {
            audio.addEventListener('canplay', resolve, { once: true });
          });
        }
        
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
        console.log('Audio playing successfully');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
      // Intentar una vez más después de cargar
      try {
        audio.load();
        await audio.play();
        setIsPlaying(true);
        console.log('Audio playing after reload');
      } catch (retryError) {
        console.error('Failed to play audio after retry:', retryError);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={currentTrack.audioSrc} />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-4">
                {/* Artwork */}
                {currentTrack.artwork && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={currentTrack.artwork} 
                      alt={`Portada de ${currentTrack.title}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{currentTrack.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
                </div>

                {/* Play button */}
                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="h-12 w-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" fill="currentColor" />
                  ) : (
                    <Play className="h-6 w-6" fill="currentColor" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}