---
group: 组件
demo:
  cols: 2
---

# Button 按钮

```
<b-button> | Button
```

## 介绍

不难看出，这是一个按钮

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/type.tsx"></code>
<code src="./demos/size.tsx"></code>
<code src="./demos/pill.tsx"></code>
<code src="./demos/outline.tsx"></code>
<code src="./demos/disabled.tsx"></code>
<code src="./demos/loading.tsx"></code>
<code src="./demos/block.tsx"></code>
<code src="./demos/formTest.tsx"></code>

## 属性 - Attributes & Properties

| 属性           | 说明                               | 类型                                                                         | 默认值    |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------- | --------- |
| type           | 按钮的类型                         | `default` \| `primary` \| `success` \| `warning` \| `danger` \| `dashed`     | `default` |
| size           | 按钮的尺寸                         | `small` \| `medium` \| `large`                                               | `medium`  |
| disabled       | 是否禁用按钮                       | boolean                                                                      | true      |
| pill           | 是否为药丸形状的按钮               | boolean                                                                      | false     |
| outline        | 是否是背景透明，内容反色           | boolean                                                                      | false     |
| loading        | 加载状态                           | boolean                                                                      | false     |
| block          | 按钮占满父容器宽度                 | boolean                                                                      | false     |
| htmlType       | `button`的原生 type 值             | string                                                                       | `button`  |
| name           | 与`form`标签联动，表单项的名称     | string                                                                       | -         |
| form           | 与`form`标签联动，表单容器的名称   | string                                                                       | -         |
| formAction     | `button`的原生`formaction`属性     | string                                                                       | -         |
| formEnctype    | `button`的原生`formenctype`属性    | `application/x-www-form-urlencoded` \| `multipart/form-data` \| `text/plain` | -         |
| formMethod     | `button`的原生`formmethod`属性     | `get` \| `post`                                                              | -         |
| formNoValidate | `button`的原生`formnovalidate`属性 | boolean                                                                      | -         |
| formtarget     | `button`的原生`formtarget`属性     | `_self` \| `_blank` \| `_parent` \| `_top` \| -                              | -         |

## 插槽 - Slots

| 插槽      | 说明     |
| --------- | -------- |
| (default) | 按钮内容 |

## CSS Parts

| Part    | 说明             |
| ------- | ---------------- |
| base    | 包裹组件的容器   |
| loading | 按钮加载时的内容 |
| content | 按钮框的内容     |

## 样式变量

| 变量                                 | 说明                             | 默认值               |
| ------------------------------------ | -------------------------------- | -------------------- |
| --banana-button-boder-width          | 按钮边框宽度                     | 1px                  |
| --banana-button-border-radius        | 按钮圆角大小                     | 3px                  |
| --banana-button-font-family          | 按钮内容的字体                   | -                    |
| --banana-button-font-weight          | 按钮内容的字重                   | 400                  |
| --banana-button-border-color-default | type 为 dash 或默认时的边框颜色  | rgb(151, 154, 154)   |
| --banana-color-primary-hover         | hover 时的主色                   | rgb( 0, 79, 179)     |
| --banana-color-primary-active        | active 时的主色                  | rgb(0, 61, 133)      |
| --banana-color-success               | type 为 success 时的主色         | rgb(42, 134, 54)     |
| --banana-color-success-hover         | type 为 success 时 hover 的主色  | rgb(37, 117, 47)     |
| --banana-color-success-active        | type 为 success 时 active 的主色 | rgb(31, 101, 41)     |
| --banana-color-warning               | type 为 warning 的主色           | rgb(210, 103, 0)     |
| --banana-color-warning-hover         | type 为 warning 的 hover 时主色  | rgb(210, 103, 0, 41) |
| --banana-color-warning-active        | type 为 warning 的 active 时主色 | rgb(126, 49, 0)      |
| --banana-color-danger                | type 为 danger 的主色            | rgb(126, 49, 0)      |
| --banana-color-danger-hover          | type 为 danger 的 hover 时主色   | rgb(213, 37, 5)      |
| --banana-color-danger-active         | type 为 danger 的 active 时主色  | rgb(178, 20, 2)      |
| --banana-button-fontsize-small       | size 为 small 时的字体大小       | 12px                 |
| --banana-button-height-small         | size 为 small 时的最小高度       | 24px                 |
| --banana-button-padding-small        | size 为 small 时的内边距         | 2px 12px             |
| --banana-button-fontsize-medium      | size 为 medium 时的字体大小      | 14px                 |
| --banana-button-height-medium        | size 为 medium 时的最小高度      | 32px                 |
| --banana-button-padding-medium       | size 为 medium 时的内边距        | 6px 12px             |
| --banana-button-fontsize-large       | size 为 large 的字体大小         | 16px                 |
| --banana-button-height-large         | size 为 large 的最小高度         | 16px                 |
| --banana-button-padding-large        | size 为 large 时的内边距         | 10px 12px            |
| --button-loading-color               | loading 状态时的字体颜色         | #fff                 |
| --button-loading-speed               | loading 状态的旋转速度           | 1s                   |
| --button-loading-speed               | loading 状态的旋转速度           | 1s                   |
