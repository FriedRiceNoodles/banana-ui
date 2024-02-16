---
group: 组件
---

# Popup 弹层

## 介绍

一个从屏幕边缘弹出的弹层。

## 代码演示

<code src="./demos/BasicUsage.tsx"></code>

## 属性 - Attributes & Properties

| 属性     | 说明                | 类型                                               | 默认值   |
| -------- | ------------------- | -------------------------------------------------- | -------- |
| open     | 弹层是否可见        | `boolean`                                          | false    |
| position | 弹层弹出的方向      | `'top' \| 'right' \| 'bottom' \| 'left' \| bottom` | 'bottom' |
| zIndex   | 设置弹层的`z-index` | `number`                                           | 999      |

## 方法 - Methods

| 方法   | 说明     | 参数 |
| ------ | -------- | ---- |
| show() | 展示弹层 | -    |
| hide() | 隐藏弹层 | -    |

## 事件 - Events

| 方法  | 说明                           | Event Detail |
| ----- | ------------------------------ | ------------ |
| close | 点击蒙层或按下 Escape 键的回调 | -            |

## 插槽 - Slots

| 插槽      | 说明                                |
| --------- | ----------------------------------- |
| (default) | 可填入任意 DOM 结构，作为弹层的内容 |

## CSS Parts

| Part      | 说明                 |
| --------- | -------------------- |
| container | 放置默认 slot 的容器 |

## 样式变量

| 变量                        | 说明           | 默认值             |
| --------------------------- | -------------- | ------------------ |
| --banana-overlay-background | 弹层的背景颜色 | rgba(0, 0, 0, 0.5) |

:::info{title=Tips}
弹层组件依赖于[Overlay 遮罩层组件](/example/overlay)，因此使用遮罩层组件的样式变量。
:::

## 依赖

- [Overlay 遮罩层组件](/example/overlay)
