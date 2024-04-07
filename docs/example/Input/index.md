---
group: 组件
demo:
  cols: 2
---

# Input 输入框 <Badge>表单组件</Badge>

```
<b-input> | Input
```

最基本的接收用户输入的组件,通常被用在表单中,当然也可以单独使用.

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/size.tsx"></code>
<code src="./demos/formTest.tsx"></code>

## 属性 - Attributes & Properties

| 属性         | 说明                                                                                        | 类型                                                                      | 默认值   |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------- |
| value        | 输入框的值                                                                                  | `string`                                                                  | -        |
| disabled     | 是否禁用输入框                                                                              | `boolean`                                                                 | false    |
| placeholder  | value 为空时，出现在输入框中的文字                                                          | `string`                                                                  | -        |
| size         | 输入框的尺寸                                                                                | `small` \| `medium` \| `large`                                            | `medium` |
| type         | 输入框的[类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) | `text` \| `password` \| `email` \| `number` \| `tel` \| `url` \| `search` | `text`   |
| name         | 用于表单提交的字段名                                                                        | `string`                                                                  | -        |
| required     | 是否必填                                                                                    | `boolean`                                                                 | false    |
| controlled   | 是否受控                                                                                    | `boolean`                                                                 | false    |
| autocomplete | https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete                   | `HTMLInputElement['autocomplete']`                                        | -        |
| pattern      | https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/pattern                        | `string`                                                                  | -        |
| minlength    | https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength                      | `number`                                                                  | -        |
| maxlength    | https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength                      | `number`                                                                  | -        |
| min          | https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min                            | `number` \| `string`                                                      | -        |
| max          | https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min                            | `number` \| `string`                                                      | -        |

## 方法 - Methods

| 方法             | 说明                                                                                                                                                                              | 参数 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| reportValidity() | 触发合法性校验，返回输入框当前的值是否合法，如果是不合法的值，会弹出提示。[查看 MDN 相关文档。](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity) | -    |
| checkValidity()  | 返回输入框当前的值是否合法。[查看 MDN 相关文档。](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity)                                                | -    |

## 事件 - Events

| 事件   | 说明                     | Event Detail      |
| ------ | ------------------------ | ----------------- |
| change | 输入框的值发生改变时触发 | `{value: string}` |
| focus  | 输入框聚焦时触发         | -                 |
| blur   | 输入框失焦时触发         | -                 |

## CSS Parts

| Part  | 说明                        |
| ----- | --------------------------- |
| base  | 包裹组件的容器              |
| input | 输入框的原生 input 标签部分 |

## 样式变量

| 变量                              | 说明                        | 默认值                                                                                                                                        |
| --------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| --banana-input-border-width       | 输入框边框宽度              | 1px                                                                                                                                           |
| --banana-input-border-color       | 输入框边框颜色              | rgb(229, 231, 233)                                                                                                                            |
| --banana-input-font-family        | 输入框的字体                | Inter, AppleSystem, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sansSerif |
| --banana-input-background-color   | 输入框的背景色              | #fff                                                                                                                                          |
| --banana-input-border-hover-color | 输入框 hover 状态的边框颜色 | rgb(151, 154, 154)                                                                                                                            |

// css 变量文档待补完.........
