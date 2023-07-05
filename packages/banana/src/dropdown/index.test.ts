import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
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
      <b-dropdown mouseEnterDelay="200">
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
    expect(element.open).to.equal(false);
    // Mouse enter the dropdown trigger.
    await sendMouse({ type: 'move', position: [20, 20] });
    await aTimeout(100);
    expect(element.open).to.equal(false);
    await aTimeout(100);
    expect(element.open).to.equal(true);
  });

  it('should close the dropdown when mouse leave the dropdown content after mouseLeaveDelay', async () => {
    const element = await fixture<BDropdown>(html`
      <b-dropdown mouseLeaveDelay="200">
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
    expect(element.open).to.equal(false);
    // Mouse enter the dropdown trigger.
    await sendMouse({ type: 'move', position: [20, 20] });
    await aTimeout(100);
    expect(element.open).to.equal(true);
    // Mouse leave the dropdown content.
    await sendMouse({ type: 'move', position: [0, 0] });
    await aTimeout(100);
    expect(element.open).to.equal(true);
    await aTimeout(100);
    expect(element.open).to.equal(false);
  });

  it('should not open the dropdown when mouse enter the trigger if disabled', async () => {
    const element = await fixture<BDropdown>(html`
      <b-dropdown disabled>
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
    expect(element.open).to.equal(false);
    // Mouse enter the dropdown trigger.
    await sendMouse({ type: 'move', position: [20, 20] });
    await aTimeout(100);
    expect(element.open).to.equal(false);
  });
});
