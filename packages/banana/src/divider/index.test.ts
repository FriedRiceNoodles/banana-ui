import { expect, fixture, html } from '@open-wc/testing';
import BDivider from '.';

describe('b-divider', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BDivider>(html`<b-divider></b-divider>`);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BDivider>(html`<b-divider></b-divider>`);
    const borderTopWidth = window.getComputedStyle(element).borderTopWidth;
    const marginTop = window.getComputedStyle(element).marginTop;

    expect(borderTopWidth).to.equal('1px');
    expect(marginTop).to.equal('16px');

    expect(element.width).to.equal(undefined);
    expect(element.spacing).to.equal(undefined);
    expect(element.color).to.equal(undefined);
    expect(element.vertical).to.equal(false);
    expect(element.dashed).to.equal(false);
  });

  describe('custom width', () => {
    it('should set the width when provided a number', async () => {
      const element = await fixture<BDivider>(html`<b-divider width="10"></b-divider>`);
      const borderTopWidth = window.getComputedStyle(element).borderTopWidth;
      expect(borderTopWidth).to.equal('10px');
      expect(element.style.getPropertyValue('--banana-divider-width')).to.equal('10px');
    });

    it('should set the width when provided a string', async () => {
      const element = await fixture<BDivider>(html`<b-divider width="10px"></b-divider>`);
      const borderTopWidth = window.getComputedStyle(element).borderTopWidth;
      expect(borderTopWidth).to.equal('10px');
      expect(element.style.getPropertyValue('--banana-divider-width')).to.equal('10px');
    });

    it('should set the width when using css variables', async () => {
      const element = await fixture<BDivider>(html`<b-divider style="--banana-divider-width: 10px"></b-divider>`);
      const borderTopWidth = window.getComputedStyle(element).borderTopWidth;
      expect(borderTopWidth).to.equal('10px');
      expect(element.style.getPropertyValue('--banana-divider-width')).to.equal('10px');
    });
  });

  describe('custom spacing', () => {
    it('should set the spacing when provided a number', async () => {
      const element = await fixture<BDivider>(html`<b-divider spacing="10"></b-divider>`);
      const marginTop = window.getComputedStyle(element).marginTop;
      const marginBottom = window.getComputedStyle(element).marginBottom;
      expect(marginTop).to.equal('10px');
      expect(marginBottom).to.equal('10px');
      expect(element.style.getPropertyValue('--banana-divider-spacing')).to.equal('10px');
    });

    it('should set the spacing when provided a string', async () => {
      const element = await fixture<BDivider>(html`<b-divider spacing="10px"></b-divider>`);
      const marginTop = window.getComputedStyle(element).marginTop;
      const marginBottom = window.getComputedStyle(element).marginBottom;
      expect(marginTop).to.equal('10px');
      expect(marginBottom).to.equal('10px');
      expect(element.style.getPropertyValue('--banana-divider-spacing')).to.equal('10px');
    });

    it('should set the spacing when using css variables', async () => {
      const element = await fixture<BDivider>(html`<b-divider style="--banana-divider-spacing: 10px"></b-divider>`);
      const marginTop = window.getComputedStyle(element).marginTop;
      const marginBottom = window.getComputedStyle(element).marginBottom;
      expect(marginTop).to.equal('10px');
      expect(marginBottom).to.equal('10px');
      expect(element.style.getPropertyValue('--banana-divider-spacing')).to.equal('10px');
    });
  });

  describe('custom color', () => {
    it('should set the color when provided a string', async () => {
      const element = await fixture<BDivider>(html`<b-divider color="red"></b-divider>`);
      const borderTopColor = window.getComputedStyle(element).borderTopColor;
      expect(borderTopColor).to.equal('rgb(255, 0, 0)');
      expect(element.style.getPropertyValue('--banana-divider-color')).to.equal('red');
    });

    it('should set the color when using css variables', async () => {
      const element = await fixture<BDivider>(html`<b-divider style="--banana-divider-color: red"></b-divider>`);
      const borderTopColor = window.getComputedStyle(element).borderTopColor;
      expect(borderTopColor).to.equal('rgb(255, 0, 0)');
      expect(element.style.getPropertyValue('--banana-divider-color')).to.equal('red');
    });
  });

  describe('vertical', () => {
    it('should set the vertical attribute', async () => {
      const element = await fixture<BDivider>(html`<b-divider vertical></b-divider>`);
      const borderTopWidth = window.getComputedStyle(element).borderTopWidth;
      const borderLeftWidth = window.getComputedStyle(element).borderLeftWidth;
      const marginTop = window.getComputedStyle(element).marginTop;
      const marginBottom = window.getComputedStyle(element).marginBottom;
      const marginLeft = window.getComputedStyle(element).marginLeft;
      const marginRight = window.getComputedStyle(element).marginRight;
      expect(borderTopWidth).to.equal('0px');
      expect(borderLeftWidth).to.equal('1px');
      expect(marginTop).to.equal('0px');
      expect(marginBottom).to.equal('0px');
      expect(marginLeft).to.equal('16px');
      expect(marginRight).to.equal('16px');
      expect(element.vertical).to.equal(true);
    });
  });

  describe('dashed', () => {
    it('should set the dashed attribute', async () => {
      const element = await fixture<BDivider>(html`<b-divider dashed></b-divider>`);
      const borderTopStyle = window.getComputedStyle(element).borderTopStyle;
      expect(borderTopStyle).to.equal('dashed');
      expect(element.dashed).to.equal(true);
    });
  });
});
