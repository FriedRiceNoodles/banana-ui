import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

import forceRender from './scripts/rollup-plugin-force-render.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const packageSrcRoot = path.join(__dirname, './src');
const componentNames = fs
  // 获取所有文件夹及文件
  .readdirSync('./src', { withFileTypes: true })
  // 筛选出所有文件夹
  .filter((p) => p.isDirectory())
  // 数据预处理
  .map((p) => ({
    path: `${p.name}/index`,
    name: p.name,
  }))
  // 带上package/index.ts
  .concat({ path: 'index', name: 'index' });

export default [
  {
    input: './src/index.ts',
    output: {
      dir: './umd',
      format: 'umd',
      name: 'umd',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: './umd',
      }),
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
    ],
  },
  {
    input: componentNames.reduce((result, p) => {
      result[p.path] = `./src/${p.name}`;
      return result;
    }, {}),
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].js',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: './dist',
      }),
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
    ],
  },
];
