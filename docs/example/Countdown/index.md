---
group: 组件
demo:
  cols: 2
---

# Countdown 倒计时

倒计时组件,支持自定义格式化和毫秒级精度.

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/events.tsx"></code>
<code src="./demos/separate.tsx"></code>

## 支持的 format 格式

| 格式 | 说明 |
| ---- | ---- |
| Y    | 年   |
| M    | 月   |
| D    | 日   |
| H    | 时   |
| m    | 分   |
| s    | 秒   |
| S    | 毫秒 |

:::info{title=Tips}
当格式的位数大于剩余时间时，会自动补 0，比如 `HH:mm:ss` 格式，当剩余时间为 1 分钟时，会显示为 `00:01:00`。
再比如 `mm:ss:SSS` 格式，当剩余时间 5 毫秒时，会显示为 `00:00:005`。
:::

## 属性 - Attributes & Properties

| 属性   | 说明                                                   | 类型     | 默认值     |
| ------ | ------------------------------------------------------ | -------- | ---------- |
| time   | 倒计时                                                 | `number` | 0          |
| format | 格式化倒计时展示，参考[day.js](https://day.js.org/en/) | `string` | `HH:mm:ss` |

## 事件 - Events

| 事件   | 说明                             | Event Detail           |
| ------ | -------------------------------- | ---------------------- |
| change | 倒计时变化时触发，并返回剩余时间 | `{ timeLeft: number }` |
| finish | 倒计时结束时触发                 | -                      |

## 插槽 - Slots

| 插槽      | 说明                                                             |
| --------- | ---------------------------------------------------------------- |
| separator | 分隔符，可用于自定义分隔符，如 `<span slot="separator">:</span>` |

## CSS Parts

| Part          | 说明                                     |
| ------------- | ---------------------------------------- |
| base          | 包裹组件的容器                           |
| separate-item | 启用了 separate 属性时，倒计时的一个部分 |
| separator     | 分隔符                                   |

## 样式变量

| 变量                           | 说明     | 默认值          |
| ------------------------------ | -------- | --------------- |
| --banana-countdown-font-size   | 字体大小 | 24px            |
| --banana-countdown-font-weight | 字体粗细 | 400             |
| --banana-countdown-color       | 字体颜色 | rgb(46, 50, 56) |
