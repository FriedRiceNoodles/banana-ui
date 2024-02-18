---
group: 组件
demo:
  cols: 2
---

# Progress 进度条

:::info

```
<b-progress> | Progress
```

:::

可用于展示操作的进度，或用于电商的活动场景。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/customColor.tsx"></code>
<code src="./demos/customHeight.tsx"></code>
<code src="./demos/dynamic.tsx"></code>

## 属性 - Attributes & Properties

| 属性            | 说明         | 类型     | 默认值 |
| --------------- | ------------ | -------- | ------ |
| percent         | 进度值       | `number` | -      |
| color           | 进度条颜色   | `string` | -      |
| backgroundColor | 进度条背景色 | `string` | -      |
| height          | 进度条高度   | `number` | -      |

## CSS Parts

| Part | 说明           |
| ---- | -------------- |
| base | 包裹组件的容器 |

## 样式变量

| 变量                               | 说明                             | 默认值                                          |
| ---------------------------------- | -------------------------------- | ----------------------------------------------- |
| --banana-progress-percent          | 进度条进度，用于控制进度条的长度 | `0%`                                            |
| --banana-progress-color            | 进度条颜色                       | `rgb(0, 90, 224)`                               |
| --banana-progress-background-color | 进度条背景色                     | `rgb(229, 231, 233)`                            |
| --banana-progress-height           | 进度条高度                       | `10px`                                          |
| --banana-progress-border-radius    | 进度条圆角                       | `calc(var(--banana-progress-height, 10px) / 2)` |
