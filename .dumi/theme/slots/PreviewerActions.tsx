// Copy from dumi@2.2.17

import { ReactComponent as IconCodeSandbox } from '@ant-design/icons-svg/inline-svg/outlined/code-sandbox.svg';
import { ReactComponent as IconStackBlitz } from '@ant-design/icons-svg/inline-svg/outlined/thunderbolt.svg';
import { openCodeSandbox, openStackBlitz, useIntl, type IPreviewerProps } from 'dumi';
import SourceCode from 'dumi/theme-default/builtins/SourceCode';
import 'dumi/theme-default/slots/PreviewerActions/index.less';
import PreviewerActionsExtra from 'dumi/theme-default/slots/PreviewerActionsExtra';
import Tabs from 'rc-tabs';
import { useEffect, useState, type FC, type ReactNode } from 'react';
export interface IPreviewerActionsProps extends IPreviewerProps {
  /**
   * disabled actions
   */
  disabledActions?: ('CSB' | 'STACKBLITZ' | 'EXTERNAL' | 'HTML2SKETCH')[];
  extra?: ReactNode;
  forceShowCode?: boolean;
  demoContainer: HTMLDivElement | HTMLIFrameElement;
}

const IconCode: FC = () => (
  <svg viewBox="0 0 200 117">
    <path d="M59.688 2.578c-3.438-3.437-8.438-3.437-11.563 0L3.75 48.516c-5 5.937-5 14.062 0 19.062l44.063 45.938c1.562 1.562 4.062 2.5 5.937 2.5s4.063-.938 5.938-2.5c3.437-3.438 3.437-8.438 0-11.563l-42.5-43.437 42.5-44.063c3.437-3.437 3.437-8.437 0-11.875Zm135.937 45.938L151.25 2.578c-3.438-3.437-8.438-3.437-11.563 0-3.125 3.438-3.437 8.438 0 11.563l42.5 44.375-42.5 44.062c-3.437 3.438-3.437 8.438 0 11.563 1.563 1.562 3.438 2.5 5.938 2.5 2.5 0 4.063-.938 5.938-2.5l44.062-45.938c5.625-5.625 5.625-13.75 0-19.687Zm-75.938-45c-4.062-1.563-9.062.937-10.937 5l-34.063 95c-1.562 4.062.938 9.062 5 10.937.938 0 1.563.938 2.5.938 3.438 0 6.563-2.5 7.5-5.938l35-95.937c1.563-4.063-.937-9.063-5-10Z" />
  </svg>
);

const IconCodeExpand: FC = () => (
  <svg viewBox="0 0 200 117">
    <path
      fill="#0288D1"
      d="M59.688 2.578c-3.438-3.437-8.438-3.437-11.563 0L3.75 48.516c-5 5.937-5 14.062 0 19.062l44.063 45.938c1.562 1.562 4.062 2.5 5.937 2.5s4.063-.938 5.938-2.5c3.437-3.438 3.437-8.438 0-11.563l-42.5-43.437 42.5-44.063c3.437-3.437 3.437-8.437 0-11.875Zm135.937 45.938L151.25 2.578c-3.438-3.437-8.438-3.437-11.563 0-3.125 3.438-3.437 8.438 0 11.563l42.5 44.375-42.5 44.062c-3.437 3.438-3.437 8.438 0 11.563 1.563 1.562 3.438 2.5 5.938 2.5 2.5 0 4.063-.938 5.938-2.5l44.062-45.938c5.625-5.625 5.625-13.75 0-19.687Z"
    />
  </svg>
);

const IconExternalLink: FC = () => (
  <svg viewBox="0 0 1024 1024">
    <path d="M853.333 469.333A42.667 42.667 0 0 0 810.667 512v256A42.667 42.667 0 0 1 768 810.667H256A42.667 42.667 0 0 1 213.333 768V256A42.667 42.667 0 0 1 256 213.333h256A42.667 42.667 0 0 0 512 128H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128V512a42.667 42.667 0 0 0-42.667-42.667z" />
    <path d="M682.667 213.333h67.413L481.707 481.28a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.586 0L810.667 273.92v67.413A42.667 42.667 0 0 0 853.333 384 42.667 42.667 0 0 0 896 341.333V170.667A42.667 42.667 0 0 0 853.333 128H682.667a42.667 42.667 0 0 0 0 85.333z" />
  </svg>
);

