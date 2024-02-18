---
debug: true
group: 组件
demo:
  cols: 2
---

# Stepper 数量选择器

:::info

```
<b-stepper> | Stepper
```

:::

以设定步数对数据进行加减

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/inputRange.tsx"></code>
<code src="./demos/setStepLen.tsx"></code>
<code src="./demos/stepChange.tsx"></code>

## 属性 - Attributes & Properties

| 属性         | 说明                                                              | 类型      | 默认值 |
| ------------ | ----------------------------------------------------------------- | --------- | ------ |
| name         | 组件携带的名称（用于于 form 联动）                                | `string`  | ''     |
| value        | 步进器的值                                                        | `number`  | 0      |
| min          | 最小值                                                            | `number`  | -      |
| max          | 最大值                                                            | `number`  | -      |
| step         | 步长                                                              | `number`  | 1      |
| disabled     | 是否禁用                                                          | `boolean` | false  |
| integer      | 是否限制结果只能为整数                                            | `boolean` | false  |
| defaultValue | 默认 value，用于与 form 的 reset 事件联动                         | `number`  | 0      |
| required     | 是否必传，与 form 联动使用                                        | `boolean` | false  |
| readonly     | 是否只读，与 form 联动使用                                        | `boolean` | false  |
| controlled   | 是否受控 (如果使用者自己维护一个值则需要使其受控，否则就是非受控) | `boolean` | false  |

## 方法 - Methods

| 方法    | 说明                       | 参数 |
| ------- | -------------------------- | ---- |
| minus() | 使步进器以当前步长减少一次 | -    |
| plus()  | 使步进器以当前步长增加一次 | -    |

## 事件 - Events

| 事件   | 说明                                 | Event Detail |
| ------ | ------------------------------------ | ------------ |
| focus  | 聚焦步进器时触发事件                 | -            |
| blur   | 步进器失焦时触发事件                 | -            |
| change | 步进器内容发生改变同时失焦时触发事件 | -            |

## 插槽 - Slots

| 插槽  | 说明         |
| ----- | ------------ |
| minus | 减少按钮插槽 |
| plus  | 增加按钮插槽 |

## CSS Parts

| Part          | 说明                 |
| ------------- | -------------------- |
| base          | 包裹组件的容器       |
| minus_btn     | 组件的 减少按钮 区域 |
| stepper_input | 组件的 值展示 区域   |
| plus_btn      | 组件的 增加按钮 区域 |

## 样式变量

| 变量                                  | 说明                 | 默认值      |
| ------------------------------------- | -------------------- | ----------- |
| --banana-stepper-border-width         | 组件容器的边框宽度   | 1px         |
| --banana-stepper-border-color         | 组件容器的边框颜色   | #e5e5e4     |
| --banana-stepper-border-color-focus   | 组件聚焦时的边框颜色 | #00897b     |
| --banana-stepper-btn-background-color | 组件容器的背景颜色   | transparent |
| --banana-stepper-content-color        | 组件值展示字体颜色   | #212224     |
| --banana-stepper-font-size            | 组件值展示字体颜色   | #212224     |
| --banana-stepper-font-family          | 组件值展示字体       | inherit     |
| --banana-stepper-content-weight       | 组件值展示字重       | 500         |
| --banana-input-disabled-color         | 组件值禁用时字体颜色 | #212224     |
