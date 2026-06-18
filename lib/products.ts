import { Category } from "@/lib/site";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  specs: string[];
  price?: number;
  priceType?: "fixed" | "from" | "quote";
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
  { name: "Banca urbana metálica", category: "Mobiliario Urbano", price: 7900, featured: true },
  { name: "Banca urbana de concreto", category: "Mobiliario Urbano", price: 11800 },
  { name: "Banca con respaldo de acero", category: "Mobiliario Urbano", price: 9200 },
  { name: "Mesa urbana para parque", category: "Mobiliario Urbano", price: 13200 },
  { name: "Bicicletero metálico", category: "Mobiliario Urbano", price: 4200, featured: true },
  { name: "Parabús urbano", category: "Mobiliario Urbano", price: 68000, priceType: "from" },
  { name: "Pérgola metálica urbana", category: "Mobiliario Urbano", price: 45500, priceType: "from" },
  { name: "Cesto urbano metálico", category: "Mobiliario Urbano", price: 3400 },
  { name: "Bolardo fijo metálico", category: "Seguridad Vial", price: 1850, featured: true },
  { name: "Bolardo abatible", category: "Seguridad Vial", price: 3900 },
  { name: "Tope vehicular de caucho", category: "Seguridad Vial", price: 1350 },
  { name: "Tope vehicular metálico", category: "Seguridad Vial", price: 2750 },
  { name: "Defensa metálica vial", category: "Seguridad Vial", price: 9800, priceType: "from" },
  { name: "Barrera de protección", category: "Seguridad Vial", price: 8200, priceType: "from" },
  { name: "Delimitador vial", category: "Seguridad Vial", price: 760 },
  { name: "Trafitambo vial", category: "Seguridad Vial", price: 980 },
  { name: "Señal restrictiva alto", category: "Señalización Vial", price: 1150 },
  { name: "Señal preventiva curva", category: "Señalización Vial", price: 1080 },
  { name: "Señal informativa urbana", category: "Señalización Vial", price: 1450 },
  { name: "Poste para señal vial", category: "Señalización Vial", price: 920 },
  { name: "Señalética industrial", category: "Señalización Vial", price: 1650, priceType: "from" },
  { name: "Señalamiento reflejante", category: "Señalización Vial", price: 1550, featured: true },
  { name: "Placa de nomenclatura urbana", category: "Señalización Vial", price: 1280 },
  { name: "Señal de límite de velocidad", category: "Señalización Vial", price: 1150 },
  { name: "Rejilla pluvial de acero", category: "Infraestructura Pluvial", price: 3950, featured: true },
  { name: "Rejilla pluvial de hierro fundido", category: "Infraestructura Pluvial", price: 4850 },
  { name: "Coladera pluvial", category: "Infraestructura Pluvial", price: 2450 },
  { name: "Tapa de registro", category: "Infraestructura Pluvial", price: 3300 },
  { name: "Canal pluvial prefabricado", category: "Infraestructura Pluvial", price: 1850, priceType: "from" },
  { name: "Brocal con tapa", category: "Infraestructura Pluvial", price: 4400 },
  { name: "Registro sanitario prefabricado", category: "Infraestructura Pluvial", price: 12800, priceType: "from" },
  { name: "Rejilla para banqueta", category: "Infraestructura Pluvial", price: 3100 },
  { name: "Juego infantil modular", category: "Equipamiento Público", price: 58000, priceType: "from" },
  { name: "Columpio urbano", category: "Equipamiento Público", price: 16800 },
  { name: "Resbaladilla para parque", category: "Equipamiento Público", price: 22500 },
  { name: "Gimnasio urbano básico", category: "Equipamiento Público", price: 38500, priceType: "from", featured: true },
  { name: "Gimnasio urbano multifuncional", category: "Equipamiento Público", price: 78000, priceType: "from" },
  { name: "Contenedor urbano metálico", category: "Equipamiento Público", price: 8900 },
  { name: "Contenedor para residuos", category: "Equipamiento Público", price: 6200 },
  { name: "Bebedero urbano", category: "Equipamiento Público", price: 18500 },
  { name: "Mesa de picnic urbana", category: "Equipamiento Público", price: 14600 },
  { name: "Aparcabicicletas urbano", category: "Equipamiento Público", price: 5200 },
  { name: "Caseta de vigilancia", category: "Casetas y Módulos", price: 78000, priceType: "from", featured: true },
  { name: "Caseta prefabricada", category: "Casetas y Módulos", price: 92000, priceType: "from" },
  { name: "Módulo sanitario", category: "Casetas y Módulos", price: 125000, priceType: "from" },
  { name: "Caseta para obra", category: "Casetas y Módulos", price: 64000, priceType: "from" },
  { name: "Módulo de control de acceso", category: "Casetas y Módulos", price: 118000, priceType: "from" },
  { name: "Kiosco urbano", category: "Casetas y Módulos", price: 145000, priceType: "from" },
  { name: "Módulo comercial prefabricado", category: "Casetas y Módulos", price: 168000, priceType: "from" },
  { name: "Cabina de seguridad", category: "Casetas y Módulos", price: 69000, priceType: "from" }
];

export const products: Product[] = baseProducts.map((product, index) => ({
  ...product,
  id: `${product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
  description: `${product.name} para proyectos de infraestructura urbana, fraccionamientos, municipios, parques industriales y obra privada.`,
  specs: specsByCategory[product.category],
  image: `/products/${product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}-${index + 1}.svg`,
  priceType: product.priceType ?? (product.price ? "fixed" : "quote")
}));

export const featuredProducts = products.filter((product) => product.featured).slice(0, 8);

export const formatPrice = (price?: number) =>
  typeof price === "number"
    ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(price)
    : "Cotizar";

export const formatProductPrice = (product: Product) => {
  if (!product.price) return "Cotización especial";
  const price = formatPrice(product.price);
  return product.priceType === "from" ? `Desde ${price} MXN` : `${price} MXN`;
};

export const toCents = (price: number) => Math.round(price * 100);

export const getProductById = (id: string) => products.find((product) => product.id === id);
