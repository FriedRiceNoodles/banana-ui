import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import BTooltip from '.';

describe('b-tooltip', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BTooltip>(html`<b-tooltip></b-tooltip>`);
    await expect(element).to.be.accessible();
  });

  describe('when provided no parameters', async () => {
    const element = await fixture<BTooltip>(html`<b-tooltip></b-tooltip>`);

    it('should have correct default values', () => {
      expect(element.content).to.equal('');
      expect(element.placement).to.equal('top');
      expect(element.disableAutoAdjustOverflow).to.equal(false);
      expect(element.maxWidth).to.equal(undefined);
      expect(element.backgroundColor).to.equal(undefined);
      expect(element.margin).to.equal(8);
      expect(element.mouseEnterDelay).to.equal(100);
      expect(element.mouseLeaveDelay).to.equal(100);
      expect(element.triggerAction).to.equal('hover');
      expect(element.noArrow).to.equal(false);
    });

    it('trigger should be empty and the content should be hidden', () => {
      expect(
        (element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement).assignedElements()[0],
      ).to.equal(undefined);
      expect((element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement)!.hidden).to.equal(true);
    });
  });

  describe('when provided parameters', async () => {
    const element = await fixture<BTooltip>(
      html`
        <b-tooltip
          content="test"
          placement="bottomLeft"
          disable-auto-adjust-overflow
          max-width="100px"
          background-color="red"
          margin="10"
          mouse-enter-delay="200"
          mouse-leave-delay="200"
          trigger-action="click"
          no-arrow
        >
          <button>Test</button>
        </b-tooltip>
      `,
    );

    it('should have correct values', () => {
      expect(element.content).to.equal('test');
      expect(element.placement).to.equal('bottomLeft');
      expect(element.disableAutoAdjustOverflow).to.equal(true);
      expect(element.maxWidth).to.equal('100px');
      expect(element.backgroundColor).to.equal('red');
      expect(element.margin).to.equal(10);
      expect(element.mouseEnterDelay).to.equal(200);
      expect(element.mouseLeaveDelay).to.equal(200);
      expect(element.triggerAction).to.equal('click');
      expect(element.noArrow).to.equal(true);
    });

    it('trigger should have a button and the content should be hidden(because it is not triggered)', () => {
      expect(
        (element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement).assignedElements()[0].outerHTML,
      ).to.equal('<button tabindex="0">Test</button>');
      expect((element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement)!.hidden).to.equal(true);
    });
  });

  describe('when trigger is hovered', () => {
    it('should show the content when mouse enter the trigger after mouseEnterDelay', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" mouse-enter-delay="200" mouse-leave-delay="200">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(false);
      // Mouse enter the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(false);
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // should not hide the content when mouse leave the trigger and enter the content
      const content = element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      content.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(200);
      expect(element.open).to.equal(true);
    });

    it('should hide the content when mouse leave the trigger after mouseLeaveDelay', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" mouse-enter-delay="200" mouse-leave-delay="200">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(false);
      // Mouse enter the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(false);
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // Mouse leave the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
      await aTimeout(100);
      expect(element.open).to.equal(false);

      // should hide the content when mouse leave the content
      const content = element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
      // make sure the content is open
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(200);
      expect(element.open).to.equal(true);
      // mouse leave the content
      content.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
      await aTimeout(100);
      expect(element.open).to.equal(false);
    });
  });

  describe('when triggerAction is click', () => {
    it('should not show the content when mouse enter the trigger and should not hide the content when mouse leave the trigger or content', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(false);
      // Mouse enter the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(false);

      // Make the content open
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // Mouse leave the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // Mouse leave the dropdown content.
      const content = element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
      content.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
    });

    it('should show the content when click the trigger', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(false);
      // click the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // should not hide the content when click the content
      const content = element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
    });

    it('should hide the content when click the trigger again', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(false);
      // click the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // click the dropdown trigger again.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(false);

      // should not hide the content when click the content
      const content = element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
      // make sure the content is open
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
      // click the content
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
    });

    it('should hide the content when click outside the trigger and content', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(false);
      // click the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // click outside the dropdown trigger and content.
      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(false);
    });
  });

  describe('when triggerAction is none', () => {
    it('should show the content when tooltip is rendered', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="none">
            <button>Test</button>
          </b-tooltip>
        `,
      );

      expect(element.open).to.equal(true);
    });

    it('should not hide the content when mouse enter the trigger or content', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="none">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const trigger = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;

      expect(element.open).to.equal(true);
      // Mouse enter the dropdown trigger.
      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // Mouse enter the dropdown content.
      const content = element.shadowRoot?.querySelector('.tooltip__content') as HTMLElement;
      content.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
    });
  });

  describe('when tooltip is focused or blurred', () => {
    it('should show the content when tooltip is focused', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const triggerSlot = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;
      const trigger = triggerSlot.assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);
      // focus the dropdown trigger.
      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
    });

    it('should hide the content when tooltip is blurred', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const triggerSlot = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;
      const trigger = triggerSlot.assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);
      // focus the dropdown trigger.
      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(true);

      // blur the dropdown trigger.
      trigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      await aTimeout(100);
      expect(element.open).to.equal(false);
    });
  });

  describe('keyboard events', () => {
    // Keyboard events are only triggered when the triggerAction is click.
    it('should show the content when enter key is pressed', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const triggerSlot = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;
      const trigger = triggerSlot.assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);
      trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
    });

    it('should toogle the content when space key is pressed', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const triggerSlot = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;
      const trigger = triggerSlot.assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);
      trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
      trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));
      await aTimeout(100);
      expect(element.open).to.equal(false);
    });

    it('should hide the content when escape key is pressed', async () => {
      const element = await fixture<BTooltip>(
        html`
          <b-tooltip content="tooltip" trigger-action="click">
            <button>Test</button>
          </b-tooltip>
        `,
      );
      const triggerSlot = element.shadowRoot?.querySelector('.tooltip__trigger') as HTMLSlotElement;
      const trigger = triggerSlot.assignedElements()[0] as HTMLElement;

      expect(element.open).to.equal(false);
      trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
      await aTimeout(100);
      expect(element.open).to.equal(true);
      trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
      await aTimeout(100);
      expect(element.open).to.equal(false);
    });
  });

  // TODO: placement, disableAutoAdjustOverflow, maxWidth, backgroundColor, margin, noArrow, etc.
});
