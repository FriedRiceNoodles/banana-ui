/**
 * title: 自定义符号
 * description: 通过 `character` 属性自定义符号。
 */

import { Rating } from '@banana-ui/react';
import React, { CSSProperties } from 'react';

export default function Character() {
  const customCharacter = `
    <svg
      t="1693913309010"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4054"
      width="36"
      height="36"
    >
      <path
        d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
        fill="currentColor"
        p-id="4055"
      ></path>
    </svg>
  `;

  return (
    <div>
      <Rating defaultValue={3} character="好" />
      {/* 如果你使用了外部的svg图标，需要把fill属性设置为currentColor，以保证组件能根据状态调整图标颜色。 */}
      <Rating
        defaultValue={3}
        character={customCharacter}
        style={{ '--banana-rating-symbol-color': '#bb4430' } as CSSProperties}
      />
    </div>
  );
}
