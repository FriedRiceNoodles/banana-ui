---
group: 指南
order: 2
---

# 安装/引入

## 原生环境和非 React 框架

### NPM 安装：

```bash
npm i @banana-ui/banana
```

### CDN 引入：

```html
/* UMD Namespace: Banana */
<script src="https://cdn.jsdelivr.net/npm/@banana-ui/banana/umd/index.js"></script>
```

or

```html
<!-- 按需引入 -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@banana-ui/banana/dist/banana-autoloader.js"></script>
```

## React

### NPM 安装：

```bash
npm i @banana-ui/react
```

### CDN 引入：

```html
/* UMD Namespace: BananaReact */
<script src="https://cdn.jsdelivr.net/npm/@banana-ui/react/umd/index.js"></script>
```

> 在 React 场景下使用 CDN 引入是不常见的，一般只在配置了[webpack externals](https://webpack.js.org/configuration/externals/)的情况下使用。
