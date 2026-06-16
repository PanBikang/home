// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// Output to ./docs so GitHub Pages can serve from the `/docs` folder
// of the main branch — no GitHub Actions, just `npm run build` + git push.
export default defineConfig({
  site: 'https://panbikang.github.io',
  base: '/home',
  outDir: './docs',
  vite: {
    plugins: [yaml()],
  },
});
