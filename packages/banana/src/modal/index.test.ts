import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import BModal from '.';
import type BButton from '../button';
import type BOverlay from '../overlay';

describe('b-modal', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BModal>(html`
      <b-modal open>
        <p>Modal content</p>
        <p>Modal content</p>
        <p>Modal content</p>
      </b-modal>
    `);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BModal>(html`<b-modal></b-modal>`);
    const overlay = element.shadowRoot?.querySelector('b-overlay') as BOverlay;
    const defaultSlot = element.shadowRoot?.querySelector('slot');

    expect(element.open).to.equal(false);
    expect(element.hasAttribute('open')).to.equal(false);
    expect(element.title).to.equal('');
    expect(element.width).to.equal(undefined);
    expect(element.okText).to.equal('OK');
    expect(element.cancelText).to.equal('Cancel');
    expect(element.okButtonDisabled).to.equal(false);
    expect(element.cancelButtonDisabled).to.equal(false);
    expect(element.okButtonLoading).to.equal(false);
    expect(element.cancelButtonLoading).to.equal(false);
    expect(element.okButtonHidden).to.equal(false);
    expect(element.cancelButtonHidden).to.equal(false);
    expect(element.footerHidden).to.equal(false);

    expect(overlay?.open).to.equal(false);
    expect(defaultSlot?.assignedElements().length).to.equal(0);
  });
});

describe('slots', () => {
  it('should render the default slot', async () => {
    const element = await fixture<BModal>(html`
      <b-modal open>
        <p>Modal content</p>
        <p>Modal content</p>
        <p>Modal content</p>
      </b-modal>
    `);
    const defaultSlot = element.shadowRoot?.querySelector('div[part="content"] slot') as HTMLSlotElement;

    const assignedElements = defaultSlot?.assignedElements();
    expect(assignedElements.length).to.equal(3);
    expect(assignedElements[0].textContent).to.equal('Modal content');
    expect(assignedElements[1].textContent).to.equal('Modal content');
    expect(assignedElements[2].textContent).to.equal('Modal content');
  });

  it('should render the title slot', async () => {
    const element = await fixture<BModal>(html`
      <b-modal open>
        <p slot="title">Modal title</p>
        <p>Modal content</p>
        <p>Modal content</p>
      </b-modal>
    `);
    const titleSlot = element.shadowRoot?.querySelector('slot[name="title"]') as HTMLSlotElement;

    expect(titleSlot.assignedElements().length).to.equal(1);
    expect(titleSlot.assignedElements()[0].textContent).to.equal('Modal title');
  });

  it('should render the footer slot', async () => {
    const element = await fixture<BModal>(html`
      <b-modal open>
        <p>Modal content</p>
        <p>Modal content</p>
        <p slot="footer">Modal footer</p>
      </b-modal>
    `);
    const footerSlot = element.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;

    expect(footerSlot.assignedElements().length).to.equal(1);
    expect(footerSlot.assignedElements()[0].textContent).to.equal('Modal footer');
  });

  it('should render the closeIcon slot', async () => {
    const element = await fixture<BModal>(html`
      <b-modal open>
        <p>Modal content</p>
        <p>Modal content</p>
        <p slot="closeIcon">CLOSE</p>
      </b-modal>
    `);
    const iconSlot = element.shadowRoot?.querySelector('slot[name="closeIcon"]') as HTMLSlotElement;

    expect(iconSlot.assignedElements().length).to.equal(1);
    expect(iconSlot.assignedElements()[0].textContent).to.equal('CLOSE');
  });
});

describe('custom width', () => {
  it('should set the width when provided a number', async () => {
    const element = await fixture<BModal>(html`<b-modal width="300"></b-modal>`);
    const container = element.shadowRoot?.querySelector('.modal');
    const width = window.getComputedStyle(element).getPropertyValue('--banana-modal-width');
    expect(width).to.equal('300px');

    const actualWidth = window.getComputedStyle(container!).width;
    expect(actualWidth).to.equal('300px');
  });

  it('should set the width when provided a string', async () => {
    const element = await fixture<BModal>(html`<b-modal width="300px"></b-modal>`);
    const container = element.shadowRoot?.querySelector('.modal');
    const width = window.getComputedStyle(element).getPropertyValue('--banana-modal-width');
    expect(width).to.equal('300px');

    const actualWidth = window.getComputedStyle(container!).width;
    expect(actualWidth).to.equal('300px');
  });

  it('should set the width when using css variables', async () => {
    const element = await fixture<BModal>(html`<b-modal style="--banana-modal-width: 300px"></b-modal>`);
    const container = element.shadowRoot?.querySelector('.modal');
    const width = window.getComputedStyle(element).getPropertyValue('--banana-modal-width');
    expect(width).to.equal('300px');

    const actualWidth = window.getComputedStyle(container!).width;
    expect(actualWidth).to.equal('300px');
  });
});

