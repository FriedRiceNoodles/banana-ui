---
group: 组件
demo:
  cols: 2
---

# Modal 对话框

```
<b-modal> | Modal
```

模态**对话框**，当然你也可以叫它**弹窗**。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/overflow.tsx"></code>
<code src="./demos/customWidth.tsx"></code>
<code src="./demos/buttonText.tsx"></code>
<code src="./demos/buttonStatus.tsx"></code>
<code src="./demos/customFooter.tsx"></code>

## 属性 - Attributes & Properties

| 属性                 | 说明                        | 类型    | 默认值   |
| -------------------- | --------------------------- | ------- | -------- |
| open                 | 是否展示对话框              | boolean | `false`  |
| title                | 标题                        | string  | -        |
| width                | 对话框宽度                  | string  | `500px`  |
| okText               | 确认按钮文案                | string  | `OK`     |
| cancelText           | 取消按钮文案                | string  | `Cancel` |
| okButtonDisabled     | 确认按钮是否禁用            | boolean | `false`  |
| cancelButtonDisabled | 取消按钮是否禁用            | boolean | `false`  |
| okButtonLoading      | 确认按钮是否为 loading 状态 | boolean | `false`  |
| cancelButtonLoading  | 取消按钮是否为 loading 状态 | boolean | `false`  |
| okButtonHidden       | 是否隐藏确认按钮            | boolean | `false`  |
| cancelButtonHidden   | 是否隐藏取消按钮            | boolean | `false`  |
| footerHidden         | 是否隐藏底部按钮区域        | boolean | `false`  |

## 事件 - Events

| 事件   | 说明     | Event Detail |
| ------ | -------- | ------------ |
| cancel | 取消事件 | -            |
| ok     | 确认事件 | -            |

:::info{title=事件触发条件}

#### 取消事件：

- 点击取消按钮
- 点击遮罩层
- 按下 ESC 键
- 点击右上角关闭按钮

#### 确认事件：

- 点击确认按钮
  :::

## 插槽 - Slots

| 插槽      | 说明         |
| --------- | ------------ |
| (default) | 弹窗内容区域 |
| title     | 标题区域     |
| footer    | 底部按钮区域 |

## CSS Parts

| Part                  | 说明           |
| --------------------- | -------------- |
| base                  | 包裹组件的容器 |
| close                 | 关闭按钮       |
| title                 | 标题区域       |
| content               | 内容区域       |
| footer                | 底部按钮区域   |
| default-cancel-button | 默认取消按钮   |
| default-ok-button     | 默认确认按钮   |

## 样式变量

| 变量                                        | 说明                   | 默认值                |
| ------------------------------------------- | ---------------------- | --------------------- |
| --banana-modal-width                        | 对话框宽度             | `500px`               |
| --banana-modal-background-color             | 对话框背景色           | `#fff`                |
| --banana-modal-border-radius                | 对话框圆角             | `6px`                 |
| --banana-modal-padding                      | 对话框内边距           | `20px 28px`           |
| --banana-modal-font-size                    | 对话框字体大小         | `14px`                |
| --banana-modal-title-font-size              | 对话框标题字体大小     | `16px`                |
| --banana-modal-title-font-weight            | 对话框标题字体粗细     | `600`                 |
| --banana-modal-title-margin-bottom          | 对话框标题下边距       | `12px`                |
| --banana-modal-footer-gap                   | 默认底部按钮间的间距   | `12px`                |
| --banana-modal-footer-margin-top            | 默认底部按钮区域上边距 | `12px`                |
| --banana-modal-close-top                    | 关闭按钮距离顶部的距离 | `12px`                |
| --banana-modal-close-right                  | 关闭按钮距离右侧的距离 | `12px`                |
| --banana-modal-close-color                  | 关闭按钮颜色           | `rgba(0, 0, 0, 0.5)`  |
| --banana-modal-close-color-hover            | 关闭按钮悬停颜色       | `rgba(0, 0, 0, 0.75)` |
| --banana-modal-close-hover-background-color | 关闭按钮悬停背景色     | `rgba(0, 0, 0, 0.1)`  |
