---
group: 组件
demo:
  cols: 2
---

# Switch 开关 <Badge>表单组件</Badge>

```
<b-switch> | Switch
```

表示开关状态/两种状态之间的切换时；

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/withContent.tsx"></code>
<code src="./demos/disabled.tsx"></code>
<code src="./demos/size.tsx"></code>
<code src="./demos/formTest.tsx"></code>

## 属性 - Attributes & Properties

| 属性           | 说明                              | 类型                     | 默认值      |
| -------------- | --------------------------------- | ------------------------ | ----------- |
| checked        | 是否选中                          | `boolean`                | false       |
| defaultChecked | 默认是否选中                      | `boolean`                | false       |
| disabled       | 是否禁用                          | `boolean`                | false       |
| readonly       | 是否只读                          | `boolean`                | false       |
| name           | 用于表单提交的字段名              | `string`                 | -           |
| size           | 尺寸                              | `'small'` \| `'default'` | `'default'` |
| required       | 是否必填                          | `boolean`                | false       |
| controlled     | 是否受控                          | `boolean`                | false       |
| form           | 可以传入一个 id, 用于指定所属表单 | `string`                 | -           |

## 事件 - Events

| 事件   | 说明               | Event Detail           |
| ------ | ------------------ | ---------------------- |
| change | checked 变化时触发 | `{ checked: boolean }` |

## 插槽 - Slots

| 插槽      | 说明                              |
| --------- | --------------------------------- |
| checked   | 开关为 checked 状态时展示的内容   |
| unchecked | 开关为 unchecked 状态时展示的内容 |

## CSS Parts

| Part    | 说明                                        |
| ------- | ------------------------------------------- |
| base    | 包裹组件的容器                              |
| control | 开关的 control 部分，也就是开关移动的小圆点 |
| inner   | 开关有内容的时候，存放内容的容器            |

## 样式变量

| 变量                                        | 说明                                     | 默认值              |
| ------------------------------------------- | ---------------------------------------- | ------------------- |
| --banana-switch-gap                         | 开关的 control 与容器的 padding          | 2px                 |
| --banana-color-text                         | 开关的文字的颜色                         | #fff                |
| --banana-font-size                          | 开关的字体大小                           | 14px                |
| --banana-font-family                        | 开关的字体                               | inherit             |
| --banana-switch-width                       | 开关容器的最小宽度                       | 44px                |
| --banana-switch-height                      | 开关容器的高度                           | 22px                |
| --banana-switch-background-no-checked       | 开关不是 checked 状态时的背景颜色        | rgba(0, 0, 0, 0.25) |
| --banana-switch-background-no-checked-hover | 开关不是 checked 状态时 hover 的背景颜色 | rgba(0, 0, 0, 0.45) |
| --banana-switch-background-checked          | 开关是 checked 状态背景颜色              | #1677ff             |
| --banana-switch-control-size                | 开关的 control 的大小                    | 18px                |
| --banana-inner-gap                          | 开关的 control 与容器间的间距            | 2px                 |