const IconCodeReact: FC<{
  active: boolean;
}> = (props: { active: boolean }) => (
  <svg viewBox="0 0 1024 1024">
    <path
      d="M512 431.36c43.946667 0 79.786667 35.84 79.786667 80.64 0 42.666667-35.84 78.933333-79.786667 78.933333S432.213333 554.666667 432.213333 512c0-44.8 35.84-80.64 79.786667-80.64M314.453333 853.333333c26.88 16.213333 85.76-8.533333 153.6-72.533333-22.186667-25.173333-43.946667-52.48-64.426666-81.066667a968.533333 968.533333 0 0 1-102.4-15.36c-21.76 91.306667-13.653333 154.026667 13.226666 168.96m30.293334-244.906666l-12.373334-21.76c-4.693333 12.373333-9.386667 24.746667-12.373333 36.693333 11.52 2.56 24.32 4.693333 37.546667 6.826667l-12.8-21.76m279.04-32.426667l34.56-64-34.56-64c-12.8-22.613333-26.453333-42.666667-38.826667-62.72C561.92 384 537.6 384 512 384s-49.92 0-72.96 1.28c-12.373333 20.053333-26.026667 40.106667-38.826667 62.72L365.653333 512l34.56 64c12.8 22.613333 26.453333 42.666667 38.826667 62.72 23.04 1.28 47.36 1.28 72.96 1.28s49.92 0 72.96-1.28c12.373333-20.053333 26.026667-40.106667 38.826667-62.72M512 289.28c-8.106667 9.386667-16.64 19.2-25.173333 30.72h50.346666c-8.533333-11.52-17.066667-21.333333-25.173333-30.72m0 445.44c8.106667-9.386667 16.64-19.2 25.173333-30.72h-50.346666c8.533333 11.52 17.066667 21.333333 25.173333 30.72M709.12 170.666667c-26.453333-16.213333-85.333333 8.533333-153.173333 72.533333 22.186667 25.173333 43.946667 52.48 64.426666 81.066667 34.986667 3.413333 69.546667 8.533333 102.4 15.36 21.76-91.306667 13.653333-154.026667-13.653333-168.96m-29.866667 244.906666l12.373334 21.76c4.693333-12.373333 9.386667-24.746667 12.373333-36.693333-11.52-2.56-24.32-4.693333-37.546667-6.826667l12.8 21.76m61.866667-300.8c62.72 35.84 69.546667 130.133333 43.093333 240.213334 108.373333 32 186.453333 84.906667 186.453334 157.013333s-78.08 125.013333-186.453334 157.013333c26.453333 110.08 19.626667 204.373333-43.093333 240.213334-62.293333 35.84-147.2-5.12-229.12-83.2-81.92 78.08-166.826667 119.04-229.546667 83.2-62.293333-35.84-69.12-130.133333-42.666666-240.213334-108.373333-32-186.453333-84.906667-186.453334-157.013333s78.08-125.013333 186.453334-157.013333c-26.453333-110.08-19.626667-204.373333 42.666666-240.213334 62.72-35.84 147.626667 5.12 229.546667 83.2 81.92-78.08 166.826667-119.04 229.12-83.2M728.746667 512c14.506667 32 27.306667 64 37.973333 96.426667 89.6-26.88 139.946667-65.28 139.946667-96.426667s-50.346667-69.546667-139.946667-96.426667c-10.666667 32.426667-23.466667 64.426667-37.973333 96.426667M295.253333 512c-14.506667-32-27.306667-64-37.973333-96.426667-89.6 26.88-139.946667 65.28-139.946667 96.426667s50.346667 69.546667 139.946667 96.426667c10.666667-32.426667 23.466667-64.426667 37.973333-96.426667m384 96.426667l-12.8 21.76c13.226667-2.133333 26.026667-4.266667 37.546667-6.826667-2.986667-11.946667-7.68-24.32-12.373333-36.693333l-12.373334 21.76m-123.306666 172.373333c67.84 64 126.72 88.746667 153.173333 72.533333 27.306667-14.933333 35.413333-77.653333 13.653333-168.96-32.853333 6.826667-67.413333 11.946667-102.4 15.36-20.48 28.586667-42.24 55.893333-64.426666 81.066667M344.746667 415.573333l12.8-21.76c-13.226667 2.133333-26.026667 4.266667-37.546667 6.826667 2.986667 11.946667 7.68 24.32 12.373333 36.693333l12.373334-21.76m123.306666-172.373333C400.213333 179.2 341.333333 154.453333 314.453333 170.666667c-26.88 14.933333-34.986667 77.653333-13.226666 168.96a968.533333 968.533333 0 0 1 102.4-15.36c20.48-28.586667 42.24-55.893333 64.426666-81.066667z"
      fill={props.active ? '#0288D1' : '#999'}
      p-id="4256"
    ></path>
  </svg>
);

