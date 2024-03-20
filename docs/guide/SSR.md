---
group: 指南
order: 5
---

# SSR（服务端渲染）支持

我们为 Banana UI 提供了服务端渲染（SSR）支持，这意味着你可以在服务端渲染的环境/框架中使用 Banana UI。

## 支持的环境

- [node](https://nodejs.org/en)
- [worker](https://developers.cloudflare.com/workers/)

## 我们做了什么？

Banana UI 打包了支持服务端渲染的构建产物，并配置在了 package.json 的`exports`字段中，在 node 或 worker 环境中，你可以直接使用 Banana UI，并不需要额外的配置。

```json
{
  "exports": {
    ".": {
      "worker": "./node/index.js",
      "node": "./node/index.js",
      "default": "./dist/index.js"
    }
  }
}
```

如果它在服务端渲染报错了，请检查你运行环境中的[conditions](https://nodejs.org/api/packages.html#resolving-user-conditions)配置。

相关文档：https://nodejs.org/api/packages.html#conditional-exports

## 已验证过的 SSR 框架

- ✅ [Remix](https://remix.run/)
- ✅ [Hydrogen](https://hydrogen.shopify.dev/)
- ❓ [Next.js](https://nextjs.org/)

:::warning
经验证，Banana 在Next.js@12.3.4中正常运作，但是在 13/14 版本中会出现问题。
相关 issue：https://github.com/vercel/next.js/discussions/57428
:::
