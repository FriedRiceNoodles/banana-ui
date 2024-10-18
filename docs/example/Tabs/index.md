---
debug: true
group: 组件
demo:
  cols: 1
---

# Tabs tabs 组件

```
<b-tabs> | Tabs
```

tabs component

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/extraRender.tsx"></code>

# Tabs

## 属性 - Attributes & Properties

| 属性     | 说明                                          | 类型     | 默认值 |
| -------- | --------------------------------------------- | -------- | ------ |
| position | 页签的位置，可选`top` `bottom` `left` `right` | `string` | `top`  |
| type     | 页签项的类型, 可选`line` `block`              | `string` | `line` |

## 方法 - Methods

| 方法   | 说明              | 参数                      |
| ------ | ----------------- | ------------------------- |
| show() | 切换到对应 tab 项 | `panel`对应挂载面板的名称 |

## 事件 - Events

| 事件 | 说明                                                  | Event Detail      |
| ---- | ----------------------------------------------------- | ----------------- |
| hide | 切换 tab 时触发, 抛出被隐藏的 tab 上挂的 panel 名称   | `{value: string}` |
| show | 切换 tab 时触发, 抛出被当前选中 tab 上挂的 panel 名称 | `{value: string}` |

## 插槽 - Slots

| 插槽               | 说明                                                               |
| ------------------ | ------------------------------------------------------------------ |
| nav                | tabs 页签栏内容，传入多个`b-tab-item`组件                          |
| left-extra-render  | 渲染页签左侧的额外元素                                             |
| right-extra-render | 渲染页签右侧的额外元素                                             |
| body               | tabs 组件的展示内容，传入多个与`b-tab-item`组件绑定的`b-tab-panel` |

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
