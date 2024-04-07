---
group: 组件
demo:
  cols: 2
---

# Select 选择器 <Badge>表单组件</Badge>

```
<b-select> | Select
```

下拉选择框，可以从预定的选项中选择一个或多个选项。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/Multiple.tsx"></code>
<code src="./demos/filter.tsx"></code>
<code src="./demos/Clearable.tsx"></code>
<code src="./demos/Size.tsx"></code>
<code src="./demos/formTest.tsx"></code>
<code src="./demos/customIcons.tsx"></code>
<code src="./demos/Disabled.tsx"></code>

## 属性 - Attributes & Properties

### Select

| 属性                                                            | 说明                                                                                                                                                                                                                                                                                   | 类型                                 | 默认值     |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------- |
| value                                                           | 选择器当前选中的选项，在单选模式下类型是`string`，在多选模式下类型是`string[]`。考虑在原生环境下无法通过 attribute 传入`string[]`，所以在原生环境下，开启了多选模式时，`value`的类型也是`string`。 此时，`value`的值是以空格分隔的字符串。组件内部会以空格分割字符串，把它转换成数组。 | `string` \| `string[]`               | -          |
| defaultValue <br /> (default-value)                             | 默认选中的选项                                                                                                                                                                                                                                                                         | `string` \| `string[]`               | -          |
| disabled                                                        | 是否禁用选择器                                                                                                                                                                                                                                                                         | `boolean`                            | false      |
| placeholder                                                     | 选择器的默认文本符                                                                                                                                                                                                                                                                     | `string`                             | -          |
| size                                                            | 选择器的尺寸                                                                                                                                                                                                                                                                           | `'small'` \| `'medium'` \| `'large'` | `'medium'` |
| margin                                                          | 选择器与展开内容的间距（单位：px）                                                                                                                                                                                                                                                     | `number`                             | 4          |
| disableAutoAdjustOverflow <br /> (disable-auto-adjust-overflow) | 禁用超出视口时自动调整弹出位置                                                                                                                                                                                                                                                         | `boolean`                            | false      |
| disableWidthSync <br /> (disable-width-sync)                    | 禁用同步宽度。默认情况下，选择器的宽度会跟随最宽的选项的宽度。                                                                                                                                                                                                                         | `boolean`                            | `false`    |
| multiple                                                        | 是否开启多选模式                                                                                                                                                                                                                                                                       | `boolean`                            | false      |
| clearable                                                       | 是否显示清除按钮                                                                                                                                                                                                                                                                       | `boolean`                            | false      |
| filter                                                          | 是否开启搜索功能，开启后，可以通过输入内容来过滤选项。过滤的逻辑是只显示**label（选项的文本内容） 中包含输入内容的选项**。（不区分大小写）                                                                                                                                             | `boolean`                            | false      |
| noHideOnClear <br /> (no-hide-on-clear)                         | 清除按钮被点击时，是否隐藏展开内容                                                                                                                                                                                                                                                     | `boolean`                            | false      |
| defaultOpen <br /> (default-open)                               | 默认展开选择器                                                                                                                                                                                                                                                                         | `boolean`                            | false      |
| name                                                            | 用于表单提交的字段名                                                                                                                                                                                                                                                                   | `string`                             | -          |
| form                                                            | 可以传入一个 id, 用于指定所属表单                                                                                                                                                                                                                                                      | `string`                             | -          |
| required                                                        | 是否必填                                                                                                                                                                                                                                                                               | `boolean`                            | false      |
| controlled                                                      | 是否受控                                                                                                                                                                                                                                                                               | `boolean`                            | false      |

### SelectOption

| 属性     | 说明                                           | 类型      | 默认值 |
| -------- | ---------------------------------------------- | --------- | ------ |
| value    | 选项的值，用于判断当前选项是否被选中等核心逻辑 | `string`  | -      |
| disabled | 是否禁用当前选项                               | `boolean` | false  |

## 方法 - Methods

### Select

| 方法   | 说明       | 参数 |
| ------ | ---------- | ---- |
| show() | 展开选择器 | -    |
| hide() | 收起选择器 | -    |

## 事件 - Events

### Select

| 事件      | 说明                     | Event Detail                  |
| --------- | ------------------------ | ----------------------------- |
| change    | 选中的选项发生变化时触发 | `{value: string \| string[]}` |
| show      | 展开选择器时触发         | -                             |
| hide      | 收起选择器时触发         | -                             |
| afterShow | 展开选择器后触发         | -                             |
| afterHide | 收起选择器后触发         | -                             |

## 插槽 - Slots

### Select

| 插槽                 | 说明                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| (default)            | 选择器的展开内容区域，正常情况下只应该放置`SelectOption`组件，不过其实你也可以往里面放`Divider`组件。 |
| selector-icon-expand | 展开图标插槽，可以自定义展开图标                                                                      |
| selector-icon-clear  | 清空图标插槽，可以自定义清空图标                                                                      |
| selector-icon-search | 搜索图标插槽，可以自定义搜索图标                                                                      |

