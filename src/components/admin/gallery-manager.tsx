"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Images, Plus, Trash2, ExternalLink } from 'lucide-react';
import { GalleryImage, getGalleryImages, addGalleryImage, deleteGalleryImage } from '@/lib/database';

// Existing images from the current gallery
const existingImages = [
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.41 PM.jpeg", alt: "Heidy Bega en presentación", className: "row-span-2" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.42 PM.jpeg", alt: "Heidy Bega en sesión de fotos" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.45 PM.jpeg", alt: "Heidy Bega en evento" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.02.47 PM.jpeg", alt: "Heidy Bega sonriendo", className: "row-span-2" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.03.16 PM.jpeg", alt: "Heidy Bega en concierto" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 9.48.36 PM.jpeg", alt: "Heidy Bega profesional" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 9.49.09 PM.jpeg", alt: "Heidy Bega en evento especial" },
  { src: "/images/misimagenes/WhatsApp Image 2025-07-17 at 10.11.34 PM.jpeg", alt: "Heidy Bega backstage" },
];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    src: '',
    alt: '',
    className: ''
  });

  useEffect(() => {
    loadImages();
    migrateExistingImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const { data } = await getGalleryImages();
    if (data) {
      setImages(data);
    }
    setLoading(false);
  };

  const migrateExistingImages = async () => {
    const { data: existingImagesInDB } = await getGalleryImages();
    if (!existingImagesInDB || existingImagesInDB.length === 0) {
      // Migrate existing images to Firebase
      console.log('Migrating existing images to Firebase...');
      for (const image of existingImages) {
        await addGalleryImage({
          src: image.src,
          alt: image.alt,
          className: image.className
        });
      }
      loadImages();
    } else {
      console.log('Images already migrated:', existingImagesInDB.length);
      // Remove duplicates if any
      const duplicates = existingImagesInDB.filter((img, index, arr) => 
        arr.findIndex(i => i.src === img.src) !== index
      );
      
      if (duplicates.length > 0) {
        console.log('Removing duplicates:', duplicates.length);
        for (const duplicate of duplicates) {
          await deleteGalleryImage(duplicate.id);
        }
        loadImages();
      }
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      const { error } = await deleteGalleryImage(id);
      if (!error) {
        loadImages();
      }
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.src || !newImage.alt) return;

    const { error } = await addGalleryImage(newImage);
    if (!error) {
      setNewImage({
        src: '',
        alt: '',
        className: ''
      });
      setShowAddForm(false);
      loadImages();
    }
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
          <h2 className="text-2xl font-headline text-primary">Gestión de Galería</h2>
          <p className="text-muted-foreground">
            Administra las imágenes que aparecen en la galería del sitio web
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Imagen
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nueva Imagen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddImage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="src">URL de la Imagen *</Label>
                <Input
                  id="src"
                  value={newImage.src}
                  onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                  placeholder="/images/nueva-imagen.jpg o https://ejemplo.com/imagen.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  💡 Puedes usar rutas locales (/images/...) o URLs externas
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alt">Descripción *</Label>
                <Input
                  id="alt"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  placeholder="Descripción de la imagen"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="className">Clase CSS (opcional)</Label>
                <Input
                  id="className"
                  value={newImage.className}
                  onChange={(e) => setNewImage({ ...newImage, className: e.target.value })}
                  placeholder="row-span-2 para imagen vertical"
                />
                <p className="text-xs text-muted-foreground">
                  Usa "row-span-2" para imágenes que ocupen más espacio verticalmente
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Guardar Imagen</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {images.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Images className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay imágenes</h3>
            <p className="text-muted-foreground text-center mb-4">
              Las imágenes existentes se están migrando automáticamente...
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-4">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-3 bg-muted">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-sm truncate">{image.alt}</p>
                  <p className="text-xs text-muted-foreground">
                    Agregada: {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(image.src, '_blank')}
                      className="flex-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteImage(image.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}