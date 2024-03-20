---
group: 组件
---

# Carousel 轮播图

```
<b-carousel> | Carousel
```

## 介绍

可以用它来展示多张图片，或者其他内容。

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/loop.tsx"></code>
<code src="./demos/slidesPerView.tsx"></code>
<code src="./demos/demo3.tsx"></code>
<code src="./demos/autoplay.tsx"></code>
<code src="./demos/navigation.tsx"></code>
<code src="./demos/indicator.tsx"></code>
<code src="./demos/disableDrag.tsx"></code>
<code src="./demos/gap.tsx"></code>
<code src="./demos/disableFill.tsx"></code>
<code src="./demos/useRef.tsx"></code>
<code src="./demos/autoHeight.tsx"></code>

## 属性 - Attributes & Properties

| 属性                                                 | 说明                                                                                          | 类型      | 默认值 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------- | ------ |
| loop                                                 | 是否循环                                                                                      | `boolean` | false  |
| slidesPerView <br /> (slides-per-view)               | 同时显示的轮播图数量                                                                          | `number`  | 1      |
| autoplay                                             | 是否自动播放                                                                                  | `boolean` | false  |
| autoplayDelay <br /> (autoplay-delay)                | 自动播放的间隔时间，单位为毫秒                                                                | `number`  | 3000   |
| noPauseOnMouseEnter <br /> (no-pause-on-mouse-enter) | 默认情况下，鼠标移入后会暂停自动播放，传入此属性可以取消这个行为                              | `boolean` | false  |
| disableDrag <br /> (disable-drag)                    | 是否禁用拖拽                                                                                  | `boolean` | false  |
| navigation                                           | 是否显示前进后退按钮                                                                          | `boolean` | false  |
| gap                                                  | 轮播图之间的间隔                                                                              | `number`  | 0      |
| disableFill <br /> (disable-fill)                    | 默认情况下，当你传入的轮播图个数小于 slidesPerView 时，会自动填充，传入此属性可以取消这个行为 | `boolean` | false  |
| autoHeight                                           | 是否自动调整高度                                                                              | `boolean` | false  |
| indicator                                            | 是否显示指示器（默认为小圆点）                                                                | `boolean` | false  |

## 方法 - Methods

| 方法                | 说明               | 参数                |
| ------------------- | ------------------ | ------------------- |
| prev()              | 切换到上一张轮播图 | -                   |
| next()              | 切换到下一张轮播图 | -                   |
| goto(index: number) | 切换到指定的轮播图 | index: 轮播图的索引 |
| calcHeight()        | 重新计算并修改高度 | -                   |

## 事件 - Events

| 事件   | 说明             | Event Detail               |
| ------ | ---------------- | -------------------------- |
| change | 轮播图切换时触发 | `{ currentIndex: number }` |

## 插槽 - Slots

| 插槽        | 说明            |
| ----------- | --------------- |
| (default)   | 轮播图的内容    |
| prev-button | 切换按钮-上一张 |
| next-button | 切换按钮-下一张 |

## CSS Parts

| Part                         | 说明                 |
| ---------------------------- | -------------------- |
| base                         | 包裹组件的容器       |
| external-wrapper             | 轮播图内容的外层容器 |
| slides-wrapper               | 轮播图内容的容器     |
| slide                        | 轮播图内容的默认插槽 |
| indicators                   | 指示器的容器         |
| indicator                    | 指示器               |
| indicator--active            | 激活状态的指示器     |
| navigation-buttons           | 切换按钮             |
| navigation-buttons--disabled | 切换按钮-禁用状态    |
| navigation-button--previous  | 切换按钮-上一张      |
| navigation-button--next      | 切换按钮-下一张      |

## 样式变量

| 变量                                  | 说明                                              | 默认值                             |
| ------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| --banana-carousel-transition-duration | 切换动画和调整高度时动画的持续时间                | 250ms                              |
| --banana-carousel-indicator-gap       | 指示器之间的间隔                                  | `--banana-carousel-indicator-size` |
| --banana-carousel-indicator-size      | 指示器的大小                                      | 8px                                |
| --banana-carousel-indicator-color     | 指示器的颜色（非激活状态的指示器`opacity`为 0.5） | rgba(46, 50, 56, 1)                |
