---
group: 组件
demo:
  cols: 2
---

# Marquee 跑马灯

```
<b-marquee> | Marquee
```

适合用于展示公告、中奖信息之类的长文本。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/customColor.tsx"></code>
<code src="./demos/duration.tsx"></code>
<code src="./demos/pauseWhenHover.tsx"></code>
<code src="./demos/customStyle.tsx"></code>
<code src="./demos/fixedUsage.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                     | 说明                | 类型      | 默认值 |
| ---------------------------------------- | ------------------- | --------- | ------ |
| content                                  | 跑马灯的文本内容    | `string`  | ''     |
| color                                    | 跑马灯的文本颜色    | `string`  | ''     |
| duration                                 | 滚动时长（单位：s） | `number`  | 20     |
| pauseWhenHover <br /> (pause-when-hover) | 鼠标悬停时是否暂停  | `boolean` | false  |
| fixed                                    | 短文案固定          | `boolean` | false  |

## CSS Parts

| Part    | 说明                 |
| ------- | -------------------- |
| base    | 包裹组件的容器       |
| content | 跑马灯的文字内容区域 |

## 样式变量

| 变量                              | 说明             | 默认值 |
| --------------------------------- | ---------------- | ------ |
| --banana-marquee-color            | 跑马灯的文本颜色 | -      |
| --banana-marquee-font-size        | 跑马灯的字体大小 | -      |
| --banana-marquee-line-height      | 跑马灯的文字行高 | '1.4'  |
| --banana-marquee-background-color | 跑马灯的背景色   | -      |