const PreviewerActions: FC<IPreviewerActionsProps> = (props) => {
  const intl = useIntl();
  const files = Object.entries(props.asset.dependencies).filter(([, { type }]) => type === 'FILE');
  const [activeKey, setActiveKey] = useState(0);
  const [showReactCode, setShowReactCode] = useState(false);
  const [showHTMLCode, setShowHTMLCode] = useState(props.forceShowCode || props.defaultShowCode);
  const [htmlCode, setHtmlCode] = useState('');
  const isSingleFile = files.length === 1;
  const lang = (files[activeKey][0].match(/\.([^.]+)$/)?.[1] || 'text') as any;

  // 获取html代码
  useEffect(() => {
    // props.filename是这样的格式: 'docs/example/Message/demos/basicUsage.tsx'
    // 需要得到的html静态文件路径为: '/Message/basicUsage.html'
    const { filename } = props;
    if (!filename) {
      return;
    }
    // 获取组件名称，取docs/example/Message/demos/basicUsage.tsx中的Message
    const componentName = filename.split('/')[2];
    // 获取demo名称，取docs/example/Message/demos/basicUsage.tsx中的basicUsage
    const demoName = filename.split('/').pop()?.split('.').shift();

    const htmlPath = `/${componentName}/${demoName}.html`;

    fetch(htmlPath)
      .then((res) => {
        if (res.status === 200) {
          return res.text();
        }
        return Promise.reject(new Error('文件不存在'));
      })
      .then((html) => {
        setHtmlCode(html);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleHTMLCodeClick = () => {
    if (showHTMLCode) {
      setShowHTMLCode(false);
    } else {
      setShowHTMLCode(true);
      setShowReactCode(false);
    }
  };

  const handleReactCodeClick = () => {
    if (showReactCode) {
      setShowReactCode(false);
    } else {
      setShowReactCode(true);
      setShowHTMLCode(false);
    }
  };

  return (
    <>
      <div className="dumi-default-previewer-actions">
        {!props.disabledActions?.includes('CSB') && (
          <button
            className="dumi-default-previewer-action-btn"
            type="button"
            data-dumi-tooltip={intl.formatMessage({
              id: 'previewer.actions.codesandbox',
            })}
            onClick={() => openCodeSandbox(props)}
          >
            <IconCodeSandbox />
          </button>
        )}
        {!props.disabledActions?.includes('STACKBLITZ') && (
          <button
            className="dumi-default-previewer-action-btn"
            type="button"
            data-dumi-tooltip={intl.formatMessage({
              id: 'previewer.actions.stackblitz',
            })}
            onClick={() => openStackBlitz(props)}
          >
            <IconStackBlitz />
          </button>
        )}

        {!props.disabledActions?.includes('EXTERNAL') && (
          <a
            target="_blank"
            rel="noreferrer"
            href={props.demoUrl}
            className="dumi-default-previewer-action-btn"
            data-dumi-tooltip={intl.formatMessage({
              id: 'previewer.actions.separate',
            })}
          >
            <IconExternalLink />
          </a>
        )}
        {props.extra}
        <PreviewerActionsExtra {...props} />
        {!props.forceShowCode && (
          <>
            <button
              className="dumi-default-previewer-action-btn"
              type="button"
              onClick={handleHTMLCodeClick}
              data-dumi-tooltip={intl.formatMessage({
                id: `previewer.actions.code.${showReactCode ? 'shrink' : 'expand'}`,
              })}
            >
              {showHTMLCode ? <IconCodeExpand /> : <IconCode />}
            </button>
            <button
              className="dumi-default-previewer-action-btn"
              type="button"
              onClick={handleReactCodeClick}
              data-dumi-tooltip={showReactCode ? '收起代码(React)' : '展开代码(React)'}
            >
              {showReactCode ? <IconCodeReact active={true} /> : <IconCodeReact active={false} />}
            </button>
          </>
        )}
      </div>
      {/* Code(HTML) */}
      {showHTMLCode && <SourceCode lang="tsx">{htmlCode}</SourceCode>}

      {/* Code(React) */}
      {showReactCode && (
        <>
          <div className="dumi-default-previewer-sources">
            {!isSingleFile && (
              <Tabs
                className="dumi-default-previewer-tabs"
                prefixCls="dumi-default-tabs"
                moreIcon="···"
                defaultActiveKey={String(activeKey)}
                onChange={(key) => setActiveKey(Number(key))}
                items={files.map(([filename], i) => ({
                  key: String(i),
                  label: filename,
                }))}
              />
            )}
          </div>
          <SourceCode lang={lang}>{files[activeKey][1].value}</SourceCode>
        </>
      )}
    </>
  );
};

export default PreviewerActions;
