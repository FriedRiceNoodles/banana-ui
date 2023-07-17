/* eslint-env node */

const fs = require('fs');
const path = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const inquirer = require('inquirer');
const prettier = require('prettier');

const prettierConfig = prettier.resolveConfig.sync(process.cwd());

const createComponent = async () => {
  const checkDirs = ['packages/banana/src', 'packages/banana-react/src', 'docs/example'];

  for (const dir of checkDirs) {
    if (!fs.existsSync(path.resolve(process.cwd(), dir))) {
      console.error(`❌ Directory '${dir}' does not exist, please run the command in the root directory of the project.`);
      process.exit(1);
    }
  }

  const { name, dirs } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      validate: (input) => {
        if (!input) return 'Component name is required.';
        const reg = /^[a-zA-Z][a-zA-Z0-9-]*$/;
        if (reg.test(input)) {
          return true;
        }
        return 'Component name must start with a letter and contain only letters, numbers and dashes.';
      },
      filter: (input) => input.toLowerCase(),
      message: 'Component name:',
    },
    {
      type: 'checkbox',
      name: 'dirs',
      choices: [
        {
          name: 'banana',
          checked: true,
        },
        {
          name: 'banana-react',
          checked: true,
        },
      ],
      validate: (input) => {
        if (input.length < 1) {
          return 'At least one directory must be selected.';
        }
        return true;
      },
      message: 'Select the directory to create:',
    },
  ]);

  for (const dir of checkDirs) {
    const dirPath = path.resolve(process.cwd(), dir, name);
    if (fs.existsSync(dirPath)) {
      console.error(`❌ Directory '${dirPath}' already exists.`);
      process.exit(1);
    }
  }

  if (dirs.includes('banana')) {
    console.log('----------------------------------------');
    console.log('🍌 Creating banana component...');
    console.log('----------------------------------------');

    fs.mkdirSync(path.resolve(process.cwd(), 'packages/banana/src', name));

    const index = require('../templates/banana/index.js')(name);
    const formatted = prettier.format(index, {
      ...prettierConfig,
      parser: 'typescript',
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana/src', name, 'index.ts'), formatted);
    console.log(`✅ Created 'packages/banana/src/${name}/index.ts'`);

    const styles = require('../templates/banana/index.styles.js')(name);
    const formattedStyles = prettier.format(styles, {
      ...prettierConfig,
      parser: 'typescript',
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana/src', name, 'index.styles.ts'), formattedStyles);
    console.log(`✅ Created 'packages/banana/src/${name}/index.styles.ts'`);

    const test = require('../templates/banana/index.test.js')(name);
    const formattedTest = prettier.format(test, {
      ...prettierConfig,
      parser: 'typescript',
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana/src', name, 'index.test.ts'), formattedTest);
    console.log(`✅ Created 'packages/banana/src/${name}/index.test.ts'`);

    const componentNames = fs
      .readdirSync(path.resolve(process.cwd(), 'packages/banana/src'), { withFileTypes: true })
      // filter out which is not a directory or does not have index.ts
      .filter((dirent) => dirent.isDirectory() && fs.existsSync(path.resolve(process.cwd(), 'packages/banana/src', dirent.name, 'index.ts')))
      .map((dirent) => dirent.name);

    const bananaIndex = require('../templates/banana/banana-index.js')(componentNames);
    const formattedBananaIndex = prettier.format(bananaIndex, {
      ...prettierConfig,
      parser: 'typescript',
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana/src/index.ts'), formattedBananaIndex);
    console.log(`✅ Updated 'packages/banana/src/index.ts'`);

    // build after create
    console.log('🚀 Building...');
    require('child_process').execSync('pnpm build', { stdio: 'inherit', cwd: path.resolve(process.cwd(), 'packages/banana') });
    console.log('✅ Build completed.');

    console.log('----------------------------------------');
    console.log('🍌 Banana component created successfully.');
    console.log('----------------------------------------');
  }

  if (dirs.includes('banana-react')) {
    console.log('----------------------------------------');
    console.log('🍌 Creating banana-react component...');
    console.log('----------------------------------------');

    fs.mkdirSync(path.resolve(process.cwd(), 'packages/banana-react/src', name));

    if (dirs.includes('banana')) {
      const index = require('../templates/banana-react/index.js')(name);
      const formatted = prettier.format(index, {
        ...prettierConfig,
        parser: 'typescript',
      });
      fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana-react/src', name, 'index.ts'), formatted);
      console.log(`✅ Created 'packages/banana-react/src/${name}/index.ts'`);
    } else {
      // react-only
      const reactOnly = require('../templates/banana-react/index.react-only.js')(name);
      const formatted = prettier.format(reactOnly, {
        ...prettierConfig,
        parser: 'typescript',
      });
      fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana-react/src', name, 'index.ts'), formatted);
      console.log(`✅ Created 'packages/banana-react/src/${name}/index.ts'`);
    }

    const componentNames = fs
      .readdirSync(path.resolve(process.cwd(), 'packages/banana-react/src'), { withFileTypes: true })
      // filter out which is not a directory or does not have index.ts
      .filter((dirent) => dirent.isDirectory() && fs.existsSync(path.resolve(process.cwd(), 'packages/banana/src', dirent.name, 'index.ts')))
      .map((dirent) => dirent.name);

    const bananaReactIndex = require('../templates/banana-react/banana-react-index.js')(componentNames);
    const formatted = prettier.format(bananaReactIndex, {
      ...prettierConfig,
      parser: 'typescript',
    });
    fs.writeFileSync(path.resolve(process.cwd(), 'packages/banana-react/src/index.ts'), formatted);
    console.log(`✅ Updated 'packages/banana-react/src/index.ts'`);

    // build after create
    console.log('🚀 Building...');
    require('child_process').execSync('pnpm build', { stdio: 'inherit', cwd: path.resolve(process.cwd(), 'packages/banana-react') });
    console.log('✅ Build completed.');

    console.log('----------------------------------------');
    console.log('🍌 Banana-react component created successfully.');
    console.log('----------------------------------------');
  }
  console.log('🎉 All done!');
};

const cli = yargs(hideBin(process.argv));

cli
  .strict()
  .usage('Usage: $0 <command> [options]')
  .command('new', 'Create a new component', () => {}, createComponent).argv;
