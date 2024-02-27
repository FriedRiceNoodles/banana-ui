---
group: 组件
demo:
  cols: 2
---

# Radio 单选框 <Badge>表单组件</Badge>

```
<b-radio> | Radio
```

:::info

Radio 必须配合 RadioGroup 使用。
:::

单选框。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/sizes.tsx"></code>
<code src="./demos/disabled.tsx"></code>
<code src="./demos/vertical.tsx"></code>
<code src="./demos/formTest.tsx"></code>

## 属性 - Attributes & Properties

### RadioGroup

| 属性                                | 说明                 | 类型      | 默认值  |
| ----------------------------------- | -------------------- | --------- | ------- |
| value                               | 选中值               | `string`  | -       |
| defaultValue <br /> (default-value) | 默认选中值           | `string`  | -       |
| disabled                            | 是否禁用             | `boolean` | `false` |
| vertical                            | 是否垂直             | `boolean` | `false` |
| name                                | 用于表单提交的字段名 | `string`  | -       |
| required                            | 是否必填             | `boolean` | `false` |
| controlled                          | 是否受控             | `boolean` | `false` |
| readonly                            | 是否只读             | `boolean` | `false` |

### Radio

| 属性     | 说明                     | 类型                                 | 默认值     |
| -------- | ------------------------ | ------------------------------------ | ---------- |
| value    | 用于判断当前选中状态的值 | `string`                             | -          |
| disabled | 是否禁用                 | `boolean`                            | `false`    |
| size     | 尺寸                     | `'small'` \| `'medium'` \| `'large'` | `'medium'` |

## 事件 - Events

| 事件   | 说明             | Event Detail        |
| ------ | ---------------- | ------------------- |
| change | 选中值改变时触发 | `{ value: string }` |

## 插槽 - Slots

### RadioGroup

| 插槽      | 说明           |
| --------- | -------------- |
| (default) | 用于放置 Radio |

### Radio

| 插槽      | 说明             |
| --------- | ---------------- |
| (default) | Radio 的文本内容 |

## CSS Parts

### RadioGroup

| Part | 说明                   |
| ---- | ---------------------- |
| base | 包裹 RadioGroup 的容器 |

### Radio

| Part    | 说明                   |
| ------- | ---------------------- |
| base    | 包裹 Radio 的容器      |
| control | Radio 的控制器(选中框) |
| label   | Radio 的文本内容区域   |

## 样式变量

### RadioGroup

| 变量                              | 说明                    | 默认值 |
| --------------------------------- | ----------------------- | ------ |
| --banana-radio-group-vertical-gap | 垂直布局时的 Radio 间距 | `8px`  |

### Radio

| 变量                                  | 说明                         | 默认值                   |
| ------------------------------------- | ---------------------------- | ------------------------ |
| --banana-radio-margin-right           | Radio 右间距                 | `8px`                    |
| --banana-radio-label-padding          | Radio 文本区域的内边距       | `0 0.5em`                |
| --banana-radio-control-border-color   | 选中框的边框颜色             | `rgba(154, 154, 154, 1)` |
| --banana-radio-control-size-small     | 尺寸为 small 时选中框大小    | `12px`                   |
| --banana-radio-control-size-medium    | 尺寸为 medium 时选中框大小   | `16px`                   |
| --banana-radio-control-size-large     | 尺寸为 large 时选中框大小    | `20px`                   |
| --banana-radio-label-font-size-small  | 尺寸为 small 时文本字体大小  | `14px`                   |
| --banana-radio-label-font-size-medium | 尺寸为 medium 时文本字体大小 | `16px`                   |
| --banana-radio-label-font-size-large  | 尺寸为 large 时文本字体大小  | `20px`                   |
