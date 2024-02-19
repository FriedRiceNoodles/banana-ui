import { DumiSiteProvider, Features, type IFeature } from 'dumi-theme-antd-style';
import React from 'react';

// work in progress...
const features: IFeature[] = [];

export default function F() {
  return (
    <DumiSiteProvider>
      <Features items={features} />
    </DumiSiteProvider>
  );
}
