import { defineConfig } from "astro/config";

// https://astro.build/config
import netlify from "@astrojs/netlify/edge-functions";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
});
