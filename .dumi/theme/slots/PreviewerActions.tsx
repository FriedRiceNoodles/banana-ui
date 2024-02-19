import DumiPreviewerActions from 'dumi/theme-default/slots/PreviewerActions';
import React from 'react';

const PreviewerActions: typeof DumiPreviewerActions = (props) => (
  <DumiPreviewerActions {...props} disabledActions={['STACKBLITZ', 'CSB']} />
);

export default PreviewerActions;
