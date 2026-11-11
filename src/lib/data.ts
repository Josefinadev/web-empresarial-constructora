/* ------------------------------------------------------------------ */
/*  EDIFICA · Contenido del sitio                                      */
/* ------------------------------------------------------------------ */

const px = (id: number, ext = "jpeg", w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  hero: [
    px(13752348, "jpeg", 1920, 1080),
    px(19075387, "jpeg", 1920, 1080),
    px(16811460, "png", 1920, 1080),
  ],
  aboutMain: px(6285159, "jpeg", 1100, 860),
  aboutSmall: px(8482551, "jpeg", 700, 520),
  cta: px(19477137, "jpeg", 1920, 900),
  video: "https://videos.pexels.com/video-files/6569899/6569899-uhd_3840_2160_30fps.mp4",
  videoPoster:
    "https://images.pexels.com/videos/6569899/pexels-photo-6569899.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
};

export const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "nosotros", label: "Nosotros" },
  { id: "contacto", label: "Contacto" },
] as const;

export const CONTACT = {
  phone: "+52 55 4821 7390",
  phoneHref: "tel:+525548217390",
  email: "hola@edifica.mx",
  address: "Av. Paseo de la Reforma 2405, Lomas Altas, CDMX",
  hours: "Lun – Vie · 9:00 – 18:00",
  hoursSat: "Sáb · 9:00 – 14:00",
  whatsapp:
    "https://wa.me/525548217390?text=" +
    encodeURIComponent("Hola EDIFICA, me gustaría cotizar un proyecto."),
};

/* ----------------------------- Servicios ----------------------------- */

export type ServiceId = "construccion" | "mantenimiento" | "diseno";

export interface Service {
  id: ServiceId;
  num: string;
  icon: "hardhat" | "wrench" | "ruler";
  name: string;
  short: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
  stat: { value: string; label: string };
  rate: number; // USD por m² (base, nivel esencial)
  weeksBase: number;
  m2PerWeek: number;
}

export const SERVICES: Service[] = [
  {
    id: "construccion",
    num: "01",
    icon: "hardhat",
    name: "Construcción",
    short: "Obras sólidas y duraderas para tu tranquilidad.",
    tagline: "Obra nueva, llave en mano",
    description:
      "Ejecutamos obra nueva residencial, comercial y de obra civil con ingeniería propia, materiales certificados y un cronograma auditado semana a semana. Tú apruebas avances; nosotros respondemos por el resultado.",
    bullets: [
      "Obra nueva llave en mano",
      "Cimentaciones y estructura",
      "Ampliaciones y obra civil",
      "Acabados de alta gama",
      "Instalaciones eléctricas e hidrosanitarias",
      "Gerencia y supervisión de obra",
    ],
    image: px(4170185, "jpeg", 1200, 900),
    stat: { value: "+68", label: "obras entregadas" },
    rate: 620,
    weeksBase: 6,
    m2PerWeek: 28,
  },
  {
    id: "mantenimiento",
    num: "02",
    icon: "wrench",
    name: "Mantenimiento",
    short: "Conservamos y optimizamos tus espacios.",
    tagline: "Preventivo, correctivo y remodelación",
    description:
      "Programas de mantenimiento preventivo y correctivo para casas, oficinas y edificios. Diagnosticamos, presupuestamos sin sorpresas y dejamos cada espacio funcionando como el primer día.",
    bullets: [
      "Mantenimiento preventivo y correctivo",
      "Remodelaciones y adecuaciones",
      "Pintura e impermeabilización",
      "Fachadas, cubiertas y filtraciones",
      "Instalaciones eléctricas e hidráulicas",
      "Planes anuales para empresas",
    ],
    image: px(4981803, "jpeg", 1200, 900),
    stat: { value: "24 h", label: "tiempo de respuesta" },
    rate: 240,
    weeksBase: 2,
    m2PerWeek: 55,
  },
  {
    id: "diseno",
    num: "03",
    icon: "ruler",
    name: "Diseño Arquitectónico",
    short: "Diseños modernos y funcionales que inspiran.",
    tagline: "Del concepto al plano ejecutivo",
    description:
      "Traducimos tu forma de habitar en arquitectura: anteproyecto, renders fotorrealistas y proyecto ejecutivo listo para construir, con acompañamiento en trámites y dirección de obra.",
    bullets: [
      "Anteproyecto y diseño conceptual",
      "Proyecto ejecutivo y detalles",
      "Renders y recorridos 3D",
      "Diseño de interiores",
      "Trámites, permisos y licencias",
      "Dirección arquitectónica",
    ],
    image: px(7937367, "jpeg", 1200, 900),
    stat: { value: "+120", label: "proyectos diseñados" },
    rate: 45,
    weeksBase: 4,
    m2PerWeek: 120,
  },
];

