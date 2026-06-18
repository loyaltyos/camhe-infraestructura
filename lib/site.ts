export const contact = {
  phone: "+52 55 4517 4522",
  whatsapp: "525545174522",
  email: "info@camheiluminacion.com",
  address: "Av. Cvln Dr Alt 164, Independiente Poniente, 44290, Guadalajara, Jalisco"
};

export const categories = [
  "Mobiliario Urbano",
  "Seguridad Vial",
  "Señalización Vial",
  "Infraestructura Pluvial",
  "Equipamiento Público",
  "Casetas y Módulos"
] as const;

export type Category = (typeof categories)[number];

export const categoryDescriptions: Record<Category, string> = {
  "Mobiliario Urbano": "Bancas, mesas, cestos, parabuses y soluciones para parques, plazas y corredores urbanos.",
  "Seguridad Vial": "Elementos para ordenar circulación, proteger zonas peatonales y controlar accesos vehiculares.",
  "Señalización Vial": "Señales, postes y placas para vialidades urbanas, industriales y desarrollos privados.",
  "Infraestructura Pluvial": "Rejillas, tapas, brocales y registros para obras hidráulicas y urbanización.",
  "Equipamiento Público": "Juegos, gimnasios, contenedores y mobiliario funcional para espacios comunitarios.",
  "Casetas y Módulos": "Soluciones prefabricadas para vigilancia, obra, control de acceso y operación comercial."
};

export const categoryImages: Record<Category, string> = {
  "Mobiliario Urbano": "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
  "Seguridad Vial": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "Señalización Vial": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  "Infraestructura Pluvial": "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  "Equipamiento Público": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80",
  "Casetas y Módulos": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
};
