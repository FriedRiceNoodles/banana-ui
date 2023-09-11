---
group: 组件
demo:
  cols: 2
---

# Rating 评分

评分组件.

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/halfAllowed.tsx"></code>
<code src="./demos/readonly.tsx"></code>
<code src="./demos/precision.tsx"></code>
<code src="./demos/character.tsx"></code>
<code src="./demos/disabled.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                | 说明                             | 类型      | 默认值 |
| ----------------------------------- | -------------------------------- | --------- | ------ |
| value                               | 当前分数                         | `number`  | 0      |
| defaultValue <br /> (default-value) | 默认值                           | `number`  | 0      |
| halfAllowed <br /> (half-allowed)   | 是否允许半星                     | `boolean` | false  |
| readonly                            | 是否只读                         | `boolean` | false  |
| precision                           | 精确模式，建议搭配`readonly`使用 | `boolean` | false  |
| character                           | 自定义符号                       | `string`  | -      |

## CSS Parts

| Part | 说明           |
| ---- | -------------- |
| base | 包裹组件的容器 |

## 样式变量

| 变量                                    | 说明                         | 默认值             |
| --------------------------------------- | ---------------------------- | ------------------ |
| --banana-rating-symbol-color            | 被点亮的星星（符号）的颜色   | rgb(253, 166, 51)  |
| --banana-rating-symbol-background-color | 没被点亮的星星（符号）的颜色 | rgb(179, 182, 183) |
| --banana-rating-symbol-size             | 星星（符号）的大小           | 24px               |
| --banana-rating-symbol-spacing          | 星星（符号）的间距           | 8px                |
| --banana-rating-transition-duration     | 过渡动画的时长               | 150ms              |
