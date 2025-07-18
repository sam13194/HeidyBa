"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  subject: z.enum(["Contrataciones", "Prensa y Medios", "Mensaje General"]),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500),
});

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Mensaje General",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: "¡Mensaje Enviado!",
        description: "Gracias por contactarme. Te responderé lo antes posible.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: result.message,
      });
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-headline text-primary mb-12">
            Contacto
            </h2>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input placeholder="Tu nombre completo" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                            <Input placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Asunto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un motivo" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Contrataciones">Contrataciones (Booking)</SelectItem>
                        <SelectItem value="Prensa y Medios">Prensa y Medios</SelectItem>
                        <SelectItem value="Mensaje General">Mensaje General</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Escribe tu mensaje aquí..."
                        className="min-h-[150px]"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="text-center">
                    <Button type="submit" size="lg" className="bg-primary text-primary-foreground w-full md:w-auto" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>
                </div>
            </form>
            </Form>
        </div>
      </div>
    </section>
  );
}
