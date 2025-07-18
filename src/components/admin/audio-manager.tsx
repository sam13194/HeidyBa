"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Music, Trash2, ExternalLink, Play, Pause, Volume2 } from 'lucide-react';
import { AudioTrack, addAudioTrack, getAudioTracks, deleteAudioTrack } from '@/lib/database';

export default function AudioManager() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [newTrack, setNewTrack] = useState({
    title: '',
    artist: 'Heidy Bega',
    audioUrl: '',
    artwork: '/images/logo-removebg-preview (1).png'
  });

  useEffect(() => {
    loadTracks();
    // Auto-add existing audio if no tracks exist
    checkAndAddDefaultTrack();
  }, []);

  const checkAndAddDefaultTrack = async () => {
    const { data: existingTracks } = await getAudioTracks();
    if (!existingTracks || existingTracks.length === 0) {
      // Add the current audio file as default track
      await addAudioTrack({
        title: "Demo Vocal",
        artist: "Heidy Bega",
        audioUrl: "/audio/heidy-demo.mp3",
        artwork: "/images/logo-removebg-preview (1).png"
      });
      loadTracks();
    } else {
      // Check for duplicates and remove them
      const duplicates = existingTracks.filter(track => track.title === "Demo Vocal");
      if (duplicates.length > 1) {
        // Keep only the first one, delete the rest
        for (let i = 1; i < duplicates.length; i++) {
          await deleteAudioTrack(duplicates[i].id);
        }
        loadTracks();
      }
    }
  };

  const loadTracks = async () => {
    setLoading(true);
    const { data } = await getAudioTracks();
    if (data) {
      setTracks(data);
    }
    setLoading(false);
  };

  const handleAddTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.audioUrl) return;

    const { error } = await addAudioTrack(newTrack);
    if (!error) {
      setNewTrack({
        title: '',
        artist: 'Heidy Bega',
        audioUrl: '',
        artwork: '/images/logo-removebg-preview (1).png'
      });
      setShowAddForm(false);
      loadTracks();
    }
  };

  const handleDeleteTrack = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este track?')) {
      const { error } = await deleteAudioTrack(id);
      if (!error) {
        loadTracks();
      }
    }
  };

  const togglePlay = (track: AudioTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingTrack === track.id) {
      // Pause current track
      audio.pause();
      setPlayingTrack(null);
    } else {
      // Play new track
      audio.src = track.audioUrl;
      audio.play();
      setPlayingTrack(track.id);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setPlayingTrack(null);
    const handlePause = () => setPlayingTrack(null);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <audio ref={audioRef} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline text-primary">Gestión de Audio</h2>
          <p className="text-muted-foreground">
            Administra los tracks musicales que aparecen en el reproductor
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Track
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Track de Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTrack} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={newTrack.title}
                    onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                    placeholder="Nombre de la canción"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artista</Label>
                  <Input
                    id="artist"
                    value={newTrack.artist}
                    onChange={(e) => setNewTrack({ ...newTrack, artist: e.target.value })}
                    placeholder="Heidy Bega"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audioUrl">URL del Audio *</Label>
                <Input
                  id="audioUrl"
                  value={newTrack.audioUrl}
                  onChange={(e) => setNewTrack({ ...newTrack, audioUrl: e.target.value })}
                  placeholder="https://raw.githubusercontent.com/usuario/repo/main/audio.mp3"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  💡 Recomendado: Sube el archivo a GitHub y usa la URL raw, o usa Cloudinary/Vercel Blob
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="artwork">URL de la Portada (opcional)</Label>
                <Input
                  id="artwork"
                  value={newTrack.artwork}
                  onChange={(e) => setNewTrack({ ...newTrack, artwork: e.target.value })}
                  placeholder="/images/cover.jpg"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Guardar Track</Button>
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

      {tracks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Music className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay tracks de audio</h3>
            <p className="text-muted-foreground text-center mb-4">
              Agrega tu primer track musical para que aparezca en el reproductor del sitio web
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Primer Track
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tracks.map((track) => (
            <Card key={track.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Music className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                    <p className="text-xs text-muted-foreground">
                      Agregado: {new Date(track.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => togglePlay(track)}
                    title={playingTrack === track.id ? "Pausar" : "Reproducir"}
                    className={playingTrack === track.id ? "bg-primary text-primary-foreground" : ""}
                  >
                    {playingTrack === track.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(track.audioUrl, '_blank')}
                    title="Abrir audio"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteTrack(track.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}