describe('custom buttons text', () => {
  it('should set the ok text when provided a string', async () => {
    const element = await fixture<BModal>(html`<b-modal ok-text="Accept"></b-modal>`);
    const okButton = element.shadowRoot?.querySelector('.modal__footer b-button:last-child');
    expect(okButton?.textContent?.trim()).to.equal('Accept');
  });

  it('should set the cancel text when provided a string', async () => {
    const element = await fixture<BModal>(html`<b-modal cancel-text="Reject"></b-modal>`);
    const cancelButton = element.shadowRoot?.querySelector('.modal__footer b-button');
    expect(cancelButton?.textContent?.trim()).to.equal('Reject');
  });
});

describe('custom buttons status', () => {
  it('should set the ok button disabled when provided a boolean', async () => {
    const element = await fixture<BModal>(html`<b-modal ok-button-disabled></b-modal>`);
    const okButton = element.shadowRoot?.querySelector('.modal__footer b-button:last-child') as BButton;
    expect(okButton.disabled).to.equal(true);
  });

  it('should set the cancel button disabled when provided a boolean', async () => {
    const element = await fixture<BModal>(html`<b-modal cancel-button-disabled></b-modal>`);
    const cancelButton = element.shadowRoot?.querySelector('.modal__footer b-button') as BButton;
    expect(cancelButton.disabled).to.equal(true);
  });

  it('should set the ok button loading when provided a boolean', async () => {
    const element = await fixture<BModal>(html`<b-modal ok-button-loading></b-modal>`);
    const okButton = element.shadowRoot?.querySelector('.modal__footer b-button:last-child') as BButton;
    expect(okButton.loading).to.equal(true);
  });

  it('should set the cancel button loading when provided a boolean', async () => {
    const element = await fixture<BModal>(html`<b-modal cancel-button-loading></b-modal>`);
    const cancelButton = element.shadowRoot?.querySelector('.modal__footer b-button') as BButton;
    expect(cancelButton.loading).to.equal(true);
  });

  it('should set the ok button hidden when provided a boolean', async () => {
    const element = await fixture<BModal>(html`<b-modal ok-button-hidden></b-modal>`);
    const okButton = element.shadowRoot?.querySelector('.modal__footer b-button:last-child') as BButton;
    expect(okButton.hidden).to.equal(true);
  });

  it('should set the cancel button hidden when provided a boolean', async () => {
    const element = await fixture<BModal>(html`<b-modal cancel-button-hidden></b-modal>`);
    const cancelButton = element.shadowRoot?.querySelector('.modal__footer b-button') as BButton;
    expect(cancelButton.hidden).to.equal(true);
  });
});

describe('title', () => {
  it('should set the title when provided a string', async () => {
    const element = await fixture<BModal>(html`<b-modal title="Modal title"></b-modal>`);
    const title = element.shadowRoot?.querySelector('.modal__title-default');
    expect(title?.textContent).to.equal('Modal title');
  });

  it('should hide the title when not provided', async () => {
    const element = await fixture<BModal>(html`<b-modal></b-modal>`);
    const title = element.shadowRoot?.querySelector('.modal__title-default') as HTMLElement;
    expect(title.hidden).to.equal(true);
  });
});

describe('footer', () => {
  it('should show the footer by default', async () => {
    const element = await fixture<BModal>(html`<b-modal></b-modal>`);
    const footer = element.shadowRoot?.querySelector('.modal__footer') as HTMLElement;
    expect(footer.hidden).to.equal(false);
  });

  it('should hide the footer when provided footer-hidden', async () => {
    const element = await fixture<BModal>(html`<b-modal footer-hidden></b-modal>`);
    const footer = element.shadowRoot?.querySelector('.modal__footer') as HTMLElement;
    expect(footer.hidden).to.equal(true);
  });
});

describe('callbacks', () => {
  it('should call the ok callback when clicking the ok button', async () => {
    const element = await fixture<BModal>(html`<b-modal open></b-modal>`);
    const okButton = element.shadowRoot?.querySelector('.modal__footer b-button:last-child') as BButton;
    const okSpy = sinon.spy();
    element.addEventListener('ok', okSpy);
    okButton.click();
    expect(okSpy).to.have.been.calledOnce;
  });

  it('should call the cancel callback when clicking the cancel button', async () => {
    const element = await fixture<BModal>(html`<b-modal open></b-modal>`);
    const cancelButton = element.shadowRoot?.querySelector('.modal__footer b-button') as BButton;
    const cancelSpy = sinon.spy();
    element.addEventListener('cancel', cancelSpy);
    cancelButton.click();
    expect(cancelSpy).to.have.been.calledOnce;
  });
});