/* ----------------------------- Proyectos ----------------------------- */

export type ProjectCategory =
  | "Residencial"
  | "Corporativo"
  | "Obra civil"
  | "Interiorismo";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  duration: string;
  image: string;
  description: string;
  service: ServiceId;
  tags: string[];
}

export const PROJECT_CATEGORIES: Array<"Todos" | ProjectCategory> = [
  "Todos",
  "Residencial",
  "Corporativo",
  "Obra civil",
  "Interiorismo",
];

export const PROJECTS: Project[] = [
  {
    id: "aurora",
    title: "Residencia Aurora",
    category: "Residencial",
    location: "Valle de Bravo",
    year: "2024",
    area: "420 m²",
    duration: "9 meses",
    image: px(4933643, "jpeg", 1400, 950),
    description:
      "Casa contemporánea de dos niveles integrada al terreno: losas en voladizo, muros de piedra aparente y domótica completa. Diseñada y construida por EDIFICA bajo el modelo llave en mano.",
    service: "construccion",
    tags: ["Llave en mano", "Domótica", "Piedra aparente"],
  },
  {
    id: "nexo",
    title: "Oficinas Nexo",
    category: "Corporativo",
    location: "Ciudad de México",
    year: "2024",
    area: "850 m²",
    duration: "5 meses",
    image: px(6794926, "jpeg", 1100, 800),
    description:
      "Adecuación integral de dos pisos corporativos: cancelería acústica, clima, iluminación escénica y salas colaborativas, ejecutada sin interrumpir la operación del edificio.",
    service: "mantenimiento",
    tags: ["Adecuación", "Acústica", "Iluminación"],
  },
  {
    id: "mirador",
    title: "Torre Mirador",
    category: "Obra civil",
    location: "Monterrey",
    year: "2023",
    area: "3,200 m²",
    duration: "14 meses",
    image: px(5511065, "jpeg", 1100, 800),
    description:
      "Estructura de concreto de ocho niveles con cimentación profunda y coordinación de siete frentes de trabajo. Entregada dos semanas antes del plazo contractual.",
    service: "construccion",
    tags: ["Estructura", "Concreto", "8 niveles"],
  },
  {
    id: "panorama",
    title: "Loft Panorama",
    category: "Interiorismo",
    location: "Guadalajara",
    year: "2024",
    area: "180 m²",
    duration: "3 meses",
    image: px(33529500, "jpeg", 1100, 800),
    description:
      "Remodelación total de un loft con doble altura: carpintería a medida en nogal, iluminación cálida por capas y una paleta de materiales naturales que amplifica la luz.",
    service: "mantenimiento",
    tags: ["Remodelación", "Carpintería", "Doble altura"],
  },
  {
    id: "encino",
    title: "Villa Encino",
    category: "Residencial",
    location: "Querétaro",
    year: "2023",
    area: "360 m²",
    duration: "8 meses",
    image: px(36777968, "jpeg", 1100, 800),
    description:
      "Residencia familiar de una planta con patio central, cubierta verde y sistema de captación pluvial. Certificación de eficiencia energética y jardín diseñado por nuestro estudio.",
    service: "construccion",
    tags: ["Sustentable", "Patio central", "Eficiencia"],
  },
  {
    id: "vertice",
    title: "Centro Vértice",
    category: "Corporativo",
    location: "Puebla",
    year: "2022",
    area: "1,400 m²",
    duration: "11 meses",
    image: px(13219418, "jpeg", 1100, 800),
    description:
      "Edificio corporativo de fachada ventilada en vidrio de bajo emisivo, lobby de triple altura y estacionamiento subterráneo. Proyecto ejecutivo y construcción integral.",
    service: "diseno",
    tags: ["Fachada ventilada", "Triple altura", "Ejecutivo"],
  },
];

