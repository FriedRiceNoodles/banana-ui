import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: [
    '/favicons/favicon.ico',
    '/favicons/favicon-16x16.png',
    '/favicons/favicon-32x32.png',
    '/favicons/favicon-64x64.png',
  ],
  logo: '/logos/nav-logo-375.png',
  analytics: {
    baidu: 'df33e0123cd576892df8bc4ac64788cf',
    ga_v2: 'G-SC8THD4FR9',
  },
  sitemap: {
    hostname: 'banana-ui.com',
  },
  themeConfig: {
    name: 'Banana UI',
    hideNameOnHeader: true,
    footer: false,
    hero: {
      showCustomContent: true,
    },
    socialLinks: {
      github: 'https://github.com/FriedRiceNoodles/banana-ui',
    },
    hideHomeNav: true,
    nav: [
      {
        title: '指南',
        link: '/guide/introduction',
      },
      {
        title: '组件',
        link: '/example/button',
      },
    ],
    sidebar: {
      '/example': [
        {
          title: '通用',
          children: [
            {
              link: '/example/button',
              title: 'Button 按钮',
            },
            {
              link: '/example/divider',
              title: 'Divider 分割线',
            },
            {
              link: 'example/dropdown',
              title: 'Dropdown 下拉菜单',
            },
            {
              link: '/example/menu',
              title: 'Menu 菜单',
            },
            {
              link: '/example/overlay',
              title: 'Overlay 遮罩层',
            },
            {
              link: '/example/popup',
              title: 'Popup 弹层',
            },
            {
              link: '/example/modal',
              title: 'Modal 对话框',
            },
          ],
        },
        {
          title: '数据展示',
          children: [
            {
              link: '/example/carousel',
              title: 'Carousel 轮播图',
            },
            {
              link: '/example/collapse',
              title: 'Collapse 折叠面板',
            },
            {
              link: '/example/countdown',
              title: 'Countdown 倒计时',
            },
            {
              link: '/example/marquee',
              title: 'Marquee 跑马灯',
            },
            {
              link: 'example/progress',
              title: 'Progress 进度条',
            },
          ],
        },
        {
          title: '数据录入',
          children: [
            {
              link: '/example/checkbox',
              title: 'Checkbox 复选框',
            },
            {
              link: '/example/input',
              title: 'Input 输入框',
            },
            {
              link: '/example/radio',
              title: 'Radio 单选框',
            },
            {
              link: '/example/rating',
              title: 'Rating 评分',
            },
            {
              link: '/example/select',
              title: 'Select 选择器',
            },
            {
              link: '/example/stepper',
              title: 'Stepper 数量选择器',
            },
          ],
        },
        {
          title: '操作反馈',
          children: [
            {
              link: '/example/message',
              title: 'Message 提示',
            },
            {
              link: '/example/tooltip',
              title: 'Tooltip 文字提示',
            },
          ],
        },
      ],
    },
    prefersColor: { default: 'light', switch: false },
  },
});
