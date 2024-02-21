---
group: 组件
demo:
  cols: 2
---

# Checkbox 复选框

```
<b-checkbox> | Checkbox
```

复选框。又称多选框。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/sizes.tsx"></code>
<code src="./demos/disabled.tsx"></code>
<code src="./demos/readonly.tsx"></code>
<code src="./demos/indeterminate.tsx"></code>
<code src="./demos/formTest.tsx"></code>

## 属性 - Attributes & Properties

| 属性           | 说明                              | 类型                                 | 默认值     |
| -------------- | --------------------------------- | ------------------------------------ | ---------- |
| checked        | 是否选中                          | `boolean`                            | false      |
| defaultChecked | 默认是否选中                      | `boolean`                            | false      |
| size           | 尺寸                              | `'small'` \| `'medium'` \| `'large'` | `'medium'` |
| disabled       | 是否禁用                          | `boolean`                            | false      |
| readonly       | 是否只读                          | `boolean`                            | false      |
| indeterminate  | 是否不定                          | `boolean`                            | false      |
| name           | 用于表单提交的字段名              | `string`                             | -          |
| required       | 是否必填                          | `boolean`                            | false      |
| controlled     | 是否受控                          | `boolean`                            | false      |
| form           | 可以传入一个 id, 用于指定所属表单 | `string`                             | -          |

## 事件 - Events

| 事件   | 说明               | Event Detail           |
| ------ | ------------------ | ---------------------- |
| change | checked 变化时触发 | `{ checked: boolean }` |

## 插槽 - Slots

| 插槽      | 说明                     |
| --------- | ------------------------ |
| (default) | 复选框的 label(文字内容) |

## CSS Parts

| Part    | 说明                                                      |
| ------- | --------------------------------------------------------- |
| base    | 包裹组件的容器                                            |
| control | 复选框的 control 部分，也就是 checkbox 的图标(那个小方块) |
| label   | 复选框的 label 部分，也就是文字内容                       |

## 样式变量

| 变量                                      | 说明                                | 默认值                 |
| ----------------------------------------- | ----------------------------------- | ---------------------- |
| --banana-color-primary                    | 主色                                | rgba(0, 90, 224, 1)    |
| --banana-checkbox-control-border-color    | control 的边框颜色                  | rgba(151, 154, 154, 1) |
| --banana-checkbox-control-checkmark-color | control 的选中符号颜色              | #fff                   |
| --banana-checkbox-control-size-small      | 尺寸为 small 时的 control 的尺寸    | 12px                   |
| --banana-checkbox-control-size-medium     | 尺寸为 medium 时的 control 的尺寸   | 16px                   |
| --banana-checkbox-control-size-large      | 尺寸为 large 时的 control 的尺寸    | 20px                   |
| --banana-checkbox-label-font-size-small   | 尺寸为 small 时的 label 的字体大小  | 14px                   |
| --banana-checkbox-label-font-size-medium  | 尺寸为 medium 时的 label 的字体大小 | 16px                   |
| --banana-checkbox-label-font-size-large   | 尺寸为 large 时的 label 的字体大小  | 20px                   |
| --banana-checkbox-label-margin-left-small | 尺寸为 small 时的 label 的左边距    | 0.5em                  |
