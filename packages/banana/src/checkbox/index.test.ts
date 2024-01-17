// import { expect, fixture, html } from '@open-wc/testing';
// import sinon from 'sinon';
// import BCheckbox from '.';

// describe('b-checkbox', () => {
//   it('accessibility tests', async () => {
//     const element = await fixture<BCheckbox>(html`<b-checkbox></b-checkbox>`);
//     await expect(element).to.be.accessible();
//   });

//   describe('form', () => {
//     it('a native form should be able to get the value of checkbox', async () => {
//       const element = await fixture<HTMLFormElement>(html`<form>
//         <b-checkbox name="test" value="test"></b-checkbox>
//       </form>`);

//       // Should get correct form data.
//       const formData = new FormData(element);
//       expect(formData.get('test')).to.equal('test');
//     });

//     it('should not submit the form when a required checkbox is empty', async () => {
//       const element = await fixture<HTMLFormElement>(html`<form
//         @submit=${(event: Event) => {
//           event.preventDefault();
//         }}
//       >
//         <b-checkbox name="test" required></b-checkbox>
//       </form>`);
//       const checkbox = element.querySelector('b-checkbox') as BCheckbox;
//       const spy = sinon.spy();
//       element.addEventListener('submit', spy);

//       element.requestSubmit();
//       expect(spy.called).to.equal(false);

//       // Then make it not empty then submit the form.
//       checkbox.value = 'test';
//       element.requestSubmit();

//       // It should submit the form now.
//       expect(spy.calledOnce).to.equal(true);
//     });

//     it('a disabled checkbox should not be a part of the form data, even if it has a name', async () => {
//       const element = await fixture<HTMLFormElement>(html`<form
//         @submit=${(event: Event) => {
//           event.preventDefault();
//         }}
//       >
//         <b-checkbox name="test" disabled value="test"></b-checkbox>
//       </form>`);

//       // Should get correct form data.
//       const formData = new FormData(element);
//       expect(formData.get('test')).to.equal(null);
//     });

//     it('should be valid and submit the form when a empty required checkbox is disabled', async () => {
//       const element = await fixture<HTMLFormElement>(html`<form
//         @submit=${(event: Event) => {
//           event.preventDefault();
//         }}
//       >
//         <b-checkbox name="test" required disabled></b-checkbox>
//       </form>`);
//       const spy = sinon.spy();
//       element.addEventListener('submit', spy);

//       element.requestSubmit();
//       expect(spy.calledOnce).to.equal(true);
//     });

//     it('should be valid and submit the form when a required checkbox is empty and the form is novaalidate', async () => {
//       const element = await fixture<HTMLFormElement>(html`<form
//         novalidate
//         @submit=${(event: Event) => {
//           event.preventDefault();
//         }}
//       >
//         <b-checkbox name="test" required></b-checkbox>
//       </form>`);
//       const spy = sinon.spy();
//       element.addEventListener('submit', spy);

//       element.requestSubmit();
//       expect(spy.calledOnce).to.equal(true);
//     });

//     it('should become the default value when the form is reset', async () => {
//       const element = await fixture<HTMLFormElement>(html`<form>
//         <b-checkbox name="test" value="test" default-value="default"></b-checkbox>
//       </form>`);
//       const checkbox = element.querySelector('b-checkbox') as BCheckbox;

//       expect(checkbox.value).to.equal('test');

//       element.reset();
//       expect(checkbox.value).to.equal('default');
//     });
//   });
// });
