# Collapse 折叠面板

## 介绍

将复杂的内容放入折叠面板中，可保持页面的整洁。

## 代码演示

<code src="./demos/demo0.tsx"></code>
<code src="./demos/demo1.tsx"></code>
<code src="./demos/demo2.tsx"></code>
<code src="./demos/demo3.tsx"></code>

## 属性 - Attributes & Properties

| 属性     | 说明           | 类型    | 默认值 |
| -------- | -------------- | ------- | ------ |
| title    | 折叠面板的标题 | string  | ''     |
| open     | 是否展开       | boolean | false  |
| disabled | 是否禁用       | boolean | false  |

## 方法 - Methods

| 方法   | 说明         | 参数 |
| ------ | ------------ | ---- |
| show() | 展开折叠面板 | -    |
| hide() | 收起折叠面板 | -    |

## 事件 - Events

| 事件      | 说明           | Event Detail |
| --------- | -------------- | ------------ |
| show      | 开始展开时触发 | -            |
| hide      | 开始收起时触发 | -            |
| afterShow | 展开完成时触发 | -            |
| afterHide | 收起完成时触发 | -            |

## 插槽 - Slots

| 插槽          | 说明                   |
| ------------- | ---------------------- |
| (default)     | 折叠面板的展开区域内容 |
| title         | 折叠面板的标题区域     |
| expand-icon   | 展开图标               |
| collapse-icon | 收起图标               |

## CSS Parts

| Part    | 说明               |
| ------- | ------------------ |
| base    | 包裹组件的容器     |
| header  | 组件的 header 区域 |
| content | 展开的内容区域     |

## 样式变量

| 变量                              | 说明               | 默认值 |
| --------------------------------- | ------------------ | ------ |
| --banana-collapse-title-padding   | 标题的 padding     | 16px   |
| --banana-collapse-content-padding | 展开区域的 padding | 16px   |