/* ----------------------------- Nosotros ----------------------------- */

export const VALUES = [
  {
    icon: "shield" as const,
    title: "Calidad garantizada",
    text: "Materiales certificados y garantía por escrito.",
  },
  {
    icon: "handshake" as const,
    title: "Compromiso en cada proyecto",
    text: "Un solo equipo, de la idea a la entrega.",
  },
  {
    icon: "clock" as const,
    title: "Cumplimiento en los tiempos",
    text: "Cronograma auditado semana a semana.",
  },
  {
    icon: "users" as const,
    title: "Equipo profesional",
    text: "Arquitectos, ingenieros y técnicos propios.",
  },
];

export const STATS = [
  { value: 100, prefix: "+", suffix: "", label: "Proyectos realizados" },
  { value: 98, prefix: "", suffix: "%", label: "Clientes satisfechos" },
  { value: 8, prefix: "+", suffix: " años", label: "de experiencia" },
];

export const PROCESS = [
  {
    num: "01",
    icon: "search" as const,
    title: "Escuchamos",
    text: "Visita técnica sin costo. Entendemos tu necesidad, tu terreno y tu presupuesto antes de proponer nada.",
  },
  {
    num: "02",
    icon: "ruler" as const,
    title: "Diseñamos",
    text: "Anteproyecto, renders y presupuesto detallado por partidas. Apruebas cada decisión con información clara.",
  },
  {
    num: "03",
    icon: "hardhat" as const,
    title: "Construimos",
    text: "Ejecución con supervisión diaria, control de calidad y reportes fotográficos semanales de avance.",
  },
  {
    num: "04",
    icon: "key" as const,
    title: "Entregamos",
    text: "Pruebas, manual de uso, garantía firmada y un plan de mantenimiento para que tu inversión perdure.",
  },
];

/* ----------------------------- Testimonios ----------------------------- */

export const TESTIMONIALS = [
  {
    name: "Andrea Ramírez",
    role: "Propietaria · Residencia Aurora",
    quote:
      "Excelente servicio, cumplieron con los plazos y el resultado superó nuestras expectativas. Cada semana recibíamos reportes con fotos y avance real. 100% recomendados.",
    avatar: px(7752818, "jpeg", 240, 240),
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "Director de Operaciones · Oficinas Nexo",
    quote:
      "Remodelaron dos pisos completos sin detener nuestra operación. Orden, limpieza y una comunicación impecable con la administración del edificio. Ya firmamos el plan anual.",
    avatar: px(5308640, "jpeg", 240, 240),
    rating: 5,
  },
  {
    name: "Lucía Fernández",
    role: "Propietaria · Loft Panorama",
    quote:
      "El equipo de diseño entendió exactamente lo que buscábamos. Los renders eran idénticos al resultado final y el presupuesto no se movió un peso de lo firmado.",
    avatar: px(7752788, "jpeg", 240, 240),
    rating: 5,
  },
  {
    name: "Jorge Salinas",
    role: "Inversionista · Torre Mirador",
    quote:
      "Como inversionista valoro los números claros y las fechas cumplidas. EDIFICA entregó la estructura antes de plazo y con una calidad de concreto impecable.",
    avatar: px(9271168, "jpeg", 240, 240),
    rating: 5,
  },
];

/* ----------------------------- Cotizador ----------------------------- */

export const QUALITY_LEVELS = [
  { id: "esencial", label: "Esencial", mult: 1, hint: "Materiales nacionales de alta durabilidad" },
  { id: "premium", label: "Premium", mult: 1.35, hint: "Acabados importados y detalles a medida" },
  { id: "signature", label: "Signature", mult: 1.8, hint: "Alta gama, domótica y diseño de autor" },
] as const;

export type QualityId = (typeof QUALITY_LEVELS)[number]["id"];

export const EXTRAS = [
  { id: "planos", label: "Proyecto ejecutivo y planos", pct: 0.08 },
  { id: "permisos", label: "Permisos y licencias", pct: 0.04 },
  { id: "supervision", label: "Supervisión dedicada", pct: 0.06 },
  { id: "prioritaria", label: "Entrega prioritaria", pct: 0.12 },
] as const;

export type ExtraId = (typeof EXTRAS)[number]["id"];

export const fmtMoney = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(n);
