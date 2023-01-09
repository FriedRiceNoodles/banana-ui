import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'banana-ui',
  },
  alias: {
    // 'banana-ui': '/packages/banana'
  },
  // extraBabelIncludes: [
  //   /@banana/
  // ]
  resolve: {
    atomDirs: [{ type: 'component', dir: 'node_modules/@banana/banana-react/dist' }],
  },
  // babelLoaderCustomize: {
  //   setPublicClassFields: true,
  // },
});
