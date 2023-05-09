import { expect, fixture, html } from '@open-wc/testing';
import './index';

const data = {
  open: true,
  zIndex: 1,
};
let el;
describe('B-Overlay', function () {
  it('should render element', async () => {
    el = await fixture(html`<b-overlay open=${data.open} zIndex=${data.zIndex}> </b-overlay>`);
    const container = el.shadowRoot!.querySelector('.quark-overlay');
    const mask = el.shadowRoot!.querySelector('.quark-overlay-mask');
    expect(container).to.exist;
    expect(mask).to.exist;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(el?.open).to.equal(data.open);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(el.zIndex).to.equal(`${data.zIndex}`);
  });

  it('should render slot content', async () => {
    const slot = `<div>content</div>`;
    el = await fixture(`<quark-overlay>${slot}</quark-overlay>`);
    const searchSlot = el.shadowRoot!.querySelector('slot');
    const slotResult = searchSlot?.assignedNodes()[0];
    expect(slotResult?.textContent).to.equal(slot);
  });
});
