---
group: 组件
demo:
  cols: 2
---

# Menu 菜单

```
<b-menu> | Menu
```

## 介绍

菜单提供了一个选项/操作列表供用户选择。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/disabled.tsx"></code>
<code src="./demos/event.tsx"></code>

## 属性 (MenuItem 菜单子项) - Attributes & Properties

| 属性     | 说明                | 类型    | 默认值 |
| -------- | ------------------- | ------- | ------ |
| value    | MenuItem 的唯一标识 | string  | -      |
| disabled | MenuItem 是否禁用   | boolean | false  |

## 事件 - Events

| 事件   | 说明       | Event Detail              |
| ------ | ---------- | ------------------------- |
| select | 选中时触发 | `{item: {value: string}}` |

## 插槽 - Slots

| 插槽      | 说明       |
| --------- | ---------- |
| (default) | 菜单的内容 |

## 插槽（MenuItem 菜单子项） - Slots

| 插槽      | 说明                                                 |
| --------- | ---------------------------------------------------- |
| (default) | 菜单子项的内容，一般写入 MenuItem 或者分割线 Divider |

## CSS Parts (MenuItem 菜单子项)

| Part | 说明           |
| ---- | -------------- |
| base | 包裹组件的容器 |

## 样式变量

| 变量                     | 说明           | 默认值                       |
| ------------------------ | -------------- | ---------------------------- |
| --banana-menu-background | 菜单的背景颜色 | #fff                         |
| --banana-menu-border     | 菜单边框样式   | 1px solid rgb(229, 231, 233) |
| --banana-menu-padding    | 菜单内边距     | 6px 0                        |
