import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

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
    report: true,
    reportDir: 'coverage',
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    // playwrightLauncher({ product: 'webkit' }),
  ],
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
