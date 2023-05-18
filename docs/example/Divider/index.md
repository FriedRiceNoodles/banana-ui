---
demo:
  cols: 2
---

# Divider 分割线

## 介绍

区隔内容的分割线。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/customWidth.tsx"></code>
<code src="./demos/customColor.tsx"></code>
<code src="./demos/customSpacing.tsx"></code>
<code src="./demos/vertical.tsx"></code>
<code src="./demos/dashed.tsx"></code>

## 属性 - Attributes & Properties

| 属性     | 说明         | 类型                 | 默认值               |
| -------- | ------------ | -------------------- | -------------------- |
| width    | 分割线的粗细 | `number` \| `string` | '1px'                |
| color    | 分割线的颜色 | `string`             | 'rgb(229, 231, 233)' |
| spacing  | 分割线的间距 | `number` \| `string` | '16px'               |
| vertical | 垂直分割线   | `boolean`            | false                |
| dashed   | 虚线分割线   | `boolean`            | false                |

## 样式变量

| 变量                     | 说明         | 默认值             |
| ------------------------ | ------------ | ------------------ |
| --banana-divider-width   | 分割线的粗细 | 1px                |
| --banana-divider-color   | 分割线的颜色 | rgb(229, 231, 233) |
| --banana-divider-spacing | 分割线的间距 | 16px               |
