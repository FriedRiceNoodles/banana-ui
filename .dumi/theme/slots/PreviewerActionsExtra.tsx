import React from 'react';
import { Tooltip } from '../../../packages/banana-react/dist';

const PreviewerActionsExtra = (props) => {
  console.log('props?', props);
  return (
    <Tooltip content="展开代码(HTML)">
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7629"
        width="24"
        height="24"
        className="dumi-default-previewer-action-btn"
      >
        <path
          d="M194.33 479.765h-101.295v-101.28h-46.035v267.030h46.035v-119.7h101.28v119.7h46.035v-267.030h-46.035v101.28zM277.205 415.31h73.665v230.205h46.035v-230.205h73.665v-36.825h-193.365v36.825zM627.815 560.42l-46.755-181.935h-73.665v267.030h46.035v-211.785l46.035 211.785h55.245l46.83-213.93-0.795 213.93h46.035v-267.030h-73.665l-45.3 181.935zM848.090 608.69v-230.205h-46.035v267.030h174.945v-36.825h-128.91z"
          p-id="7630"
          fill="rgba(42, 46, 54, 0.45)"
        ></path>
      </svg>
    </Tooltip>
  );
};

export default PreviewerActionsExtra;