### SelectOption

| 插槽      | 说明           |
| --------- | -------------- |
| (default) | 选项的文本内容 |

## CSS Parts

### Select

| Part    | 说明           |
| ------- | -------------- |
| base    | 包裹组件的容器 |
| listbox | 选择器展开部分 |

### SelectOption

| Part | 说明           |
| ---- | -------------- |
| base | 包裹选项的容器 |

## 样式变量

### Select

| 变量                                              | 说明                                      | 默认值                       |
| ------------------------------------------------- | ----------------------------------------- | ---------------------------- |
| --banana-select-selector-border                   | 边框样式                                  | 1px solid rgb(151, 154, 154) |
| --banana-select-disabled-color                    | 禁用状态字体颜色                          | rgba(0, 0, 0, 0.25)          |
| --banana-select-disabled-background-color         | 禁用状态背景颜色                          | rgba(0, 0, 0, 0.03)          |
| --banana-select-disabled-border-color             | 禁用状态边框颜色                          | rgba(179, 182, 183, 1)       |
| --banana-select-selector-font-size-small          | small 尺寸选择器字体大小                  | 14px                         |
| --banana-select-selector-height-small             | small 尺寸选择器最小高度                  | 24px                         |
| --banana-select-selector-padding-small            | small 尺寸选择器内边距                    | 0 24px 0 12px                |
| --banana-select-selector-border-radius-small      | small 尺寸选择器圆角大小                  | 4px                          |
| --banana-select-selector-font-size-medium         | medium 尺寸选择器字体大小                 | 14px                         |
| --banana-select-selector-height-medium            | medium 尺寸选择器最小高度                 | 32px                         |
| --banana-select-selector-padding-medium           | medium 尺寸选择器内边距                   | 0 24px 0 12px                |
| --banana-select-selector-border-radius-medium     | medium 尺寸选择器圆角大小                 | 6px                          |
| --banana-select-selector-font-size-large          | large 尺寸选择器字体大小                  | 16px                         |
| --banana-select-selector-height-large             | large 尺寸选择器最小高度                  | 40px                         |
| --banana-select-selector-padding-large            | large 尺寸选择器内边距                    | 0 24px 0 12px                |
| --banana-select-selector-border-radius-large      | large 尺寸选择器圆角大小                  | 8px                          |
| --banana-color-primary-hover                      | hover 颜色                                | rgba(0, 79, 179, 1)          |
| --banana-color-primary-active                     | active 颜色                               | rgba(0, 61, 133, 1)          |
| --banana-select-placeholder-color                 | placeholder 文字颜色                      | rgba(151, 154, 154, 1)       |
| --banana-select-expand-icon-color                 | 选择器展开 icon 颜色                      | rgba(179, 182, 183, 1)       |
| --banana-select-clear-icon-color                  | 清空 icon 颜色                            | rgba(179, 182, 183, 1)       |
| --banana-select-clear-icon-hover-color            | 清空 icon hover 时颜色                    | rgba(46, 50, 56, 1)          |
| --banana-select-search-icon-color                 | 搜索 icon 颜色                            | rgba(179, 182, 183, 1)       |
| --banana-select-border-radius                     | 展开面板圆角大小                          | 6px                          |
| --banana-select-list-padding                      | 展开面板内边距                            | 4px                          |
| --banana-select-list-max-height                   | 展开面板最大高度                          | 260px                        |
| --banana-select-multiple-option-background-color  | 多选情况下，每个选项的背景色              | rgba(229, 231, 233, 0.65)    |
| --banana-select-multiple-option-border-radius     | 多选情况下，每个选项的圆角大小            | 4px                          |
| --banana-select-multiple-option-height-small      | 多选情况下且尺寸为 small，每个选项的高度  | 16px                         |
| --banana-select-multiple-option-height-medium     | 多选情况下且尺寸为 medium，每个选项的高度 | 24px                         |
| --banana-select-multiple-option-height-large      | 多选情况下且尺寸为 large，每个选项的高度  | 32px                         |
| --banana-select-multiple-option-close-color       | 多选情况下，删除选项 icon 颜色            | rgba(179, 182, 183, 1)       |
| --banana-select-multiple-option-close-hover-color | 多选情况下，删除选项 icon hover 时的颜色  | rgba(46, 50, 56, 1)          |

### SelectOption

| 变量                                             | 说明                      | 默认值                    |
| ------------------------------------------------ | ------------------------- | ------------------------- |
| --banana-select-option-padding                   | 选项的内边距              | 4px 12px                  |
| --banana-select-option-hover-background-color    | 选项 hover 状态的背景颜色 | rgba(229, 231, 233, 0.75) |
| --banana-select-option-selected-background-color | 选项选中状态的背景颜色    | rgba(152, 205, 253, 0.75) |
