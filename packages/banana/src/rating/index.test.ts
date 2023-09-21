import { expect, fixture, html } from '@open-wc/testing';
import BRating from '.';
import { resetMouse, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';

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
    if (element.readonly || element.disabled) {
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

  describe('when provided a value', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating value="0"></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating value="0.1"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating value="0.6"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating value="1"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
    });
  });

  describe('when provided defaultValue', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating default-value="0"></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating default-value="0.1"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating default-value="0.6"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating default-value="1"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating default-value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
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

  describe('when provided disabled', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating disabled></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating disabled value="0"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating disabled value="0.1"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating disabled value="0.6"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating disabled value="1"></b-rating>`);
      const element6 = await fixture<BRating>(html`<b-rating disabled value="5"></b-rating>`);

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

  describe('when provided precision and halfAllowed', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating precision half-allowed></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating precision half-allowed value="0"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating precision half-allowed value="0.1"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating precision half-allowed value="0.6"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating precision half-allowed value="1"></b-rating>`);
      const element6 = await fixture<BRating>(html`<b-rating precision half-allowed value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
      await shouldHaveCorrectValueAndStyles(element6);
    });
  });

  describe('when provided character', () => {
    it('should have correct value and styles', async () => {
      const element = await fixture<BRating>(html`<b-rating character="A"></b-rating>`);
      const element2 = await fixture<BRating>(html`<b-rating character="A" value="0"></b-rating>`);
      const element3 = await fixture<BRating>(html`<b-rating character="A" value="0.1"></b-rating>`);
      const element4 = await fixture<BRating>(html`<b-rating character="A" value="0.6"></b-rating>`);
      const element5 = await fixture<BRating>(html`<b-rating character="A" value="1"></b-rating>`);
      const element6 = await fixture<BRating>(html`<b-rating character="A" value="5"></b-rating>`);

      await shouldHaveCorrectValueAndStyles(element);
      await shouldHaveCorrectValueAndStyles(element2);
      await shouldHaveCorrectValueAndStyles(element3);
      await shouldHaveCorrectValueAndStyles(element4);
      await shouldHaveCorrectValueAndStyles(element5);
      await shouldHaveCorrectValueAndStyles(element6);
    });

    it('should render the provided character', async () => {
      const element = await fixture<BRating>(html`<b-rating character="A"></b-rating>`);

      expect(element.character).to.equal('A');
    });
  });

  it('css variables should work', async () => {
    const element = await fixture<BRating>(html`<b-rating
      style="
      --banana-rating-symbol-size: 48px;
      --banana-rating-symbol-spacing: 16px;
      --banana-rating-symbol-color: #ff0000;
      --banana-rating-symbol-background-color: #0000ff;
      --banana-rating-transition-duration: 0.1s;
      "
    ></b-rating>`);

    const containers = element.shadowRoot?.querySelectorAll('.rating__symbol-container') as NodeListOf<HTMLElement>;
    const symbols = element.shadowRoot?.querySelectorAll('.rating__symbols') as NodeListOf<HTMLElement>;
    const activeSymbols = element.shadowRoot?.querySelectorAll('.rating__symbol-active') as NodeListOf<HTMLElement>;
    const backgroundSymbols = element.shadowRoot?.querySelectorAll(
      '.rating__symbol-background',
    ) as NodeListOf<HTMLElement>;

    expect(getComputedStyle(activeSymbols[0]).color).to.equal('rgb(255, 0, 0)');
    expect(getComputedStyle(backgroundSymbols[0]).color).to.equal('rgb(0, 0, 255)');
    expect(getComputedStyle(containers[0]).transition).to.equal('all 0.1s ease 0s');
    expect(getComputedStyle(symbols[0]).fontSize).to.equal('48px');
    expect(getComputedStyle(symbols[0]).gap).to.equal('16px');
  });

  describe('form', () => {
    it('a native form should be able to get the value of rating', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-rating name="test" value="3"></b-rating>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal('3');
    });

    it('should not submit the form when a required rating is empty', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-rating name="test" required></b-rating>
      </form>`);
      const rating = element.querySelector('b-rating') as BRating;
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.called).to.equal(false);

      // Then make it not empty then submit the form.
      rating.value = 3;
      await rating.updateComplete;
      element.requestSubmit();

      // It should submit the form now.
      expect(spy.calledOnce).to.equal(true);
    });

    it('a disabled rating should not be a part of the form data, even if it has a name', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-rating name="test" disabled value="3"></b-rating>
      </form>`);

      // Should get correct form data.
      const formData = new FormData(element);
      expect(formData.get('test')).to.equal(null);
    });

    it('should be valid and submit the form when a empty required rating is disabled', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-rating name="test" required disabled></b-rating>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should be valid and submit the form when a required rating is empty and the form is novaalidate', async () => {
      const element = await fixture<HTMLFormElement>(html`<form
        novalidate
        @submit=${(event: Event) => {
          event.preventDefault();
        }}
      >
        <b-rating name="test" required></b-rating>
      </form>`);
      const spy = sinon.spy();
      element.addEventListener('submit', spy);

      element.requestSubmit();
      expect(spy.calledOnce).to.equal(true);
    });

    it('should become the default value when the form is reset', async () => {
      const element = await fixture<HTMLFormElement>(html`<form>
        <b-rating name="test" value="3" default-value="2"></b-rating>
      </form>`);
      const rating = element.querySelector('b-rating') as BRating;

      expect(rating.value).to.equal(3);

      element.reset();
      expect(rating.value).to.equal(2);
    });
  });
});
