import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import process from 'process';
import filesize from 'rollup-plugin-filesize';

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
  extensions: ['.ts', '.js'],
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

// 获取包名(当前所在的文件夹名)并转换成大驼峰
const UMDName = process
  .cwd()
  .split('/')
  .pop()
  .replace(/(^|-)(\w)/g, (_, _$1, $2) => $2.toUpperCase());

const rollupConfig = [
  {
    input: './src/index.ts',
    output: {
      dir: './umd',
      format: 'umd',
      name: UMDName,
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

// 如果存在./src/autoloader.ts，则添加到rollupConfig中
if (fs.existsSync('./src/banana-autoloader.ts')) {
  rollupConfig.push({
    input: './src/banana-autoloader.ts',
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'banana-autoloader.js',
    },
    plugins: [
      typescript(),
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
    ],
  });
}

export default rollupConfig;
