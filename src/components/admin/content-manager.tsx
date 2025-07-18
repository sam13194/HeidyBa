"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save } from 'lucide-react';

export default function ContentManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline text-primary">Gestión de Contenido</h2>
          <p className="text-muted-foreground">
            Edita los textos y contenido general del sitio web
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar Cambios
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Settings className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Editor de Contenido</h3>
          <p className="text-muted-foreground text-center mb-4">
            Próximamente podrás editar todo el contenido del sitio desde aquí
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Podrás modificar biografía, información de contacto, redes sociales y más
          </p>
        </CardContent>
      </Card>
    </div>
  );
}