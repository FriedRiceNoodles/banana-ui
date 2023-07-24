import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import BProgress from '.';

describe('b-progress', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BProgress>(html`<b-progress percent="50"></b-progress>`);
    await expect(element).to.be.accessible();
  });

  it('when provided no parameters', async () => {
    const element = await fixture<BProgress>(html`<b-progress></b-progress>`);
    const innerElement = element.shadowRoot?.querySelector('.progress-bar') as HTMLElement;
    const progressWidth = window.getComputedStyle(innerElement).width;
    const progressHeight = window.getComputedStyle(element).height;

    expect(progressWidth).to.equal('0px');
    expect(progressHeight).to.equal('10px');

    expect(element.percent).to.equal(undefined);
    expect(element.color).to.equal(undefined);
    expect(element.backgroundColor).to.equal(undefined);
    expect(element.height).to.equal(undefined);
  });

  it('when provided a percent parameter', async () => {
    const element = await fixture<BProgress>(html`<b-progress style="width: 200px;" percent="50"></b-progress>`);
    const innerElement = element.shadowRoot?.querySelector('.progress-bar') as HTMLElement;
    let progressWidth = window.getComputedStyle(innerElement).width;

    expect(progressWidth).to.equal('100px');
    expect(element.percent).to.equal(50);

    element.percent = 100;
    await element.updateComplete;
    // This is a hack to wait for the animation to finish
    await aTimeout(1000);
    progressWidth = window.getComputedStyle(innerElement).width;
    expect(progressWidth).to.equal('200px');
    expect(element.percent).to.equal(100);
  });

  it('when provided a color parameter', async () => {
    const element = await fixture<BProgress>(html`<b-progress color="red"></b-progress>`);
    const innerElement = element.shadowRoot?.querySelector('.progress-bar') as HTMLElement;
    let progressColor = window.getComputedStyle(innerElement).backgroundColor;

    expect(progressColor).to.equal('rgb(255, 0, 0)');
    expect(element.color).to.equal('red');

    element.color = 'blue';
    await element.updateComplete;
    progressColor = window.getComputedStyle(innerElement).backgroundColor;
    expect(element.color).to.equal('blue');
    expect(progressColor).to.equal('rgb(0, 0, 255)');

    // Change the color with a css variable, ant make it linear-gradient
    // Remove the color attribute first
    element.removeAttribute('color');
    await element.updateComplete;
    element.style.setProperty('--banana-progress-color', 'linear-gradient(to right, red, blue)');
    await element.updateComplete;
    progressColor = window.getComputedStyle(innerElement).backgroundImage;
    expect(progressColor).to.equal('linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))');
  });

  it('when provided a backgroundColor parameter', async () => {
    const element = await fixture<BProgress>(html`<b-progress backgroundColor="red"></b-progress>`);
    const progressElement = element.shadowRoot?.querySelector('.progress') as HTMLElement;
    let backgroundColor = window.getComputedStyle(progressElement).backgroundColor;

    expect(backgroundColor).to.equal('rgb(255, 0, 0)');
    expect(element.backgroundColor).to.equal('red');

    element.backgroundColor = 'blue';
    await element.updateComplete;
    backgroundColor = window.getComputedStyle(progressElement).backgroundColor;
    expect(element.backgroundColor).to.equal('blue');
    expect(backgroundColor).to.equal('rgb(0, 0, 255)');

    // Change the backgroundColor with a css variable and make it linear-gradient
    // Remove the backgroundColor attribute first
    element.removeAttribute('backgroundColor');
    await element.updateComplete;
    element.style.setProperty('--banana-progress-background-color', 'linear-gradient(to right, red, blue)');
    await element.updateComplete;
    backgroundColor = window.getComputedStyle(progressElement).backgroundImage;
    expect(backgroundColor).to.equal('linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))');
  });

  it('when provided a height parameter', async () => {
    const element = await fixture<BProgress>(html`<b-progress height="20"></b-progress>`);
    const innerElement = element.shadowRoot?.querySelector('.progress-bar') as HTMLElement;
    let progressHeight = window.getComputedStyle(innerElement).height;
    // Default border radius is half of the height
    let borderRadius = window.getComputedStyle(innerElement).borderRadius;

    expect(progressHeight).to.equal('20px');
    expect(element.height).to.equal(20);
    expect(borderRadius).to.equal('10px');

    element.height = 30;
    await element.updateComplete;
    progressHeight = window.getComputedStyle(innerElement).height;
    borderRadius = window.getComputedStyle(innerElement).borderRadius;
    expect(element.height).to.equal(30);
    expect(progressHeight).to.equal('30px');
    expect(borderRadius).to.equal('15px');

    // Change the height with a css variable
    // Remove the height attribute first
    element.removeAttribute('height');
    await element.updateComplete;
    element.style.setProperty('--banana-progress-height', '40px');
    await element.updateComplete;
    progressHeight = window.getComputedStyle(innerElement).height;
    borderRadius = window.getComputedStyle(innerElement).borderRadius;
    expect(progressHeight).to.equal('40px');
    expect(borderRadius).to.equal('20px');
  });

  it('custom border radius', async () => {
    const element = await fixture<BProgress>(html`<b-progress style="--banana-progress-border-radius: 2px"></b-progress>`);
    const progressElement = element.shadowRoot?.querySelector('.progress') as HTMLElement;
    const innerElement = element.shadowRoot?.querySelector('.progress-bar') as HTMLElement;
    const progressBorderRadius = window.getComputedStyle(progressElement).borderRadius;
    const barBorderRadius = window.getComputedStyle(innerElement).borderRadius;

    expect(progressBorderRadius).to.equal('2px');
    expect(barBorderRadius).to.equal('2px');
  });
});
