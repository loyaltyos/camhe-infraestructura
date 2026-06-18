import { Category, categoryImages } from "@/lib/site";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  specs: string[];
  price?: number;
  image: string;
  featured?: boolean;
};

const specsByCategory: Record<Category, string[]> = {
  "Mobiliario Urbano": ["Acabado anticorrosivo", "Uso exterior", "Instalación anclada"],
  "Seguridad Vial": ["Alta resistencia", "Uso vial e industrial", "Opciones reflejantes"],
  "Señalización Vial": ["Lámina galvanizada", "Vinil reflejante", "Postería compatible"],
  "Infraestructura Pluvial": ["Carga urbana", "Material de alta durabilidad", "Medidas bajo proyecto"],
  "Equipamiento Público": ["Uso intensivo", "Acabado para intemperie", "Diseño modular"],
  "Casetas y Módulos": ["Estructura prefabricada", "Configuración bajo pedido", "Entrega coordinada"]
};

const baseProducts: Array<Omit<Product, "id" | "description" | "specs" | "image">> = [
  { name: "Banca urbana metálica", category: "Mobiliario Urbano", price: 7200, featured: true },
  { name: "Banca urbana de concreto", category: "Mobiliario Urbano", price: 9800 },
  { name: "Banca con respaldo de acero", category: "Mobiliario Urbano", price: 8450 },
  { name: "Mesa urbana para parque", category: "Mobiliario Urbano", price: 11200 },
  { name: "Bicicletero metálico", category: "Mobiliario Urbano", price: 3950, featured: true },
  { name: "Parabús urbano", category: "Mobiliario Urbano" },
  { name: "Pérgola metálica urbana", category: "Mobiliario Urbano" },
  { name: "Cesto urbano metálico", category: "Mobiliario Urbano", price: 2800 },
  { name: "Bolardo fijo metálico", category: "Seguridad Vial", price: 1650, featured: true },
  { name: "Bolardo abatible", category: "Seguridad Vial", price: 3250 },
  { name: "Tope vehicular de caucho", category: "Seguridad Vial", price: 1180 },
  { name: "Tope vehicular metálico", category: "Seguridad Vial", price: 2450 },
  { name: "Defensa metálica vial", category: "Seguridad Vial" },
  { name: "Barrera de protección", category: "Seguridad Vial" },
  { name: "Delimitador vial", category: "Seguridad Vial", price: 690 },
  { name: "Trafitambo vial", category: "Seguridad Vial", price: 890 },
  { name: "Señal restrictiva alto", category: "Señalización Vial", price: 980 },
  { name: "Señal preventiva curva", category: "Señalización Vial", price: 920 },
  { name: "Señal informativa urbana", category: "Señalización Vial", price: 1250 },
  { name: "Poste para señal vial", category: "Señalización Vial", price: 780 },
  { name: "Señalética industrial", category: "Señalización Vial" },
  { name: "Señalamiento reflejante", category: "Señalización Vial", price: 1350, featured: true },
  { name: "Placa de nomenclatura urbana", category: "Señalización Vial", price: 1100 },
  { name: "Señal de límite de velocidad", category: "Señalización Vial", price: 980 },
  { name: "Rejilla pluvial de acero", category: "Infraestructura Pluvial", price: 3450, featured: true },
  { name: "Rejilla pluvial de hierro fundido", category: "Infraestructura Pluvial" },
  { name: "Coladera pluvial", category: "Infraestructura Pluvial", price: 2100 },
  { name: "Tapa de registro", category: "Infraestructura Pluvial", price: 2850 },
  { name: "Canal pluvial prefabricado", category: "Infraestructura Pluvial" },
  { name: "Brocal con tapa", category: "Infraestructura Pluvial", price: 3900 },
  { name: "Registro sanitario prefabricado", category: "Infraestructura Pluvial" },
  { name: "Rejilla para banqueta", category: "Infraestructura Pluvial", price: 2650 },
  { name: "Juego infantil modular", category: "Equipamiento Público" },
  { name: "Columpio urbano", category: "Equipamiento Público", price: 14800 },
  { name: "Resbaladilla para parque", category: "Equipamiento Público", price: 18500 },
  { name: "Gimnasio urbano básico", category: "Equipamiento Público", price: 32000, featured: true },
  { name: "Gimnasio urbano multifuncional", category: "Equipamiento Público" },
  { name: "Contenedor urbano metálico", category: "Equipamiento Público", price: 7800 },
  { name: "Contenedor para residuos", category: "Equipamiento Público", price: 5200 },
  { name: "Bebedero urbano", category: "Equipamiento Público", price: 16500 },
  { name: "Mesa de picnic urbana", category: "Equipamiento Público", price: 12800 },
  { name: "Aparcabicicletas urbano", category: "Equipamiento Público", price: 4500 },
  { name: "Caseta de vigilancia", category: "Casetas y Módulos", featured: true },
  { name: "Caseta prefabricada", category: "Casetas y Módulos" },
  { name: "Módulo sanitario", category: "Casetas y Módulos" },
  { name: "Caseta para obra", category: "Casetas y Módulos" },
  { name: "Módulo de control de acceso", category: "Casetas y Módulos" },
  { name: "Kiosco urbano", category: "Casetas y Módulos" },
  { name: "Módulo comercial prefabricado", category: "Casetas y Módulos" },
  { name: "Cabina de seguridad", category: "Casetas y Módulos" }
];

export const products: Product[] = baseProducts.map((product, index) => ({
  ...product,
  id: `${product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
  description: `${product.name} para proyectos de infraestructura urbana, fraccionamientos, municipios, parques industriales y obra privada.`,
  specs: specsByCategory[product.category],
  image: categoryImages[product.category]
}));

export const featuredProducts = products.filter((product) => product.featured).slice(0, 8);

export const formatPrice = (price?: number) =>
  typeof price === "number"
    ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(price)
    : "Cotizar";
