export interface PortfolioItem {
  slug: string;
  name: string;
  category: string;
  client?: string;
  year: number;
  thumbnail?: string;
  roles: string[];
  description: string;
  longDescription: string;
}

export const portfolio: PortfolioItem[] = [
  {
    slug: "grupo-crriolani",
    name: "Grupo Criolani",
    category: "Institucional",
    client: "Grupo Criolani",
    year: 2025,
    roles: ["Guión", "Dirección", "Edición"],
    thumbnail:
      "https://res.cloudinary.com/dkgnaegp9/image/upload/v1780081150/Criolani_rpy1ga.png",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis aliquam. Vitae perspiciatis ullam culpa, cumque beatae officiis.",
    longDescription:
      "Realizamos este video institucional para Grupo Criolani, una de las concesionarias de maquinaria agrícola más importantes del país, con 6 sucursales en 3 provincias. Trabajamos en el guión junto a representantes del área comercial y marketing de la empresa buscando destacar el tamaño, la trayectoria y la calidad del servicio a través de la historia familiar. Al equipo se sumaron Baltazar Lamas, Andrés Picech y Calfú Martinez.",
  },
  {
    slug: "plaza-club",
    name: "Todos somos fundadores",
    category: "Institucional",
    client: "Plaza Club",
    year: 2025,
    roles: ["Dirección de fotografía", "Edición"],
    thumbnail:
      "https://res.cloudinary.com/dkgnaegp9/image/upload/v1780081150/Captura_l1yigu.png",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis aliquam.",
    longDescription:
      "Video realizado para comunicación interna del club. Nos encomendaron este video para contarle a los socios del club sobre la construcción de un “kinder” en el predio. La idea del cliente era generar un video emotivo, haciendo hincapié en la historia y los valores del club. Guionado y dirigido por Juan Mangiantini. Baltazar Lamas en cámara.",
  },
];
