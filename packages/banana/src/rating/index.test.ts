import { expect, fixture, html } from '@open-wc/testing';
import BRating from '.';
import { resetMouse, sendMouse } from '@web/test-runner-commands';

function getCoordinate(element: HTMLElement, side: 'LEFT' | 'RIGHT' = 'LEFT') {
  const { x, y, width, height } = element.getBoundingClientRect();
  // 6px is the quarter of the width of the symbol.(Default symbol size is 24px)
  return [side === 'LEFT' ? Math.round(x + 6) : Math.round(x + width - 6), Math.round(y + height / 2)] as [
    number,
    number,
  ];
}

async function shouldHaveCorrectValueAndStyles(element: BRating) {
  await resetMouse();
  const containers = element.shadowRoot?.querySelectorAll('.rating__symbol-container') as NodeListOf<HTMLElement>;

  const initialValue = element.value;
  checkStylesByValue(element, initialValue);

  const theValueShouldBe = (mouseHoverIndex: number, _side: 'LEFT' | 'RIGHT') => {
    if (element.readonly) {
      return initialValue;
    } else if (element.precision) {
      // About 0.02:
      // See the _handleMouseMove() method in packages/banana/src/rating/index.ts.
      return _side === 'LEFT' ? mouseHoverIndex + 0.25 + 0.02 : mouseHoverIndex + 0.75 + 0.02;
    } else if (element.halfAllowed) {
      return _side === 'LEFT' ? mouseHoverIndex + 0.5 : mouseHoverIndex + 1;
    } else {
      return mouseHoverIndex + 1;
    }
  };

  const checkValue = (element: BRating, shouldBe: number) => {
    // Since different browsers handle mouse events differently, 2% error is allowed here.
    if (element.precision) {
      expect(element.value).to.be.closeTo(shouldBe, 0.021);
    } else {
      expect(element.value).to.equal(shouldBe);
    }
  };

  // Hover on left side of the first symbol.
  await sendMouse({ type: 'move', position: getCoordinate(containers[0]) });
  expect(element.value).to.equal(initialValue);
  checkStylesByValue(element, theValueShouldBe(0, 'LEFT'));

  await sendMouse({ type: 'down' });
  await sendMouse({ type: 'up' });
  checkValue(element, theValueShouldBe(0, 'LEFT'));
  checkStylesByValue(element, theValueShouldBe(0, 'LEFT'));

  // Hover on the right side of the first symbol.
  await sendMouse({ type: 'move', position: getCoordinate(containers[0], 'RIGHT') });
  checkValue(element, theValueShouldBe(0, 'LEFT'));
  checkStylesByValue(element, theValueShouldBe(0, 'RIGHT'));

  await sendMouse({ type: 'down' });
  await sendMouse({ type: 'up' });
  checkValue(element, theValueShouldBe(0, 'RIGHT'));
  checkStylesByValue(element, theValueShouldBe(0, 'RIGHT'));

  // Hover on the left side of the second symbol.
  await sendMouse({ type: 'move', position: getCoordinate(containers[1]) });
  checkValue(element, theValueShouldBe(0, 'RIGHT'));
  checkStylesByValue(element, theValueShouldBe(1, 'LEFT'));

  await sendMouse({ type: 'down' });
  await sendMouse({ type: 'up' });
  checkValue(element, theValueShouldBe(1, 'LEFT'));
  checkStylesByValue(element, theValueShouldBe(1, 'LEFT'));
}

function checkStylesByValue(element: BRating, value: number) {
  const containers = element.shadowRoot?.querySelectorAll('.rating__symbol-container') as NodeListOf<HTMLElement>;
  const activeSymbols = element.shadowRoot?.querySelectorAll('.rating__symbol-active') as NodeListOf<HTMLElement>;

  containers.forEach((container, index) => {
    if (element.precision) {
      expect(container.getAttribute('aria-checked')).to.equal(value > index ? 'true' : 'false');
    } else {
      expect(container.getAttribute('aria-checked')).to.equal(
        (element.halfAllowed && index + 0.5 <= value && index + 1 > value) || index + 1 <= value ? 'true' : 'false',
      );
    }
  });

  activeSymbols.forEach((symbol, index) => {
    if (element.precision) {
      expect(symbol.classList.contains('rating__symbol-active--full')).to.equal(false);
      // Get the number from the width string like 'width: 100%;'.
      const width = Number(symbol.style.width?.replace(/[^0-9]/g, ''));

      // Since different browsers handle mouse events differently, 2% error is allowed here.
      expect(width).to.be.closeTo(
        value >= index + 1
          ? 100
          : value > index && value < index + 1
          ? Math.floor((value - Math.floor(value)) * 100) ?? 0
          : 0,
        2,
      );
    } else {
      expect(symbol.classList.contains('rating__symbol-active--full')).to.equal(index + 1 <= value);
      expect(symbol.classList.contains('rating__symbol-active--half')).to.equal(
        element.halfAllowed && index + 0.5 <= value && index + 1 > value,
      );
      expect(symbol.style.width).to.equal('');
    }
  });
}

describe('b-rating', () => {
  it('accessibility tests', async () => {
    const element = await fixture<BRating>(html`<b-rating></b-rating>`);
    await expect(element).to.be.accessible();
  });

  describe('when provided no parameters', () => {
    it('should have correct default values', async () => {
      const element = await fixture<BRating>(html`<b-rating></b-rating>`);
      const containers = element.shadowRoot?.querySelectorAll('.rating__symbol-container') as NodeListOf<HTMLElement>;
      const activeSymbols = element.shadowRoot?.querySelectorAll('.rating__symbol-active') as NodeListOf<HTMLElement>;

      containers.forEach((container) => {
        expect(container.getAttribute('aria-checked')).to.equal('false');
      });

      activeSymbols.forEach((symbol) => {
        expect(symbol.clientWidth).to.equal(0);
      });

      expect(element.value).to.equal(0);
      expect(element.defaultValue).to.equal(0);
      expect(element.name).to.equal('');
      expect(element.form).to.equal(undefined);
      expect(element.disabled).to.equal(false);
      expect(element.required).to.equal(false);
      expect(element.character).to.equal(element.defaultSymbol);
      expect(element.halfAllowed).to.equal(false);
      expect(element.readonly).to.equal(false);
      expect(element.precision).to.equal(false);
      expect(element.controlled).to.equal(false);
    });

    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
    });
  });

  describe('when provided halfAllowed', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating half-allowed></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating half-allowed value="0"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating half-allowed value="0.1"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating half-allowed value="0.6"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating half-allowed value="1"></b-rating>`);
      const element6 = await fixture<BRating>(html`<b-rating half-allowed value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
      await shouldHaveCorrectValueAndStyles(element6);
    });
  });

  describe('when provided readonly', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating readonly></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating readonly value="0"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating readonly value="0.1"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating readonly value="0.6"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating readonly value="1"></b-rating>`);
      const element6 = await fixture<BRating>(html`<b-rating readonly value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
      await shouldHaveCorrectValueAndStyles(element6);
    });
  });

  describe('when provided precision', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating precision></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating precision value="0"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating precision value="0.1"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating precision value="0.6"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating precision value="1"></b-rating>`);
      const element6 = await fixture<BRating>(html`<b-rating precision value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
      await shouldHaveCorrectValueAndStyles(element6);
    });
  });
});
