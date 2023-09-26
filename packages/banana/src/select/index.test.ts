import { expect, fixture, html } from '@open-wc/testing';
import BSelect from '.';
import sinon from 'sinon';

describe('b-select', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BSelect>(html`<b-select></b-select>`);
    await expect(element).to.be.accessible();
  });

  describe('form', () => {
    it('a native form should be able to get the value of select', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-select name="test" value="test"></b-select>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal('test');
    });

    it('should not submit the form when a required select is empty', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" required></b-select>
      </form>`);
      const select = element.querySelector('b-select') as BSelect;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.called).to.equal(false);

      // Then make it not empty then submit the form.
      select.value = 'test';
      element.requestSubmit();

      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled select should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" disabled value="test"></b-select>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required select is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" required disabled></b-select>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required select is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-select name="test" required></b-select>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-select name="test" value="test" default-value="default"></b-select>
      </form>`);
      const select = element.querySelector('b-select') as BSelect;

      expect(select.value).to.equal('test');

      element.reset();
      expect(select.value).to.equal('default');
    });
  });
});
