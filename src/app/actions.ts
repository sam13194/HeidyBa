"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.enum(["Contrataciones", "Prensa y Medios", "Mensaje General"]),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Datos inválidos." };
  }

  // In a real application, you would handle the form submission here,
  // e.g., send an email, save to a database, etc.
  console.log("Form data received:", parsed.data);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: "¡Mensaje recibido!" };
}
