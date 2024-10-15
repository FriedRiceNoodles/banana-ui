/**
 * title: 基本使用
 */

import { Radio, RadioGroup, TabItem, TabPanel, Tabs } from '@banana-ui/react';
import { useState } from 'react';

export default function BasicUsage() {
  const [pos, setPos] = useState('top');
  return (
    <>
      <RadioGroup value={pos} onChange={(e) => setPos(e.detail.value)}>
        <Radio value="top">页标在上</Radio>
        <Radio value="bottom">页标在下</Radio>
        <Radio value="left">页标在左</Radio>
        <Radio value="right">页标在右</Radio>
      </RadioGroup>
      <div>
        <Tabs position={pos}>
          <TabItem slot="nav" panel="1">
            Tab1
          </TabItem>
          <TabItem slot="nav" panel="2" disabled>
            LongContentTabItem(disabled)
          </TabItem>
          <TabItem slot="nav" panel="3">
            Tab3
          </TabItem>
          <TabItem slot="nav" panel="4">
            Tab4
          </TabItem>

          <TabPanel slot="body" name="1">
            <img
              src="https://cdn.shopify.com/s/files/1/2710/8782/files/RMLdaYQf_paEjC8LTWqDx.jpg?v=1728612875"
              width="100%"
            />
          </TabPanel>
          <TabPanel slot="body" name="2">
            Tab Content 2
          </TabPanel>
          <TabPanel slot="body" name="3">
            Tab Content 3
          </TabPanel>
          <TabPanel slot="body" name="4">
            Tab Content 4
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
