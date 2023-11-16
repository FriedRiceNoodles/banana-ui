import { aTimeout, expect } from '@open-wc/testing';
import sinon from 'sinon';
import type BMessageElement from '.';
import { type MessageType } from '.';

const BMessage = window.BMessage;

describe('BMessage.open', () => {
  it('should create a message', async () => {
    const id = BMessage.open({
      content: 'test',
    });
    const messagesContainer = document.querySelector('b-message') as BMessageElement;
    await messagesContainer.updateComplete;
    const messages__box = messagesContainer.shadowRoot!.querySelector('.messages__box');
    expect(messages__box).to.exist;
    expect(messages__box!.children.length).to.equal(1);

    const content = messages__box!.children[0].querySelector('.message__content');
    expect(content).to.exist;
    expect(content!.textContent).to.equal('test');

    // Avoid affecting other test cases
    BMessage.closeMessage(id);
    await messagesContainer.updateComplete;
  });

  it('should create a message with correct type', async () => {
    const typeArr: MessageType[] = ['info', 'success', 'warning', 'error', 'loading'];
    for (const type of typeArr) {
      const id = BMessage.open({
        content: 'test',
        type,
      });
      const messagesContainer = document.querySelector('b-message') as BMessageElement;
      await messagesContainer.updateComplete;
      const messages__box = messagesContainer.shadowRoot!.querySelector('.messages__box');
      expect(messages__box).to.exist;
      expect(messages__box!.children.length).to.equal(1);

      const message = messages__box!.children[0];
      expect(message.classList.contains(`message--${type}`)).to.be.true;

      // Avoid affecting other test cases
      BMessage.closeMessage(id);
      await messagesContainer.updateComplete;
    }
  });

  it('should create a message with correct duration', async () => {
    const id = BMessage.open({
      content: 'test',
      duration: 1,
    });
    const messagesContainer = document.querySelector('b-message') as BMessageElement;
    await messagesContainer.updateComplete;
    const messages__box = messagesContainer.shadowRoot!.querySelector('.messages__box');
    expect(messages__box).to.exist;
    expect(messages__box!.children.length).to.equal(1);

    const message = messages__box!.children[0];
    expect(message).to.exist;

    await aTimeout(500);
    expect(document.querySelector('b-message')).to.exist;

    await aTimeout(500);
    expect(document.querySelector('b-message')).to.not.exist;

    BMessage.closeMessage(id);
    await messagesContainer.updateComplete;
  });

  it('should execute onClose callback when message is closed', async () => {
    const onClose = sinon.spy();
    const id = BMessage.open({
      content: 'test',
      onClose,
    });
    const messagesContainer = document.querySelector('b-message') as BMessageElement;
    await messagesContainer.updateComplete;
    const messages__box = messagesContainer.shadowRoot!.querySelector('.messages__box');
    expect(messages__box).to.exist;
    expect(messages__box!.children.length).to.equal(1);

    const message = messages__box!.children[0];
    expect(message).to.exist;

    BMessage.closeMessage(id);
    await messagesContainer.updateComplete;
    expect(onClose).to.have.been.calledOnce;
  });
});

describe('info, success, warning, error, loading', () => {
  it('should create a message with correct type', async () => {
    const typeArr: MessageType[] = ['info', 'success', 'warning', 'error', 'loading'];
    for (const type of typeArr) {
      const id = BMessage[type]({
        content: 'test',
      });
      const messagesContainer = document.querySelector('b-message') as BMessageElement;
      await messagesContainer.updateComplete;
      const messages__box = messagesContainer.shadowRoot!.querySelector('.messages__box');
      expect(messages__box).to.exist;
      expect(messages__box!.children.length).to.equal(1);

      const message = messages__box!.children[0];
      expect(message.classList.contains(`message--${type}`)).to.be.true;

      // Avoid affecting other test cases
      BMessage.closeMessage(id);
      await messagesContainer.updateComplete;
    }
  });
});

describe('BMessage.closeMessage', () => {
  it('should close a message by a given id', async () => {
    const id1 = BMessage.open({
      content: 'test1',
    });

    const id2 = BMessage.open({
      content: 'test2',
    });

    const id3 = BMessage.open({
      content: 'test3',
    });

    // Close the second message.
    BMessage.closeMessage(id2);

    const messagesContainer = document.querySelector('b-message') as BMessageElement;
    await messagesContainer.updateComplete;
    const messages__box = messagesContainer.shadowRoot!.querySelector('.messages__box');
    expect(messages__box).to.exist;
    expect(messages__box!.children.length).to.equal(2);
    expect(messages__box!.children[0].querySelector('.message__content')!.textContent).to.equal('test1');
    expect(messages__box!.children[1].querySelector('.message__content')!.textContent).to.equal('test3');

    // Avoid affecting other test cases
    BMessage.closeMessage(id1);
    BMessage.closeMessage(id3);
  });

  it('should remove the message container when there is no message', () => {
    const id = BMessage.open({
      content: 'test',
    });

    BMessage.closeMessage(id);

    const messagesContainer = document.querySelector('b-message') as BMessageElement;
    expect(messagesContainer).to.not.exist;
  });
});
