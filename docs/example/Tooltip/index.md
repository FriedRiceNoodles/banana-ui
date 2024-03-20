---
group: 组件
demo:
  cols: 2
---

# Tooltip 文字提示

```
<b-tooltip> | Tooltip
```

简单的文字提示气泡框。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/placement.tsx"></code>
<code src="./demos/triggerAction.tsx"></code>
<code src="./demos/noArrow.tsx"></code>
<code src="./demos/empty.tsx"></code>
<code src="./demos/maxWidth.tsx"></code>
<code src="./demos/backgroundColor.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                                            | 说明                            | 类型                 | 默认值                |
| --------------------------------------------------------------- | ------------------------------- | -------------------- | --------------------- |
| content                                                         | 提示内容                        | `boolean`            | ''                    |
| placement                                                       | 弹出位置                        | `Placement`          | 'top'                 |
| disableAutoAdjustOverflow <br /> (disable-auto-adjust-overflow) | 禁用自动调整弹出位置            | `boolean`            | false                 |
| maxWidth <br /> (max-width)                                     | 气泡的最大宽度                  | `number \| string `  | '300px'               |
| backgroundColor <br /> (background-color)                       | 气泡的背景颜色                  | `string`             | 'rgba(46, 50 ,56, 1)' |
| margin                                                          | 气泡与触发元素（trigger）的距离 | `number`             | 8                     |
| mouseEnterDelay <br /> (mouse-enter-delay)                      | 鼠标移入后延时多少才显示        | `number`             | 100                   |
| mouseLeaveDelay <br /> (mouse-leave-delay)                      | 鼠标移出后延时多少才隐藏        | `number`             | 100                   |
| triggerAction <br /> (trigger-action)                           | 触发行为                        | `'hover' \| 'click'` | 'hover'               |
| noArrow                                                         | 是否隐藏箭头                    | `boolean`            | false                 |

```typescript
export type Placement =
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'rightTop'
  | 'right'
  | 'rightBottom';
```

## 事件 - Events

| 事件      | 说明           | Event Detail |
| --------- | -------------- | ------------ |
| show      | 开始弹出时触发 | -            |
| hide      | 开始隐藏时触发 | -            |
| afterShow | 弹出完成时触发 | -            |
| afterHide | 隐藏完成时触发 | -            |

## 插槽 - Slots

| 插槽      | 说明               |
| --------- | ------------------ |
| (default) | 文字提示的 trigger |
| content   | 气泡内容区域       |
| arrow     | 气泡箭头区域       |

## CSS Parts

| Part    | 说明           |
| ------- | -------------- |
| base    | 包裹组件的容器 |
| drop    | 包裹气泡的容器 |
| content | 气泡内容区域   |
| arrow   | 气泡箭头区域   |

## 样式变量

| 变量                              | 说明           | 默认值              |
| --------------------------------- | -------------- | ------------------- |
| --banana-tooltip-padding          | 气泡的 padding | 4px 6px             |
| --banana-tooltip-background-color | 气泡的背景颜色 | rgba(46, 50, 56, 1) |
| --banana-tooltip-color            | 气泡的文字颜色 | #fff                |
| --banana-tooltip-font-size        | 气泡的文字大小 | 14px                |
| --banana-tooltip-border-radius    | 气泡的圆角大小 | 4px                 |
| --banana-tooltip-max-width        | 气泡的最大宽度 | 300px               |
