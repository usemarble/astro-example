// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwind from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// https://astro.build/config

export default defineConfig({
  integrations: [sitemap()],
  vite: {
    plugins: [tailwind()],
  },
  site: "https://coconutsinwinter.vercel.app",
  image: {
    domains: ["images.marblecms.com"],
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  experimental: {
    fonts: [
      {
        name: "Literata",
        cssVariable: "--font-literata",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin"],
      },
      {
        name: "Manrope",
        cssVariable: "--font-manrope",
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin"],
      },
      {
        name: "Nova Mono",
        cssVariable: "--font-novamono",
        provider: fontProviders.google(),
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
});
