---
group: 指南
order: 1
---

# 快速上手

`Banana UI` 是一套底层基于 `Web Components` 的组件库，它提供了一套常用的组件。

## ⭐️ 特性

- 🧩 **可用于几乎任何 Web 框架（React、Vue、以及其他...）**
- 🌐 **可用于原生环境（无框架）**
- 🚀 **支持 SSR（甚至能用于 worker 环境）**
- 🛡 良好的 TypeScript 支持
- 📱 适用于 PC 端，移动端也可用
- 🧪 完善的单元测试

## 安装/引入

```html
<script src="https://cdn.jsdelivr.net/npm/@banana-ui/banana/umd/index.js"></script>
```

React 用户：

```bash
npm i @banana-ui/react
```

详细的安装/引入方式请查看 [安装](/guide/installation)。

## 使用

```html
<b-button type="primary">Hello Banana</b-button>
```

React 用户：

```jsx | pure
import { Button } from '@banana-ui/react';

export default function App() {
  return <Button type="primary">Hello Banana</Button>;
}
```

然后你就得到了一个按钮。

```jsx
import { Button } from '@banana-ui/react';

export default function App() {
  return <Button type="primary">Hello Banana</Button>;
}
```

## 服务端渲染（SSR）支持

详情请查看 [服务端渲染（SSR）支持](/guide/SSR)。

## 组件列表

<a href="/example/button"><b-button type="primary">组件列表</b-button></a>
