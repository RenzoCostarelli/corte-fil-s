// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Akira Expanded",
      cssVariable: "--font-akira",
      options: {
        variants: [
          {
            weight: "400",
            style: "normal",
            src: ["./src/assets/fonts/AkiraExpanded.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Univers LT Std Extended",
      cssVariable: "--font-univers-ex",
      options: {
        variants: [
          {
            weight: "400",
            style: "normal",
            src: ["./src/assets/fonts/UniversLTStd-Ex.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Univers LT Std Extended Oblique",
      cssVariable: "--font-univers-ex-obl",
      options: {
        variants: [
          {
            weight: "400",
            style: "oblique",
            src: ["./src/assets/fonts/UniversLTStd-ExObl.woff2"],
          },
        ],
      },
    },
  ],
  image: {
    domains: ["images.prismic.io", "corte-films.cdn.prismic.io"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
