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

## Attribute 和 Property

如果你使用 Google 翻译，你会发现 [Attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes) 和 Property 都被翻译成了属性，但实际上它们并不是等价的。

简单来说，Attribute 是 HTML 标签上的属性，而 Property 是 DOM 对象上的属性。

对于 Banana UI 而言，我们会把 Attribute 和 Property 以一定的规则互相转换。转换的规则取决于具体组件属性的类型。

- 如果属性是字符串类型，那么 Attribute 和 Property 是等价的。
- \*如果属性是数字类型，那么 Attribute 在被转换成 Property 时会被自动转换成数字类型（如果可以的话）。
- 如果属性是布尔类型，那么 Attribute 出现在标签上就表示为 true，不出现就表示为 false。
- 如果属性是对象或者数组类型，那么 Attribute 和 Property 的转换相当于 JSON.stringify 和 JSON.parse。

举个例子：

```html
/* disabled 为 true */
<b-button disabled>按钮</b-button>
/* disabled 仍然为 true */
<b-button disabled="false">按钮</b-button>
```

:::info
这样的规则是基于 html 标签只能写入字符串这一限制，如果你是 React 用户，使用`@banana-ui/react`，则可以无视这些规则。
具体规则请查看[这里](https://lit.dev/docs/v2/components/properties/#conversion-type)，并以组件文档为准。
:::

在 html 标签中传入对象或数组类型的属性时，需要使用`JSON.stringify`，如：

```html
<b-button data='{"name": "banana"}'>按钮</b-button>
```

这种场景我们推荐直接修改 Property，如：

```javascript
const button = document.querySelector('b-button');
button.data = { name: 'banana' };
```

## 监听事件

你可以像监听普通的 DOM 事件一样监听 Banana 组件的事件。

```javascript
const button = document.querySelector('b-button');
button.addEventListener('click', () => {
  console.log('Hello Banana');
});
```

:::info
对于 React 用户，使用`@banana-ui/react`，事件的名称会被转换为符合 [React 事件命名规范](https://react.dev/learn/responding-to-events#naming-event-handler-props)的形式。如`afterHide`会被转换为`onAfterHide`。
:::

## 方法调用

有些组件会暴露一些方法，你可以通过调用这些方法来实现一些功能。

```javascript
const collapse = document.querySelector('b-collapse');
collapse.show();
```

## 服务端渲染（SSR）支持

详情请查看 [服务端渲染（SSR）支持](/guide/SSR)。

## 组件列表

<a href="/example/button"><b-button type="primary">组件列表</b-button></a>
