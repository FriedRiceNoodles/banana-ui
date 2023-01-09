import fs from 'fs';

export default function forceRender() {
  return {
    name: 'force render',
    closeBundle() {
      fs.writeFileSync('../../docs/forceRender.md', String(new Date().getTime()));
    },
  };
}
