---
group: 组件
demo:
  cols: 2
---

# Textarea 文本输入框

```
<b-textarea> | Textarea
```

文本输入框

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/rows.tsx"></code>
<code src="./demos/size.tsx"></code>
<code src="./demos/formTest.tsx"></code>

## 属性 - Attributes & Properties

| 属性           | 说明                                                                                                                                            | 类型                                                                                            | 默认值     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| name           | The name of the textarea, submitted as a name/value pair with form data.                                                                        | `string`                                                                                        | `''`       |
| value          | The current value of the textarea, submitted as a name/value pair with form data.                                                               | `string`                                                                                        | `''`       |
| size           | The textarea’s size.                                                                                                                            | `'small'` \| `'medium'` \| `'large'`                                                            | `'medium'` |
| placeholder    | Placeholder text to show as a hint when the input is empty.                                                                                     | `string`                                                                                        | -          |
| rows           | The number of rows to display by default.                                                                                                       | `number`                                                                                        | 4          |
| minlength      | The minimum length of input that will be considered valid.                                                                                      | `number`                                                                                        |            |
| maxlength      | The maximum length of input that will be considered valid.                                                                                      | `number`                                                                                        |            |
| autocapitalize | Controls whether and how text input is automatically capitalized as it is entered by the user.                                                  | `'off'` \| `'none'` \| `'on'` \| `'sentences'`\| `'words'`\| `'characters'`                     | `'off'`    |
| autocorrect    | Indicates whether the browser’s autocorrect feature is on or off.                                                                               | `'off'` \| `'on'`                                                                               | `'on'`     |
| spellcheck     | Enables spell checking on the textarea.                                                                                                         | `boolean`                                                                                       | true       |
| inputmode      | Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices. | `'none'` \| `'text'` \| `'decimal'` \| `'numeric'`\| `'tel'`\| `'search'`\| `'email'`\| `'url'` | `'text'`   |
| autofocus      | Indicates that the input should receive focus on page load.                                                                                     | `boolean`                                                                                       | false      |
| disabled       | Disables the textarea.                                                                                                                          | `boolean`                                                                                       | false      |
| readonly       | Makes the textarea readonly.                                                                                                                    | `boolean`                                                                                       | false      |
| required       | Makes the textarea a required field.                                                                                                            | `boolean`                                                                                       | false      |
| controlled     | Makes the textarea a controlled field.                                                                                                          | `boolean`                                                                                       | false      |

## 方法 - Methods

| 方法             | 说明                                                                     | 参数 |
| ---------------- | ------------------------------------------------------------------------ | ---- |
| reportValidity() | 报告表单验证结果,返回表单验证结果，如果验证成功返回 true，否则返回 false | -    |
| checkValidity()  | 检查输入字段的有效性,如果输入字段有效则返回 true，否则返回 false         | -    |

## 事件 - Events

| 事件   | 说明                                                                        | Event Detail |
| ------ | --------------------------------------------------------------------------- | ------------ |
| change | Emitted when an alteration to the control’s value is committed by the user. | -            |
| input  | Emitted when the control receives input.                                    | -            |
| focus  | Emitted when the control gains focus.                                       | -            |
| blur   | Emitted when the control loses focus.                                       | -            |

## CSS Parts

| Part     | 说明           |
| -------- | -------------- |
| base     | 包裹组件的容器 |
| textarea | textarea 区域  |

## 样式变量

| 变量                                     | 说明                             | 默认值                                                                                                                                        |
| ---------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| --banana-input-border-width              | 边框宽度                         | 1px                                                                                                                                           |
| --banana-input-border-color              | 边框颜色                         | rgba(229, 231, 233, 1)                                                                                                                        |
| --banana-input-background-color          | 背景颜色                         | #fff                                                                                                                                          |
| --banana-input-border-hover-color        | hover 边框颜色                   | rgba(151, 154, 154, 1)                                                                                                                        |
| --banana-input-border-focus-color        | focus 边框颜色                   | rgba(0, 90, 224, 1)                                                                                                                           |
| --banana-input-box-shadow-focus          | focus 边框阴影                   | 0 0 0 2px rgba(0, 90, 224, 0.2)                                                                                                               |
| --banana-input-font-size-small           | 尺寸为 small 时的字体大小        | 14px                                                                                                                                          |
| --banana-input-height-small              | 尺寸为 small 时的 min-height     | 24px                                                                                                                                          |
| --banana-input-border-radius-small       | 尺寸为 small 时的 border-radius  | 4px                                                                                                                                           |
| --banana-input-padding-small             | 尺寸为 small 时的 padding        | 0 6px                                                                                                                                         |
| --banana-input-font-size-medium          | 尺寸为 medium 时的字体大小       | 14px                                                                                                                                          |
| --banana-input-height-medium             | 尺寸为 medium 时的 min-height    | 32px                                                                                                                                          |
| --banana-input-border-radius-medium      | 尺寸为 medium 时的 border-radius | 6px                                                                                                                                           |
| --banana-input-padding-medium            | 尺寸为 medium 时的 padding       | 4px 12px                                                                                                                                      |
| --banana-input-font-size-large           | 尺寸为 large 时的字体大小        | 16px                                                                                                                                          |
| --banana-input-height-large              | 尺寸为 large 时的 min-height     | 40px                                                                                                                                          |
| --banana-input-border-radius-large       | 尺寸为 large 时的 border-radius  | 8px                                                                                                                                           |
| --banana-input-padding-large             | 尺寸为 large 时的 padding        | 6px 12px                                                                                                                                      |
| --banana-input-disabled-color            | disabled 时的字体颜色            | rgba(0, 0, 0, 0.25)                                                                                                                           |
| --banana-input-disabled-background-color | disabled 时的背景颜色            | rgba(0, 0, 0, 0.03)                                                                                                                           |
| --banana-input-disabled-border-color     | disabled 时的边框颜色            | rgba(179, 182, 183, 0.03)                                                                                                                     |
| --banana-input-font-family               | 字体                             | Inter, AppleSystem, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sansSerif |
