---
group: 组件
demo:
  cols: 2
---

# Dropdown 下拉菜单

```
<b-dropdown> | Dropdown
```

## 介绍

一个用于收纳操作命令的容器。

## 代码演示

<code src="./demos/BasicUsage.tsx"></code>
<code src="./demos/Placement.tsx"></code>
<code src="./demos/Arrow.tsx"></code>
<code src="./demos/triggerAction.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                      | 说明                                                                | 类型                                                                          | 默认值       |
| ----------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------ |
| placement                                 | 弹出方向                                                            | `bottomLeft` \| `bottom` \| `bottomRight` \| `topLeft` \| `top` \| `topRight` | `bottomLeft` |
| margin                                    | trigger 与下拉内容的间距，单位是`px`                                | `number`                                                                      | 4            |
| mouseEnterDelay <br/> (mouse-enter-delay) | hover 模式下，鼠标移入 trigger 多久后展示下拉菜单的内容，单位是`ms` | `number`                                                                      | 100          |
| mouseLeaveDelay <br/> (mouse-leave-delay) | hover 模式下，鼠标移出下拉菜单多久后隐藏下拉菜单的内容，单位是`ms`  | `number`                                                                      | 100          |
| triggerAction <br/> (trigger-action)      | 触发下拉菜单的方式                                                  | `click` \| `hover`                                                            | `hover`      |

## 事件 - Events

| 事件      | 说明           | Event Detail |
| --------- | -------------- | ------------ |
| show      | 开始展开时触发 | -            |
| hide      | 开始收起时触发 | -            |
| afterShow | 展开完成时触发 | -            |
| afterHide | 收起完成时触发 | -            |

## 插槽 - Slots

| 插槽      | 说明               |
| --------- | ------------------ |
| (default) | 下拉菜单的 trigger |
| drop      | 下拉内容           |

## CSS Parts

| Part    | 说明                    |
| ------- | ----------------------- |
| base    | 包裹组件的容器          |
| trigger | 下拉菜单的 trigger 区域 |
| drop    | 下拉菜单的下拉内容区域  |
| arrow   | 下拉菜单的箭头          |
