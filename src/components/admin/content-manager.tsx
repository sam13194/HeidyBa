"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Save, 
  Home, 
  User, 
  ImageIcon, 
  Video, 
  Music2, 
  Calendar,
  Phone,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';
import { updateSiteContent, getSiteContent, SiteContent } from '@/lib/database';
import { getGalleryImages } from '@/lib/database';

export default function ContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<SiteContent>({
    heroSection: {
      title: 'Heidy Bega',
      subtitle: 'Canciones que nacen del corazón',
      backgroundImage: '/images/hero-bg.jpg'
    },
    aboutSection: {
      title: 'Mi Historia',
      description: 'Descripción sobre Heidy Bega...',
      image: '/images/about.jpg'
    },
    contact: {
      email: 'contacto@heidybega.com',
      phone: '+57 300 123 4567',
      address: 'Colombia',
      socialMedia: {
        instagram: 'https://instagram.com/heidybega',
        facebook: 'https://facebook.com/heidybega',
        youtube: 'https://youtube.com/@heidybega',
        tiktok: 'https://tiktok.com/@heidybega'
      }
    },
    videos: []
  });
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    loadContent();
    loadGalleryImages();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const { data } = await getSiteContent();
    if (data) {
      setContent(data);
    }
    setLoading(false);
  };

  const loadGalleryImages = async () => {
    const { data } = await getGalleryImages();
    if (data) {
      setGalleryImages(data);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateSiteContent(content);
    if (!error) {
      // Show success message or notification
      console.log('Contenido guardado exitosamente');
    }
    setSaving(false);
  };

  const addVideo = () => {
    setContent(prev => ({
      ...prev,
      videos: [
        ...prev.videos,
        {
          title: 'Nuevo Video',
          videoId: '',
          thumbnail: ''
        }
      ]
    }));
  };

  const removeVideo = (index: number) => {
    setContent(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const updateVideo = (index: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      videos: prev.videos.map((video, i) => 
        i === index ? { ...video, [field]: value } : video
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline text-primary">Editor de Contenido</h2>
          <p className="text-muted-foreground">
            Edita todas las secciones del sitio web
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Inicio</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Historia</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center gap-2">
            <Music2 className="w-4 h-4" />
            <span className="hidden sm:inline">Música</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Galería</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Contacto</span>
          </TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Sección Principal (Hero)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Título Principal</Label>
                  <Input
                    id="hero-title"
                    value={content.heroSection.title}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      heroSection: { ...prev.heroSection, title: e.target.value }
                    }))}
                    placeholder="Heidy Bega"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtítulo</Label>
                  <Input
                    id="hero-subtitle"
                    value={content.heroSection.subtitle}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      heroSection: { ...prev.heroSection, subtitle: e.target.value }
                    }))}
                    placeholder="Canciones que nacen del corazón"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-bg">Imagen de Fondo</Label>
                <Input
                  id="hero-bg"
                  value={content.heroSection.backgroundImage}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    heroSection: { ...prev.heroSection, backgroundImage: e.target.value }
                  }))}
                  placeholder="/images/hero-bg.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Sección "Mi Historia"
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Título de la Sección</Label>
                <Input
                  id="about-title"
                  value={content.aboutSection.title}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, title: e.target.value }
                  }))}
                  placeholder="Mi Historia"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-description">Descripción/Biografía</Label>
                <Textarea
                  id="about-description"
                  value={content.aboutSection.description}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, description: e.target.value }
                  }))}
                  placeholder="Escribe aquí la biografía de Heidy Bega..."
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-image">Imagen de la Biografía</Label>
                <Select
                  value={content.aboutSection.image}
                  onValueChange={(value) => setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, image: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una imagen de la galería" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleryImages.map((image) => (
                      <SelectItem key={image.id} value={image.src}>
                        {image.alt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Videos Section */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Lista de Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  Gestiona los videos que aparecen en la sección de videos
                </p>
                <Button onClick={addVideo} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Video
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.videos.map((video, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="space-y-2">
                            <Label>Título del Video</Label>
                            <Input
                              value={video.title}
                              onChange={(e) => updateVideo(index, 'title', e.target.value)}
                              placeholder="Título del video"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>ID de YouTube (después de v=)</Label>
                            <Input
                              value={video.videoId}
                              onChange={(e) => updateVideo(index, 'videoId', e.target.value)}
                              placeholder="dQw4w9WgXcQ"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>URL del Thumbnail (opcional)</Label>
                            <Input
                              value={video.thumbnail}
                              onChange={(e) => updateVideo(index, 'thumbnail', e.target.value)}
                              placeholder="Se genera automáticamente si se deja vacío"
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeVideo(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Music Section */}
        <TabsContent value="music">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music2 className="w-5 h-5" />
                Sección de Música
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Music2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  La música se gestiona desde la sección <Badge variant="outline">Audio</Badge>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Ve a la pestaña "Audio" para agregar, editar o eliminar tracks musicales
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Section */}
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Sección de Galería
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Las imágenes se gestionan desde la sección <Badge variant="outline">Galería</Badge>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Ve a la pestaña "Galería" para agregar, editar o eliminar imágenes
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Section */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    placeholder="contacto@heidybega.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Teléfono</Label>
                  <Input
                    id="contact-phone"
                    value={content.contact.phone}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value }
                    }))}
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-address">Ubicación</Label>
                <Input
                  id="contact-address"
                  value={content.contact.address}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, address: e.target.value }
                  }))}
                  placeholder="Colombia"
                />
              </div>
              
              <div className="space-y-4">
                <Label className="text-base font-semibold">Redes Sociales</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="social-instagram">Instagram</Label>
                    <Input
                      id="social-instagram"
                      value={content.contact.socialMedia.instagram}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          socialMedia: { ...prev.contact.socialMedia, instagram: e.target.value }
                        }
                      }))}
                      placeholder="https://instagram.com/heidybega"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-facebook">Facebook</Label>
                    <Input
                      id="social-facebook"
                      value={content.contact.socialMedia.facebook}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          socialMedia: { ...prev.contact.socialMedia, facebook: e.target.value }
                        }
                      }))}
                      placeholder="https://facebook.com/heidybega"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-youtube">YouTube</Label>
                    <Input
                      id="social-youtube"
                      value={content.contact.socialMedia.youtube}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          socialMedia: { ...prev.contact.socialMedia, youtube: e.target.value }
                        }
                      }))}
                      placeholder="https://youtube.com/@heidybega"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-tiktok">TikTok</Label>
                    <Input
                      id="social-tiktok"
                      value={content.contact.socialMedia.tiktok}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          socialMedia: { ...prev.contact.socialMedia, tiktok: e.target.value }
                        }
                      }))}
                      placeholder="https://tiktok.com/@heidybega"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}