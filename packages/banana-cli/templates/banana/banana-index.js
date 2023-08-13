/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const template = (componentNames) => {
  const importStr = componentNames.map((name) => `import B${toCamelCase(name)} from './${name}';`).join('\n');
  const exportStr = componentNames.map((name) => `B${toCamelCase(name)},`).join('\n');
  return `${importStr}\n\nexport {\n${exportStr}\n};`;
};

module.exports = template;
