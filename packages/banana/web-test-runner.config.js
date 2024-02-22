import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import process from 'node:process';

const browsers = process.env.CI
  ? [playwrightLauncher({ product: 'chromium' })]
  : [playwrightLauncher({ product: 'chromium' }), playwrightLauncher({ product: 'firefox' })];

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  concurrentBrowsers: 3,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto',
    }),
  ],
  coverage: true,
  coverageConfig: {
    include: ['dist/**/*'],
    report: true,
    reportDir: 'coverage',
    reporters: ['cobertura', 'lcov'],
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  browsers,
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <script type="module" src="./dist/index.js"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};
