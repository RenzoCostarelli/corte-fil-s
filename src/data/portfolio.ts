export interface PortfolioItem {
  slug: string;
  name: string;
  category: string;
  year: number;
  roles: string[];
  description: string;
  longDescription: string;
}

export const portfolio: PortfolioItem[] = [
  {
    slug: "proyecto-social-1",
    name: "Proyecto Social 1",
    category: "Social",
    year: 2026,
    roles: ["Dirección", "Edición", "Postproducción"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis aliquam. Vitae perspiciatis ullam culpa, cumque beatae officiis.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis.",
  },
  {
    slug: "proyecto-social-2",
    name: "Proyecto Social 2",
    category: "Social",
    year: 2025,
    roles: ["Dirección", "Fotografía"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis aliquam.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis. Lorem ipsum dolor sit amet consectetur.",
  },
  {
    slug: "videoclip-uno",
    name: "Videoclip Uno",
    category: "Videoclips",
    year: 2026,
    roles: ["Dirección", "Edición", "Color"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae perspiciatis ullam culpa, cumque beatae officiis. Porro vel provident reiciendis aliquam.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla ipsam nam provident reiciendis.",
  },
  {
    slug: "videoclip-dos",
    name: "Videoclip Dos",
    category: "Videoclips",
    year: 2025,
    roles: ["Dirección", "Producción"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum. Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    slug: "campana-publicidad-1",
    name: "Campaña Publicidad 1",
    category: "Publicidad",
    year: 2026,
    roles: ["Dirección", "Edición", "Postproducción", "Color"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis aliquam.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam.",
  },
  {
    slug: "campana-publicidad-2",
    name: "Campaña Publicidad 2",
    category: "Publicidad",
    year: 2025,
    roles: ["Dirección", "Fotografía", "Edición"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae perspiciatis ullam culpa, cumque beatae officiis. Porro vel.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis. Lorem ipsum dolor sit amet.",
  },
  {
    slug: "proyecto-institucional",
    name: "Proyecto Institucional",
    category: "Institucional",
    year: 2025,
    roles: ["Dirección", "Edición"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum, nulla ipsam nam provident reiciendis.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga earum nulla ipsam.",
  },
  {
    slug: "proyecto-corporativo",
    name: "Proyecto Corporativo",
    category: "Corporativo",
    year: 2024,
    roles: ["Dirección", "Producción", "Edición", "Postproducción"],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae perspiciatis ullam culpa, cumque beatae officiis. Animi totam facilis necessitatibus nostrum.",
    longDescription:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi totam facilis necessitatibus nostrum, fuga earum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla ipsam nam provident reiciendis aliquam.",
  },
];
