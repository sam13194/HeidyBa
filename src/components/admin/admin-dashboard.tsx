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
  Upload,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'audio', label: 'Audio', icon: Music },
    { id: 'gallery', label: 'Galería', icon: Images },
    { id: 'concerts', label: 'Fechas', icon: Calendar },
    { id: 'content', label: 'Contenido', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-muted/20 border-r border-border flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-removebg-preview (1).png"
                  alt="Heidy Bega Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <h1 className="text-lg font-headline text-primary">Admin</h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-2 border-t border-border">
          <div className={`flex items-center gap-3 p-3 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <UserIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.displayName || 'Admin'}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size={sidebarCollapsed ? "icon" : "sm"}
            onClick={handleLogOut}
            className={`w-full ${sidebarCollapsed ? 'h-10' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            title={sidebarCollapsed ? 'Cerrar sesión' : ''}
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span className="ml-2">Cerrar sesión</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-6">
          <h2 className="text-xl font-headline text-primary">
            {menuItems.find(item => item.id === activeTab)?.label || 'Panel de Administración'}
          </h2>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">

            {activeTab === 'overview' && (
              <div className="space-y-6">
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
              </div>
            )}

            {activeTab === 'audio' && <AudioManager />}

            {activeTab === 'gallery' && <GalleryManager />}

            {activeTab === 'concerts' && <ConcertManager />}

            {activeTab === 'content' && <ContentManager />}

          </div>
        </div>
      </div>
    </div>
  );
}