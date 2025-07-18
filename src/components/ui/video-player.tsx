"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Play } from "lucide-react";

// Componente para manejar errores de carga de imagen
function VideoThumbnail({ src, alt, videoId }: { src: string; alt: string; videoId: string }) {
  const [imageError, setImageError] = useState(false);
  
  // URLs de fallback en orden de prioridad
  const fallbackUrls = [
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`
  ];
  
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  
  const handleError = () => {
    if (currentUrlIndex < fallbackUrls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };
  
  if (imageError) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
          <Play className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Video</span>
        </div>
      </div>
    );
  }
  
  return (
    <Image
      src={fallbackUrls[currentUrlIndex]}
      alt={alt}
      fill
      sizes="64px"
      className="object-cover"
      onError={handleError}
    />
  );
}

interface Video {
  title: string;
  videoId: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  videos: Video[];
}

export function VideoPlayer({ videos }: VideoPlayerProps) {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="overflow-hidden shadow-2xl border border-border/50">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row h-[600px]">
            
            {/* Lista de videos (20%) */}
            <div className="w-full lg:w-[20%] bg-muted/20 border-r border-border/50">
              <div className="p-4 border-b border-border/50">
                <h4 className="font-semibold text-lg">Lista de Reproducción</h4>
                <p className="text-sm text-muted-foreground">{videos.length} videos</p>
              </div>
              <div className="overflow-y-auto h-full">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideo(video)}
                    className={`w-full p-4 text-left hover:bg-muted/40 transition-colors border-b border-border/30 ${
                      currentVideo.videoId === video.videoId ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                        <VideoThumbnail
                          src={video.thumbnail}
                          alt={video.title}
                          videoId={video.videoId}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" fill="currentColor" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-medium text-sm line-clamp-2 leading-tight">
                          {video.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Heidy Bega
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reproductor de video (80%) */}
            <div className="w-full lg:w-[80%] bg-black relative">
              <div className="absolute inset-0">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=0&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Información del video actual */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h4 className="text-white font-semibold text-xl mb-2">
                  {currentVideo.title}
                </h4>
                <p className="text-white/80 text-sm">
                  Heidy Bega
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}