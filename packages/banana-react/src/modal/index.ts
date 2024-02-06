import { createComponent } from '@lit-labs/react';
import { BModal } from 'banana-ui';
import * as React from 'react';

export const Modal = createComponent({
  tagName: 'b-modal',
  react: React,
  elementClass: BModal,
  events: {
    onCancel: 'cancel',
    onOk: 'ok',
  },
});
