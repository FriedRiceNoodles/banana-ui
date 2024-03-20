import './index.css';

const featureItems = [
  {
    title: '跨框架',
    description: '可在原生环境（无框架）、React、Vue、Angular 等各种框架中使用。',
  },
  {
    title: '支持SSR',
    description: '可在各种服务端渲染框架，甚至worker环境下使用。',
  },
  {
    title: '体积小',
    description:
      '<span style="display: flex; align-items:center;">UMD版本仅：<img src="https://img.shields.io/bundlephobia/minzip/@banana-ui/banana" /><span>',
  },
];

export default function Features() {
  return (
    <div className="features-wrapper">
      {featureItems.map((item, index) => {
        return (
          <div key={index} className="feature-item">
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-description" dangerouslySetInnerHTML={{ __html: item.description }}></p>
          </div>
        );
      })}
    </div>
  );
}
