---
group: 指南
order: 4
---

# React

Banana UI 提供了一个专门为 React 用户准备的版本，它对 React 做了专门的适配，可以更好地和 React 配合使用。

## 安装

```bash
npm i @banana-ui/react
```

## 使用

```jsx | pure
import { Button } from '@banana-ui/react';

export default function App() {
  return <Button type="primary">Hello Banana</Button>;
}
```

## 使用 React 版本有什么好处？与原生版本有什么区别？

1. **React 组件**：暴露了一套 React 组件，使用`<Button>`而不是`<b-button>`来声明组件，更符合 React 的开发习惯。
2. **属性**：在 React 中，我们使用`props`而不是`attribute`，所以你可以传递任何类型的参数给组件，而不用关心烦人的[转换规则](/guide/quick-start#attribute-和-property)。
3. **事件**：我们对组件事件做了适配，事件的名称会被转换为符合 [React 事件命名规范](https://react.dev/learn/responding-to-events#naming-event-handler-props)的形式。如`afterHide`会被转换为`onAfterHide`。
4. **类型支持**：使用 TypeScript 的用户会得到更好的类型支持。

## 怎么实现的？

我们使用了[@lit/react](https://github.com/lit/lit/blob/HEAD/packages/react/README.md)。
