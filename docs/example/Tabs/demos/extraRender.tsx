/**
 * title: 额外操作元素
 */

import { Button, TabItem, TabPanel, Tabs } from '@banana-ui/react';

export default function BasicUsage() {
  return (
    <div>
      <Tabs position="top">
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
        <TabItem slot="nav" panel="4">
          Tab4
        </TabItem>
        <TabItem slot="nav" panel="4">
          Tab4
        </TabItem>
        <TabItem slot="nav" panel="4">
          Tab4
        </TabItem>
        <TabItem slot="nav" panel="4">
          Tab4
        </TabItem>
        <TabItem slot="nav" panel="4">
          Tab4
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

        <Button slot="left-extra-render">Left Extra Render</Button>
        <Button slot="right-extra-render">Right Extra Render</Button>
      </Tabs>
    </div>
  );
}
