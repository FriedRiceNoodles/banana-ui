---
group: 指南
order: 9
---

# 贡献指南

## 开发环境

- Node.js >= 16
- **PNPM >= 8**
- Git

:::info
项目采用 [PNPM](https://pnpm.io/) 作为包管理工具，并使用其 [Workspaces](https://pnpm.io/workspaces) 特性，以实现多包管理(monorepo)。
如果你没有安装 PNPM，请先安装 PNPM。另外，为了避免生成的 `pnpm-lock.yaml` 文件有较大的差异，<strong>建议安装最新版本(>=8)的 PNPM</strong>。
:::

## 运行项目

> 以下命令若无特别说明，则均在项目根目录下执行。

**首次运行项目前**，需要先安装依赖，然后构建项目：

```bash
pnpm install
pnpm build
```

安装依赖和构建项目完成后，可以运行项目：

```bash
pnpm dev
```

接着你应该会看到终端输出类似如下的信息：

```bash
[2]         ╔════════════════════════════════════════════════════╗
[2]         ║ App listening at:                                  ║
[2]         ║  >   Local: http://localhost:8000                  ║
[2] ready - ║  > Network: http://172.16.21.76:8000               ║
[2]         ║                                                    ║
[2]         ║ Now you can open browser with the above addresses↑ ║
[2]         ╚════════════════════════════════════════════════════╝
```

此时你可以在浏览器中打开 `http://localhost:8000` 查看项目。（如果 8000 端口被占用，会自动使用其他端口，请查看终端输出）

## 文档站点

文档站点基于 [dumi](https://d.umijs.org/) 构建，文档内容位于 `docs` 目录下。

## 项目构成

- packages/banana - 组件库的基础版本
- packages/banana-react - 组件库的 React 版本
- packages/banana-cli - 脚手架，目前主要用于新建组件

## 组件开发

### 开发框架

Banana UI 使用 [Lit](https://lit.dev/) 作为底层框架，因此你需要了解 Lit 的基本使用。

### Property/Attribute

在开发组件时，你会发现组件的属性由两部分组成：Property 和 Attribute。它们之间存在互相转换的关系，但并不是等价的。
简单来说，Attribute 是 HTML 标签上的属性，而 Property 是 DOM 对象上的属性。

对于 HTML 标签而言，Attribute 是不区分大小写的，因此如果你用驼峰命名法定义了一个 Property，那么你需要手动定义其对应的 Attribute 为短横线命名法。

例子：

```typescript
// 如果不向装饰器传入`attribute`参数，则 Attribute 和 Property 都是 `defaultValue`，同时由于Attribute是不区分大小写的，那它在HTML标签上就会是 `defaultvalue`。
@property({ reflect: true, attribute: 'default-value' })
defaultValue = '';
```

同时，在组件文档中的属性部分，如果 Property 和 Attribute 不一致，需要在文档中说明。

### 组件 Demo / 示例代码

#### Demo

Banana UI 的组件 Demo 由 `docs/example/[组件名]/demos` 目录下的文件组成，每个文件对应一个示例。由于文档站点使用的是 dumi，基于 dumi 的技术栈，组件 demo 使用的是组件库的 React 版本。

#### 示例代码

原则上，每个 Demo 都需要提供相应的示例代码。（仅开发可见的 Demo 除外）

与 Demo 不同，示例代码需要区分普通版本和 React 版本，普通版本提供了在 HTML 或其他框架中使用的示例代码，React 版本提供了在 React 中使用的示例代码。

- React 版本的示例代码：会自动读取 Demo 中的代码，无需手动编写。
- 普通版本的示例代码：需要手动编写，位于 `public/[组件名]/[demo名].html`。如果不存在这样的路径或文件，则需要手动创建。

:::info{title=举个例子}
假设有一个组件 `BananaExample`，它有一个 demo，位于 `docs/example/BananaExample/demos/basicUsage.tsx`，那么你需要在 `public/BananaExample/basicUsage.html` 中编写普通版本的示例代码。
而 React 版本的示例代码则会自动读取 `docs/example/BananaExample/demos/basicUsage.tsx` 中的内容，无需手动编写。
:::

### 样式

由于 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 的特性，在组件外部想要影响组件内部的样式，需要依靠于我们暴露出去的 [CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)和 [Part](https://developer.mozilla.org/en-US/docs/Web/API/Element/part)。
因此，为了使用者的方便，我们鼓励尽可能多地暴露 CSS 变量和 Part。

同时，CSS 变量和需要以`--banana-`开头，以避免与其他库的 CSS 变量冲突。

### 事件

TODO

### 新建组件

TODO

## 代码提交

TODO
