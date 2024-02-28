---
group: 指南
order: 3
---

# 进阶

## 插槽 Slot

Banana 中有许多组件使用了插槽，它可以让你自定义组件的内容。
最常被使用的是默认插槽，当你在组件的闭合标签中写入内容时，它会被渲染到默认插槽中。

```html
<b-button>Banana</b-button>
```

有时你也会使用到[具名插槽(named slot)](https://lit.dev/docs/v1/components/templates/#use-named-slots)。Banana 的 Dropdown 组件是一个典型的使用了具名插槽的例子。

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

```tsx
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

## 防止 FOUC

## 渲染和更新
