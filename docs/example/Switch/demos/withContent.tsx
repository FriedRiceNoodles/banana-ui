/**
 * title: 携带内容
 */

import { Switch } from '@banana-ui/react';

export default function WithContent() {
  const checkedSvg = (
    <svg
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      t="1711257906171"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7150"
      width="18"
      height="18"
    >
      <path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01" p-id="7151"></path>
      <path
        d="M955.733333 512c0 245.077333-198.656 443.733333-443.733333 443.733333S68.266667 757.077333 68.266667 512 266.922667 68.266667 512 68.266667s443.733333 198.656 443.733333 443.733333z"
        fill="#11AA66"
        p-id="7152"
      ></path>
      <path
        d="M512 102.4C285.7984 102.4 102.4 285.7984 102.4 512s183.3984 409.6 409.6 409.6 409.6-183.3984 409.6-409.6S738.2016 102.4 512 102.4zM34.133333 512C34.133333 248.081067 248.081067 34.133333 512 34.133333s477.866667 213.947733 477.866667 477.866667-213.947733 477.866667-477.866667 477.866667S34.133333 775.918933 34.133333 512z"
        fill="#11AA66"
        p-id="7153"
      ></path>
      <path
        d="M787.114667 339.285333a51.2 51.2 0 0 1 0 72.362667l-307.2 307.2a51.2 51.2 0 0 1-72.362667 0l-170.666667-170.666667a51.2 51.2 0 0 1 72.362667-72.362666L443.733333 610.235733l271.018667-271.018666a51.2 51.2 0 0 1 72.362667 0z"
        fill="#FFFFFF"
        p-id="7154"
      ></path>
    </svg>
  );

  const uncheckedSvg = (
    <svg
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      t="1711257880605"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5963"
      width="18"
      height="18"
    >
      <path
        d="M512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m44.245333-469.333333l159.914667-159.914667a31.274667 31.274667 0 1 0-44.245333-44.245333L512 467.754667 352.085333 307.84a31.274667 31.274667 0 1 0-44.245333 44.245333L467.754667 512l-159.914667 159.914667a31.274667 31.274667 0 1 0 44.245333 44.245333L512 556.245333l159.914667 159.914667a31.274667 31.274667 0 1 0 44.245333-44.245333L556.245333 512z"
        fill="#F5222D"
        p-id="5964"
      ></path>
    </svg>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <Switch>
        <span slot="checked">开启</span>
        <span slot="unchecked">关闭</span>
      </Switch>
      <Switch>
        <span slot="checked">1</span>
        <span slot="unchecked">0</span>
      </Switch>
      <Switch>
        <span slot="checked">{checkedSvg}</span>
        <span slot="unchecked">{uncheckedSvg}</span>
      </Switch>
    </div>
  );
}
