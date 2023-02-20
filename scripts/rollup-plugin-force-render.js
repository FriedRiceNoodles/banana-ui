// todo: 升级到2.1.3，将forceRender页面配置为隐藏
// https://github.com/umijs/dumi/issues/1410

import fs from 'fs';

export default function forceRender() {
  return {
    name: 'force render',
    closeBundle() {
      fs.writeFileSync('../../docs/forceRender.md', String(new Date().getTime()));
    },
  };
}
