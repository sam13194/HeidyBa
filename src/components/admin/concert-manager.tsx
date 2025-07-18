"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, Trash2, ExternalLink, MapPin, Clock } from 'lucide-react';
import { ConcertDate, getConcertDates, addConcertDate, deleteConcertDate } from '@/lib/database';

export default function ConcertManager() {
  const [concerts, setConcerts] = useState<ConcertDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConcert, setNewConcert] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    ticketUrl: ''
  });

  useEffect(() => {
    loadConcerts();
  }, []);

  const loadConcerts = async () => {
    setLoading(true);
    const { data } = await getConcertDates();
    if (data) {
      setConcerts(data);
    }
    setLoading(false);
  };

  const handleAddConcert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcert.title || !newConcert.date || !newConcert.location) return;

    const { error } = await addConcertDate(newConcert);
    if (!error) {
      setNewConcert({
        title: '',
        date: '',
        location: '',
        description: '',
        ticketUrl: ''
      });
      setShowAddForm(false);
      loadConcerts();
    }
  };

  const handleDeleteConcert = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      const { error } = await deleteConcertDate(id);
      if (!error) {
        loadConcerts();
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
      year: date.getFullYear(),
      time: date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
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
          <h2 className="text-2xl font-headline text-primary">Gestión de Fechas</h2>
          <p className="text-muted-foreground">
            Administra los conciertos y eventos programados
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Evento
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Evento/Concierto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddConcert} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Evento *</Label>
                  <Input
                    id="title"
                    value={newConcert.title}
                    onChange={(e) => setNewConcert({ ...newConcert, title: e.target.value })}
                    placeholder="Concierto en vivo - Heidy Bega"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha y Hora *</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newConcert.date}
                    onChange={(e) => setNewConcert({ ...newConcert, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  value={newConcert.location}
                  onChange={(e) => setNewConcert({ ...newConcert, location: e.target.value })}
                  placeholder="Teatro Nacional, Bogotá, Colombia"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  value={newConcert.description}
                  onChange={(e) => setNewConcert({ ...newConcert, description: e.target.value })}
                  placeholder="Descripción del evento, artistas invitados, etc."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketUrl">URL de Boletos (opcional)</Label>
                <Input
                  id="ticketUrl"
                  type="url"
                  value={newConcert.ticketUrl}
                  onChange={(e) => setNewConcert({ ...newConcert, ticketUrl: e.target.value })}
                  placeholder="https://ticketmaster.com/evento"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Guardar Evento</Button>
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

      {concerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay eventos programados</h3>
            <p className="text-muted-foreground text-center mb-4">
              Agrega tu primer evento o concierto para que aparezca en el sitio web
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Primer Evento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {concerts.map((concert) => {
            const dateInfo = formatDate(concert.date);
            const isUpcoming = new Date(concert.date) > new Date();
            
            return (
              <Card key={concert.id} className={`border-l-4 ${isUpcoming ? 'border-l-green-500' : 'border-l-gray-400'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      {/* Date Display */}
                      <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-3 min-w-[80px]">
                        <div className="text-2xl font-bold text-primary">{dateInfo.day}</div>
                        <div className="text-xs font-semibold text-primary">{dateInfo.month}</div>
                        <div className="text-xs text-muted-foreground">{dateInfo.year}</div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{concert.title}</h3>
                            {isUpcoming && (
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
                                Próximo
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{dateInfo.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{concert.location}</span>
                        </div>
                        
                        {concert.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {concert.description}
                          </p>
                        )}
                        
                        <div className="flex gap-2 mt-3">
                          {concert.ticketUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(concert.ticketUrl, '_blank')}
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Boletos
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteConcert(concert.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}