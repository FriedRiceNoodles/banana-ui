import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import fs from 'fs';

const babelConfig = {
  babelHelpers: 'bundled',
  presets: ['@babel/preset-env'],
  plugins: [
    // ['@babel/plugin-transform-runtime', { useESModules: true }],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties'],
  ],
  assumptions: {
    setPublicClassFields: true,
  },
  exclude: 'node_modules/**',
};

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
  // 带上package/src/index.ts
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
      babel(babelConfig),
      terser(),
      filesize(),
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
      typescript(),
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
      babel(babelConfig),
      terser(),
    ],
  },
  {
    input: componentNames.reduce((result, p) => {
      result[p.path] = `./src/${p.name}`;
      return result;
    }, {}),
    output: {
      dir: 'node',
      format: 'es',
      entryFileNames: '[name].js',
    },
    plugins: [
      typescript(),
      nodeResolve({
        exportConditions: ['node'],
        extensions: ['.ts', '.js'],
      }),
      commonjs(),
      babel(babelConfig),
    ],
  },
];
