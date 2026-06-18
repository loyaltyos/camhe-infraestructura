import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CartProvider } from "@/components/cart-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://camheinfraestructura.com.mx"),
  title: {
    default: "CAMHE Infraestructura | Equipamiento urbano e infraestructura",
    template: "%s | CAMHE Infraestructura"
  },
  description:
    "Catálogo premium de equipamiento urbano, mobiliario urbano, bolardos, topes vehiculares, señalización vial, casetas prefabricadas, juegos infantiles urbanos y rejillas pluviales.",
  keywords: [
    "equipamiento urbano",
    "mobiliario urbano",
    "infraestructura urbana",
    "bolardos",
    "topes vehiculares",
    "señalización vial",
    "casetas prefabricadas",
    "juegos infantiles urbanos",
    "rejillas pluviales",
    "mobiliario para parques",
    "infraestructura para municipios",
    "equipamiento para fraccionamientos"
  ],
  openGraph: {
    title: "CAMHE Infraestructura",
    description: "Infraestructura y equipamiento urbano para proyectos públicos y privados.",
    type: "website",
    locale: "es_MX",
    url: "https://camheinfraestructura.com.mx"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
