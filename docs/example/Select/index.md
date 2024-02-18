---
group: 组件
demo:
  cols: 2
---

# Select 选择器

:::info

```
<b-select> | Select
```

:::

下拉选择框，可以从预定的选项中选择一个或多个选项。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/Multiple.tsx"></code>
<code src="./demos/Clearable.tsx"></code>
<code src="./demos/Size.tsx"></code>
<code src="./demos/formTest.tsx"></code>
<code src="./demos/Disabled.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                                            | 说明                                                                                                                                                                                                                                                                                   | 类型                                 | 默认值     |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------- |
| value                                                           | 选择器当前选中的选项，在单选模式下类型是`string`，在多选模式下类型是`string[]`。考虑在原生环境下无法通过 attribute 传入`string[]`，所以在原生环境下，开启了多选模式时，`value`的类型也是`string`。 此时，`value`的值是以空格分隔的字符串。组件内部会以空格分割字符串，把它转换成数组。 | `string` \| `string[]`               | `''`       |
| defaultValue <br /> (default-value)                             | 默认选中的选项                                                                                                                                                                                                                                                                         | `string` \| `string[]`               | `''`       |
| disabled                                                        | 是否禁用选择器                                                                                                                                                                                                                                                                         | `boolean`                            | `false`    |
| placeholder                                                     | 选择器的默认文本符                                                                                                                                                                                                                                                                     | `string`                             | -          |
| size                                                            | 选择器的尺寸                                                                                                                                                                                                                                                                           | `'small'` \| `'medium'` \| `'large'` | `'medium'` |
| margin                                                          | 选择器与展开内容的间距（单位：px）                                                                                                                                                                                                                                                     | `number`                             | `4`        |
| disableAutoAdjustOverflow <br /> (disable-auto-adjust-overflow) | 禁用超出视口时自动调整弹出位置                                                                                                                                                                                                                                                         | `boolean`                            | `false`    |
| disableWidthSync <br /> (disable-width-sync)                    | 禁用同步宽度。默认情况下，选择器的宽度会跟随最宽的选项的宽度。                                                                                                                                                                                                                         | `boolean`                            | `false`    |
| multiple                                                        | 是否开启多选模式                                                                                                                                                                                                                                                                       | `boolean`                            | `false`    |
| clearable                                                       | 是否显示清除按钮                                                                                                                                                                                                                                                                       | `boolean`                            | `false`    |
| noHideOnClear <br /> (no-hide-on-clear)                         | 清除按钮被点击时，是否隐藏展开内容                                                                                                                                                                                                                                                     | `boolean`                            | `false`    |
| defaultOpen <br /> (default-open)                               | 默认展开选择器                                                                                                                                                                                                                                                                         | `boolean`                            | `false`    |
| name                                                            | 用于表单提交的字段名                                                                                                                                                                                                                                                                   | `string`                             | -          |
| form                                                            | 可以传入一个 id, 用于指定所属表单                                                                                                                                                                                                                                                      | `string`                             | -          |
| required                                                        | 是否必填                                                                                                                                                                                                                                                                               | `boolean`                            | `false`    |
| controlled                                                      | 是否受控                                                                                                                                                                                                                                                                               | `boolean`                            | `false`    |

## 方法 - Methods

| 方法   | 说明       | 参数 |
| ------ | ---------- | ---- |
| show() | 展开选择器 | -    |
| hide() | 收起选择器 | -    |

## 事件 - Events

| 事件      | 说明                     | Event Detail                  |
| --------- | ------------------------ | ----------------------------- |
| change    | 选中的选项发生变化时触发 | `{value: string \| string[]}` |
| show      | 展开选择器时触发         | -                             |
| hide      | 收起选择器时触发         | -                             |
| afterShow | 展开选择器后触发         | -                             |
| afterHide | 收起选择器后触发         | -                             |

## 插槽 - Slots

| 插槽      | 说明           |
| --------- | -------------- |
| (default) | 默认插槽的说明 |
| title     | 标题区域       |

## CSS Parts

| Part   | 说明               |
| ------ | ------------------ |
| base   | 包裹组件的容器     |
| header | 组件的 header 区域 |

## 样式变量

| 变量                         | 说明               | 默认值 |
| ---------------------------- | ------------------ | ------ |
| --banana-xxx-title-padding   | 标题的 padding     | 16px   |
| --banana-xxx-content-padding | 展开区域的 padding | 16px   |
