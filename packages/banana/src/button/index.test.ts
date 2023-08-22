import { expect, fixture, html } from '@open-wc/testing';
import * as sinon from 'sinon';
import BButton from '.';

const types: BButton['type'][] = ['default', 'primary', 'success', 'warning', 'danger', 'dashed'];

describe('b-button', () => {
  describe('accessibility tests', () => {
    types.forEach((type) => {
      // Orange is too difficult to meet the high contrast rule...
      const ignoredRules = type === 'warning' ? ['color-contrast'] : [];

      it(`should be accessible when type is "${type}"`, async () => {
        const element = await fixture<BButton>(html` <b-button type=${type}> Banana </b-button> `);
        await expect(element).to.be.accessible({ ignoredRules });
      });
    });
  });

  describe('when provided no parameters', () => {
    it('passes accessibility test', async () => {
      const element = await fixture<BButton>(html` <b-button> Banana </b-button> `);
      await expect(element).to.be.accessible();
    });

    it('default values are set correctly', async () => {
      const element = await fixture<BButton>(html` <b-button> Banana </b-button> `);

      expect(element.type).to.equal('default');
      expect(element.size).to.equal('medium');
      expect(element.disabled).to.equal(false);
      expect(element.pill).to.equal(false);
      expect(element.outline).to.equal(false);
      expect(element.loading).to.equal(false);
    });

    it('should render a <button>', async () => {
      const element = await fixture<BButton>(html` <b-button> Banana </b-button> `);
      expect(element.shadowRoot!.querySelector('button')).to.exist;
    });

    it('should not have a loading child node', async () => {
      const element = await fixture<BButton>(html` <b-button> Banana </b-button> `);
      expect(element.shadowRoot!.querySelector('.button__loading')).not.to.exist;
    });
  });

  describe('when disabled', () => {
    it('should disable the native <button> when rendering a <button>', async () => {
      const el = await fixture<BButton>(html` <b-button disabled> Banana </b-button> `);
      expect(el.shadowRoot!.querySelector('button[disabled]')).to.exist;
    });

    it('should not bubble up clicks', async () => {
      const button = await fixture<BButton>(html` <b-button disabled> Banana </b-button> `);
      const handleClick = sinon.spy();
      button.addEventListener('click', handleClick);
      button.click();

      expect(handleClick).not.to.have.been.called;

      button.shadowRoot!.querySelector('button')!.click();
      expect(handleClick).not.to.have.been.called;
    });
  });

  describe('when loading', () => {
    it('should have a loading child node', async () => {
      const element = await fixture<BButton>(html` <b-button loading> Banana </b-button> `);
      expect(element.shadowRoot!.querySelector('.button__loading')).to.exist;
    });
  });

  describe('when provided the block attribute', () => {
    it('should render a block button', async () => {
      const element = await fixture<BButton>(html` <b-button block> Banana </b-button> `);
      expect(element.shadowRoot!.querySelector('.button--block')).to.exist;
      expect(getComputedStyle(element).display).to.equal('block');
    });
  });
});
