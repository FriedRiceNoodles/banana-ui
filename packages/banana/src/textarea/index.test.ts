import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BTextarea from '.';

describe('b-textarea', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTextarea>(html`<b-textarea></b-textarea>`);
    await expect(element).to.be.accessible();
  });

  describe('form', () => {
    it('a native form should be able to get the value of textarea', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-textarea name="test" value="test"></b-textarea>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal('test');
    });

    it('should not submit the form when a required textarea is empty', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-textarea name="test" required></b-textarea>
      </form>`);
      const Textarea = element.querySelector('b-textarea') as BTextarea;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.called).to.equal(false);

      // Then make it not empty then submit the form.
      Textarea.value = 'test';
      element.requestSubmit();

      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled textarea should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-textarea name="test" disabled value="test"></b-textarea>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required textarea is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-textarea name="test" required disabled></b-textarea>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required textarea is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-textarea name="test" required></b-textarea>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-textarea name="test" value="test" default-value="default"></b-textarea>
      </form>`);
      const Textarea = element.querySelector('b-textarea') as BTextarea;

      expect(Textarea.value).to.equal('test');

      element.reset();
      expect(Textarea.value).to.equal('default');
    });
  });
});
