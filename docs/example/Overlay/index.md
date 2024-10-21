---
group: 组件
---

# Overlay 遮罩层组件

```
<b-overlay> | Overlay
```

## 介绍

这是一个遮罩层，可往其中放入子元素。

## 代码演示

<code src="./demos/OverlayBaseUse.tsx"></code>
<code src="./demos/OverlayWithContent.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                                      | 说明                      | 类型      | 默认值 |
| --------------------------------------------------------- | ------------------------- | --------- | ------ |
| open                                                      | 遮罩层是否可见            | `boolean` | false  |
| zIndex                                                    | 设置遮罩层的`z-index`     | `number`  | 999    |
| noCloseWhenMaskClicked <br/> (no-close-when-mask-clicked) | 点击遮罩层不触发关闭事件  | `boolean` | false  |
| noCloseWhenEscPressed <br/> (no-close-when-esc-pressed)   | 按下`Esc`键不触发关闭事件 | `boolean` | false  |

## 方法 - Methods

| 方法   | 说明       | 参数 |
| ------ | ---------- | ---- |
| show() | 展示遮罩层 | -    |
| hide() | 隐藏遮罩层 | -    |

## 事件 - Events

| 方法  | 说明                             | Event Detail |
| ----- | -------------------------------- | ------------ |
| close | 点击遮罩层或按下 Escape 键的回调 | -            |

## 插槽 - Slots

| 插槽      | 说明                                    |
| --------- | --------------------------------------- |
| (default) | 可填入任意 DOM 结构，居中在遮罩层里显示 |

## CSS Parts

| Part      | 说明                 |
| --------- | -------------------- |
| container | 放置默认 slot 的容器 |

## 样式变量

| 变量                        | 说明             | 默认值             |
| --------------------------- | ---------------- | ------------------ |
| --banana-overlay-background | 遮罩层的背景颜色 | rgba(0, 0, 0, 0.5) |
