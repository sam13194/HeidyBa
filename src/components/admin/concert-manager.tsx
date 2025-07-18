"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';

export default function ConcertManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline text-primary">Gestión de Fechas</h2>
          <p className="text-muted-foreground">
            Administra los conciertos y eventos programados
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Agregar Evento
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Gestión de Eventos</h3>
          <p className="text-muted-foreground text-center mb-4">
            Próximamente podrás gestionar las fechas de conciertos desde aquí
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Podrás agregar, editar y eliminar eventos y conciertos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}