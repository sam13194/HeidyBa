"use client";

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logOut } from '@/lib/auth';
import { 
  Music, 
  Images, 
  Calendar, 
  Settings, 
  LogOut, 
  User as UserIcon,
  BarChart3,
  Upload
} from 'lucide-react';
import Image from 'next/image';
import { getAudioTracks, getGalleryImages, getConcertDates } from '@/lib/database';
import AudioManager from './audio-manager';
import GalleryManager from './gallery-manager';
import ConcertManager from './concert-manager';
import ContentManager from './content-manager';

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    audioTracks: 0,
    galleryImages: 0,
    concertDates: 0
  });

  useEffect(() => {
    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Refresh stats when switching to overview tab
  useEffect(() => {
    if (activeTab === 'overview') {
      loadStats();
    }
  }, [activeTab]);

  const loadStats = async () => {
    const [audioData, galleryData, concertData] = await Promise.all([
      getAudioTracks(),
      getGalleryImages(),
      getConcertDates()
    ]);

    setStats({
      audioTracks: audioData.data?.length || 0,
      galleryImages: galleryData.data?.length || 0,
      concertDates: concertData.data?.length || 0
    });
  };

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-removebg-preview (1).png"
              alt="Heidy Bega Logo"
              width={80}
              height={40}
              className="h-8 w-auto"
            />
            <div className="border-l border-border pl-4">
              <h1 className="text-xl font-headline text-primary">
                Panel de Administración
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{user.displayName || user.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images className="w-4 h-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="concerts" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Fechas</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Contenido</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Audios</CardTitle>
                  <Music className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.audioTracks}</div>
                  <p className="text-xs text-muted-foreground">
                    Tracks disponibles
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Imágenes</CardTitle>
                  <Images className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.galleryImages}</div>
                  <p className="text-xs text-muted-foreground">
                    En galería
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximos Shows</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.concertDates}</div>
                  <p className="text-xs text-muted-foreground">
                    Eventos programados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Hoy</div>
                  <p className="text-xs text-muted-foreground">
                    Contenido actualizado
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bienvenido al Panel de Administración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Desde aquí puedes gestionar todo el contenido de la página web de Heidy Bega:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-primary" />
                    <span><strong>Audio:</strong> Subir y gestionar tracks musicales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-primary" />
                    <span><strong>Galería:</strong> Administrar fotos y imágenes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span><strong>Fechas:</strong> Programar conciertos y eventos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    <span><strong>Contenido:</strong> Editar textos y información de la página</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio">
            <AudioManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="concerts">
            <ConcertManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}