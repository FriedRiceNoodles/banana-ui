import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BDropdown from '.';
describe('b-dropdown', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BDropdown>(html`
      <b-dropdown>
        <b-button>Banana</b-button>
        <b-menu slot="drop">
          <b-menu-item>Option 1</b-menu-item>
          <b-menu-item>Option 2</b-menu-item>
          <b-menu-item>Option 3</b-menu-item>
          <b-divider></b-divider>
          <b-menu-item>Option A</b-menu-item>
          <b-menu-item>Option B</b-menu-item>
        </b-menu>
      </b-dropdown>
    `);
    await expect(element).to.be.accessible();
  });

  it('should open the dropdown when mouse enter the trigger after mouseEnterDelay', async () => {
    const element = await fixture<BDropdown>(html`
      <b-dropdown mouse-enter-delay="200">
        <b-button>Banana</b-button>
        <b-menu slot="drop">
          <b-menu-item>Option 1</b-menu-item>
          <b-menu-item>Option 2</b-menu-item>
          <b-menu-item>Option 3</b-menu-item>
          <b-divider></b-divider>
          <b-menu-item>Option A</b-menu-item>
          <b-menu-item>Option B</b-menu-item>
        </b-menu>
      </b-dropdown>
    `);
    const trigger = element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement;

    expect(element.open).to.equal(false);
    // Mouse enter the dropdown trigger.

    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await aTimeout(100);
    expect(element.open).to.equal(false);
    await aTimeout(100);
    expect(element.open).to.equal(true);
  });

  it('should close the dropdown when mouse leave the dropdown content after mouseLeaveDelay', async () => {
    const element = await fixture<BDropdown>(html`
      <b-dropdown mouse-leave-delay="200">
        <b-button>Banana</b-button>
        <b-menu slot="drop">
          <b-menu-item>Option 1</b-menu-item>
          <b-menu-item>Option 2</b-menu-item>
          <b-menu-item>Option 3</b-menu-item>
          <b-divider></b-divider>
          <b-menu-item>Option A</b-menu-item>
          <b-menu-item>Option B</b-menu-item>
        </b-menu>
      </b-dropdown>
    `);
    const trigger = element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement;
    const content = element.shadowRoot?.querySelector('.dropdown__content') as HTMLElement;

    expect(element.open).to.equal(false);
    // Mouse enter the dropdown trigger.
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await aTimeout(100);
    expect(element.open).to.equal(true);
    // Mouse leave the dropdown content.
    content.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await aTimeout(100);
    expect(element.open).to.equal(true);
    await aTimeout(100);
    expect(element.open).to.equal(false);
  });

  describe('when triggerAction is click', () => {
    it('should open the dropdown when click the trigger', async () => {
      const element = await fixture<BDropdown>(html`
        <b-dropdown trigger-action="click">
          <b-button>Banana</b-button>
          <b-menu slot="drop">
            <b-menu-item>Option 1</b-menu-item>
            <b-menu-item>Option 2</b-menu-item>
            <b-menu-item>Option 3</b-menu-item>
            <b-divider></b-divider>
            <b-menu-item>Option A</b-menu-item>
            <b-menu-item>Option B</b-menu-item>
          </b-menu>
        </b-dropdown>
      `);
      const trigger = element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement;
      const content = element.shadowRoot?.querySelector('.dropdown__content') as HTMLElement;

      expect(element.open).to.equal(false);
      // Click the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(element.open).to.equal(true);

      // Click the dropdown trigger again, the dropdown should be closed.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(element.open).to.equal(false);

      // Make it open.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      // Click the content of the dropdown, the dropdown should not be closed.
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(element.open).to.equal(true);

      // Click the outside of the dropdown, the dropdown should be closed.
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(element.open).to.equal(false);
    });

    it('should doing nothing when mouse enter the trigger', async () => {
      const element = await fixture<BDropdown>(html`
        <b-dropdown trigger-action="click">
          <b-button>Banana</b-button>
          <b-menu slot="drop">
            <b-menu-item>Option 1</b-menu-item>
            <b-menu-item>Option 2</b-menu-item>
            <b-menu-item>Option 3</b-menu-item>
            <b-divider></b-divider>
            <b-menu-item>Option A</b-menu-item>
            <b-menu-item>Option B</b-menu-item>
          </b-menu>
        </b-dropdown>
      `);
      const trigger = element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement;
      const content = element.shadowRoot?.querySelector('.dropdown__content') as HTMLElement;

      expect(element.open).to.equal(false);
      // Mouse enter the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      expect(element.open).to.equal(false);

      // Click the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(element.open).to.equal(true);

      // Should not close the dropdown when mouse leave the dropdown content.
      content.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      expect(element.open).to.equal(true);
    });
  });

  describe('when keydown', () => {
    it('should open the dropdown when press Enter', async () => {
      const element = await fixture<BDropdown>(html`
        <b-dropdown trigger-action="click">
          <b-button>Banana</b-button>
          <b-menu slot="drop">
            <b-menu-item>Option 1</b-menu-item>
            <b-menu-item>Option 2</b-menu-item>
            <b-menu-item>Option 3</b-menu-item>
            <b-divider></b-divider>
            <b-menu-item>Option A</b-menu-item>
            <b-menu-item>Option B</b-menu-item>
          </b-menu>
        </b-dropdown>
      `);
      const triggerElement = (
        element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement
      ).assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);

      // Focus the dropdown trigger.
      triggerElement.focus();
      await sendKeys({ press: 'Enter' });
      expect(element.open).to.equal(true);
    });

    it('should close the dropdown when press Escape', async () => {
      const element = await fixture<BDropdown>(html`
        <b-dropdown trigger-action="click">
          <b-button>Banana</b-button>
          <b-menu slot="drop">
            <b-menu-item>Option 1</b-menu-item>
            <b-menu-item>Option 2</b-menu-item>
            <b-menu-item>Option 3</b-menu-item>
            <b-divider></b-divider>
            <b-menu-item>Option A</b-menu-item>
            <b-menu-item>Option B</b-menu-item>
          </b-menu>
        </b-dropdown>
      `);
      const triggerElement = (
        element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement
      ).assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);

      // Focus the dropdown trigger.
      triggerElement.focus();
      await sendKeys({ press: 'Enter' });
      expect(element.open).to.equal(true);
      // Press Escape.
      await sendKeys({ press: 'Escape' });
      expect(element.open).to.equal(false);
    });

    it('should open or close the dropdown when press Space', async () => {
      const element = await fixture<BDropdown>(html`
        <b-dropdown trigger-action="click">
          <b-button>Banana</b-button>
          <b-menu slot="drop">
            <b-menu-item>Option 1</b-menu-item>
            <b-menu-item>Option 2</b-menu-item>
            <b-menu-item>Option 3</b-menu-item>
            <b-divider></b-divider>
            <b-menu-item>Option A</b-menu-item>
            <b-menu-item>Option B</b-menu-item>
          </b-menu>
        </b-dropdown>
      `);

      const triggerElement = (
        element.shadowRoot?.querySelector('.dropdown__trigger') as HTMLSlotElement
      ).assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);

      // Focus the dropdown trigger.
      triggerElement.focus();
      await sendKeys({ press: 'Space' });
      expect(element.open).to.equal(true);
      // Press Space.
      await sendKeys({ press: 'Space' });
      expect(element.open).to.equal(false);
    });
  });
});
