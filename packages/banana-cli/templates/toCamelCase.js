/* eslint-env node */

// 首字母也大写的驼峰命名,兼顾数字
const toCamelCase = (str) => {
  return str.replace(/(^|-)(\w)/g, (_all, _$1, $2) => {
    return $2.toUpperCase();
  });
};

module.exports = toCamelCase;
