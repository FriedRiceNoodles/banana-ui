/* eslint-env node */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, './src');
const typesDir = path.join(__dirname, './types');
const distDir = path.join(__dirname, './dist');
const nodeDir = path.join(__dirname, './node');

const componentNames = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

// components
for (const component of componentNames) {
  const typePath = `${typesDir}/${component}/index.d.ts`;
  const distPath = `${distDir}/${component}/index.d.ts`;
  const nodePath = `${nodeDir}/${component}/index.d.ts`;
  try {
    fs.copyFileSync(typePath, distPath);
    fs.copyFileSync(typePath, nodePath);
  } catch (error) {
    console.log('copy failed', error);
  }
}

// index
try {
  fs.copyFileSync(`${typesDir}/index.d.ts`, `${distDir}/index.d.ts`);
  fs.copyFileSync(`${typesDir}/index.d.ts`, `${nodeDir}/index.d.ts`);
} catch (error) {
  console.log('copy failed', error);
}
