# 文档站点

- HTML/Vue 版本的 preview 代码

# 组件

## 新组件

- modal
- Tabs
- Image

## 已有组件

### Button

- 链接按钮
- icon 按钮
- css part / css 变量的文档说明
- slot 的文档说明

### Carousel

- 暴露出 emit 事件
- css part / css 变量的文档说明
- 事件的文档说明
- slot 的文档说明
- 受控模式
- 从性能角度上考虑，可以给 resize 处理加一个防抖

### Collapse

- group 模式

### Overlay

- 用 requestAnimationFrame()代替 css 实现消失的动画，这样我们就可以得到“消失”这一动作完成的时机，从而在消失完成而非开始消失时就让浏览器出现滚动条。

### Popup

- round 模式（圆角）
- 关闭按钮
- 最大高度、最大宽度参数
- 禁止遮罩层点击关闭的参数

### Menu

- 文档
- checkbox type
- 事件的类型
- suffix、prefix
- menu label（可选）
- menu 的键盘事件，a11y 支持

### Dropdown

- 暴露事件
- 参数补全（floating-ui 中间件相关）
- 移动端禁用 hover 触发
- autoUpdate

# 构建流程

- umd 模式 d.ts 文件问题
- 使用 unbuild 代替现有的 rollup（可选）

# 其他

- 自定义 commitizen 配置
