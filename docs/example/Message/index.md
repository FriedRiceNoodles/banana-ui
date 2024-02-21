---
group: 组件
demo:
  cols: 2
---

# Message 提示

```
<b-message> | Message
```

全局的消息提示,常用于向用户反馈操作的结果或状态的变更.

## 代码演示

<code src="./demos/basicUsage.tsx"></code>
<code src="./demos/type.tsx"></code>
<code src="./demos/duration.tsx"></code>
<code src="./demos/loading.tsx"></code>

## 静态方法 - Static Methods

显示提示的静态方法都会返回一个唯一的 id，可以通过这个 id 来关闭提示。

| 方法         | 说明             | 参数                |
| ------------ | ---------------- | ------------------- |
| open         | 显示一个提示     | `Config`            |
| info         | 显示一个普通提示 | `ConfigWithoutType` |
| success      | 显示一个成功提示 | `ConfigWithoutType` |
| warning      | 显示一个警告提示 | `ConfigWithoutType` |
| error        | 显示一个错误提示 | `ConfigWithoutType` |
| loading      | 显示一个加载提示 | `ConfigWithoutType` |
| closeMessage | 关闭指定的提示   | `id: number`        |

```ts
export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading';

export type Config = {
  type?: MessageType;
  content: string;
  duration?: number;
  onClose?: () => void;
};

export type ConfigWithoutType = Omit<Config, 'type'>;
```

Config 的具体属性说明如下：
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型 | `MessageType` | `info` |
| content | 提示内容 | `string` | - |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | `number` | `3` |
| onClose | 关闭时触发的回调函数 | `() => void` | - |

## CSS Parts

| Part    | 说明               |
| ------- | ------------------ |
| box     | 所有提示的容器     |
| base    | 包裹单条提示的容器 |
| icon    | 提示的图标         |
| content | 提示的内容         |

## 样式变量

| 变量                                 | 说明                             | 默认值                                                      |
| ------------------------------------ | -------------------------------- | ----------------------------------------------------------- |
| --banana-message-box-gap             | 提示之间的间距                   | `12px`                                                      |
| --banana-message-content-color       | 提示的文本颜色                   | -                                                           |
| --banana-message-padding             | 提示的内边距                     | `8px 12px`                                                  |
| --banana-message-border-radius       | 提示的圆角                       | `6px`                                                       |
| --banana-message-box-shadow          | 提示的阴影                       | `0 0 1px rgba(0, 0, 0, 0.3), 0 4px 14px rgba(0, 0, 0, 0.1)` |
| --banana-message-gap                 | 图标与内容的间距                 | `8px`                                                       |
| --banana-message-animation-duration  | 提示的动画时长（淡入淡出）       | `0.2s`                                                      |
| --banana-message-background-color    | 普通提示的背景色                 | `#fff`                                                      |
| --banana-message-loading-speed       | 加载提示的旋转速度(多少秒转一圈) | `1s`                                                        |
| --banana-message-content-font-size   | 提示的字体大小                   | `14px`                                                      |
| --banana-message-content-font-weight | 提示的字体粗细                   | `600`                                                       |
