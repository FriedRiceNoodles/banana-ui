import shell from 'shelljs';

export default function runTSC() {
  return {
    name: 'run tsc',
    closeBundle() {
      shell.exec('npm run tsc');
    },
  };
}
