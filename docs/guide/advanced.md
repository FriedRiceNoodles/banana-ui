---
group: 指南
order: 3
---

# 进阶

## 插槽 Slots

Banana 中有许多组件使用了插槽，它可以让你自定义组件的内容。
最常被使用的是默认插槽，当你在组件的闭合标签中写入内容时，它会被渲染到默认插槽中。

```html
<b-button>Banana</b-button>
```

有时你也会使用到[具名插槽(named slots)](https://lit.dev/docs/v2/components/shadow-dom/#using-named-slots)。Banana 的 [Dropdown 组件](/example/dropdown)是一个典型的使用了具名插槽的例子。

```html
<b-dropdown>
  <b-button>Banana</b-button>
  <b-menu slot="drop">
    <b-menu-item>Apple</b-menu-item>
    <b-menu-item>Orange</b-menu-item>
  </b-menu>
</b-dropdown>
```

结果：

```tsx | inline
import { Button, Dropdown, Menu, MenuItem } from '@banana-ui/react';

export default function App() {
  return (
    <Dropdown>
      {/* 默认插槽 */}
      <Button>Banana</Button>
      {/* 具名插槽 */}
      <Menu slot="drop">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Orange</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

## 主题定制

Banana 是基于 Web Components 构建的组件库，在此基础上，你可以通过[CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)和[Part](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)来定制组件的样式。

> 为了实现样式隔离，Banana 的组件都使用了 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)。因此，传统的 CSS 选择器可能无法直接作用于组件内部。所以你会需要使用 CSS 变量和 Part 实现对组件样式的修改。

### CSS 变量

总体来说，Banana 的样式由特定的设计变量(Design Tokens)控制，因此你可以通过`CSS变量`修改这些设计变量，从而改变组件库的整体样式。

```css
/* 修改全局样式 */
:root {
  --banana-color-primary: #138b7b;
  --banana-color-primary-hover: #0f6e5c;
  --banana-color-primary-active: #0a4a3d;
}

/* 修改单个组件样式 */
b-button {
  --banana-color-primary: #138b7b;
  --banana-color-primary-hover: #0f6e5c;
  --banana-color-primary-active: #0a4a3d;
}
```

```tsx | inline
import { Button } from '@banana-ui/react';

export default function App() {
  return (
    <Button
      type="primary"
      style={
        {
          '--banana-color-primary': '#138b7b',
          '--banana-color-primary-hover': '#0f6e5c',
          '--banana-color-primary-active': '#0a4a3d',
        } as React.CSSProperties
      }
    >
      Banana
    </Button>
  );
}
```

除了全局性的 CSS 变量，组件库中的每个组件都有自己的 CSS 变量，你可以通过查看组件的文档来了解它们。

### CSS Parts

当你需要对特定的某个组件及其特定的部分进行样式修改时，你会需要用到[Part 选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)。

```html
<b-button id="banana" type="primary">Banana</b-button>

<style>
  #banana::part(base) {
    font-size: 20px;
  }
</style>
```

<b-button id="banana" type="primary">Banana</b-button>

<style>
  #banana::part(base) {
    font-size: 20px;
  }
</style>

## 防止 FOUC

TODO

## 渲染和更新

TODO
