export const CONFIG = {
  // Tienda
  storeName: "Ecomify",
  productName: "FlexiPlug Pro",
  productShortName: "Toma Giratoria Extensible",
  productDescription: "Extensor de enchufe ajustable y giratorio para lugares de difícil acceso. Con USB-A, USB-C y 2 tomas de corriente.",
  
  // Precios
  productPrice: 89900,
  productPriceFormatted: "$ 89.900",
  compareAtPrice: 129900,
  compareAtPriceFormatted: "$ 129.900",
  
  // WhatsApp
  waNumber: "573242063393",
  waMessage: "Hola! Quiero pedir el FlexiPlug Pro. ¿Tienen disponibilidad?",
  
  // Inventario (Simulado)
  stock: 12,

  // Características Reales
  specs: {
    extension: "40cm a 60cm (15.7\" a 23.6\")",
    rotation: "180 Grados",
    ports: "1 USB-C, 1 USB-A, 2 Salidas CA",
    weight: "400g",
    color: "Blanco Premium",
    usage: "Detrás de sofás, camas, escritorios y gabinetes"
  },

  // Imágenes (Placeholders)
  images: [
    "/images/product-1.png",
    "/images/product-2.png",
    "/images/product-3.png",
  ],

  // Videos Locales
  videos: [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ]
}

export const DEPARTMENTS = {
  "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Sabaneta", "Apartadó", "Turbo"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Galapa"],
  "Bogotá D.C.": ["Bogotá"],
  "Bolívar": ["Cartagena", "Magangué", "El Carmen de Bolívar", "Turbaco"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá"],
  "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Riosucio"],
  "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
  "Cesar": ["Valledupar", "Aguachica", "Codazzi"],
  "Córdoba": ["Montería", "Cereté", "Lorica", "Sahagún"],
  "Cundinamarca": ["Soacha", "Facatativá", "Zipaquirá", "Chía", "Fusagasugá", "Mosquera"],
  "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
  "Meta": ["Villavicencio", "Acacías", "Granada"],
  "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario"],
  "Quindío": ["Armenia", "Calarcá", "Montenegro"],
  "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Barrancabermeja", "Socorro"],
  "Sucre": ["Sincelejo", "Corozal", "Sampués"],
  "Tolima": ["Ibagué", "Espinal", "Honda", "Líbano"],
  "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Buga", "Cartago"],
};
