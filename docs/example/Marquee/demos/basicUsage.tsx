/**
 * title: 基本使用
 */

import { Marquee } from '@banana-ui/react';

export default function BasicUsage() {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return <Marquee content={content} />;
}
