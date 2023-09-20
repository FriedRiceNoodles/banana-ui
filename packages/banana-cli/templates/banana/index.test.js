/* eslint-env node */

const toCamelCase = require('../toCamelCase');

const formTest = (componentName) => {
  return `
    describe('form', () => {
      it('a native form should be able to get the value of ${componentName}', async () => {
        const element = await fixture<HTMLFormElement>(html\`<form>
          <b-${componentName} name="test" value="test"></b-${componentName}>
        </form>\`);

        // Should get correct form data.
        const formData = new FormData(element);
        expect(formData.get('test')).to.equal('test');
      });

      it('should not submit the form when a required ${componentName} is empty', async () => {
        const element = await fixture<HTMLFormElement>(html\`<form
          @submit=\${(event: Event) => {
            event.preventDefault();
          }}
        >
          <b-${componentName} name="test" required></b-${componentName}>
        </form>\`);
        const ${componentName} = element.querySelector('b-${componentName}') as B${toCamelCase(componentName)};
        const spy = sinon.spy();
        element.addEventListener('submit', spy);

        element.requestSubmit();
        expect(spy.called).to.equal(false);

        // Then make it not empty then submit the form.
        ${componentName}.value = 'test';
        element.requestSubmit();

        // It should submit the form now.
        expect(spy.calledOnce).to.equal(true);
      });

      it('a disabled ${componentName} should not be a part of the form data, even if it has a name', async () => {
        const element = await fixture<HTMLFormElement>(html\`<form
          @submit=\${(event: Event) => {
            event.preventDefault();
          }}
        >
          <b-${componentName} name="test" disabled value="test"></b-${componentName}>
        </form>\`);

        // Should get correct form data.
        const formData = new FormData(element);
        expect(formData.get('test')).to.equal(null);
      });

      it('should be valid and submit the form when a empty required ${componentName} is disabled', async () => {
        const element = await fixture<HTMLFormElement>(html\`<form
          @submit=\${(event: Event) => {
            event.preventDefault();
          }}
        >
          <b-${componentName} name="test" required disabled></b-${componentName}>
        </form>\`);
        const spy = sinon.spy();
        element.addEventListener('submit', spy);

        element.requestSubmit();
        expect(spy.calledOnce).to.equal(true);
      });

      it('should be valid and submit the form when a required ${componentName} is empty and the form is novaalidate', async () => {
        const element = await fixture<HTMLFormElement>(html\`<form
          novalidate
          @submit=\${(event: Event) => {
            event.preventDefault();
          }}
        >
          <b-${componentName} name="test" required></b-${componentName}>
        </form>\`);
        const spy = sinon.spy();
        element.addEventListener('submit', spy);

        element.requestSubmit();
        expect(spy.calledOnce).to.equal(true);
      });

      it('should become the default value when the form is reset', async () => {
        const element = await fixture<HTMLFormElement>(html\`<form>
          <b-${componentName} name="test" value="test" default-value="default"></b-${componentName}>
        </form>\`);
        const ${componentName} = element.querySelector('b-${componentName}') as B${toCamelCase(componentName)};

        expect(${componentName}.value).to.equal('test');

        element.reset();
        expect(${componentName}.value).to.equal('default');
      });
    });
  `;
};

const template = (componentName, formField) => `import { expect, fixture, html } from '@open-wc/testing';
import B${toCamelCase(componentName)} from '.';
${formField ? "import sinon from 'sinon';" : ''}

describe('b-${componentName}', () => {
  it('accessibility tests', async () => {
    const element = await fixture<B${toCamelCase(componentName)}>(html\`<b-${componentName}></b-${componentName}>\`);
    await expect(element).to.be.accessible();
  });

  ${formField ? formTest(componentName) : ''}
});
`;

module.exports = template;
