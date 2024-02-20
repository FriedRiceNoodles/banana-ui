import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Banana UI',
    footer: false,
    socialLinks: {
      github: 'https://github.com/FriedRiceNoodles/banana-ui',
    },
  },
  publicPath: '/banana-ui/',
  base: '/banana-ui/',
});
