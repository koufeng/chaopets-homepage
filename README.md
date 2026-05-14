# 五行小兽 · Wǔ Xíng Beasts

> 一座会呼吸的东方奇幻数字藏馆。
>
> 「唤之以诚，则灵兽现身。」

[五行小兽] 是一套以中国五行哲学为世界观底座、以"元素神兽"为核心形象的潮玩盲盒 IP。本仓库是其品牌官网（v1）—— 不是货架展示，而是世界观沉浸入口。

- 8 只小兽：金 · 木 · 水 · 火 · 土（五行） + 玄 · 曜 · 混沌（三相）
- 5 大版块：流转之境 / 起源故事 / 角色档案馆 / 古灵新生系列 / 灵兽共鸣测试

线上设计文档见 [`docs/官网设计构思.md`](docs/官网设计构思.md)。

---

## 技术栈

| 层 | 选型 | 备注 |
|---|---|---|
| 框架 | [Astro 5](https://astro.build) | 全静态生成，零运行时 JS（除按需 hydrate） |
| 样式 | [Tailwind CSS 4](https://tailwindcss.com) | 通过 `@tailwindcss/vite` 集成，设计 token 写在 `src/styles/global.css` 的 `@theme` |
| 动效 | CSS 视差 / 自研 IO + Mouse Parallax / [GSAP](https://gsap.com)（已装备，按需引入） | 没有真 3D 模型，伪 3D 用 CSS perspective + 鼠标/陀螺仪驱动 |
| 图像 | `astro:assets` + [`sharp`](https://sharp.pixelplumbing.com) | 自动多格式（webp）+ 多 density |
| PWA | [`@vite-pwa/astro`](https://vite-pwa-org.netlify.app/) | manifest + Service Worker + 离线缓存 |
| 类型 | TypeScript（`astro/tsconfigs/strict`） | 路径别名 `@/*` → `src/*` |
| 包管理 | **pnpm**（v10+） | `onlyBuiltDependencies` 已允许 `esbuild`、`sharp` |

> Three.js 与 `@types/three` 已装在依赖里，但 v1 没有真 3D 场景；预留给后续 3D 模型接入。

---

## 快速开始

```bash
# 安装
pnpm install

# 启动开发服务器（默认 4321）
pnpm dev

# 类型检查 + 生产构建（自动跑 sharp 生图）
pnpm build

# 本地预览构建产物
pnpm preview

# 手动生成 PWA 图标 + OG 卡（一般用不到，build 已包含）
pnpm gen:assets
```

构建产物输出到 `dist/`，约 21 MB（含原始 PNG）。

---

## 目录结构

```
.
├── docs/                       # 设计文档（产品/品牌方维护）
│   └── 官网设计构思.md
├── public/                     # 静态文件（直接 copy 到 dist/）
│   ├── favicon.svg
│   ├── icons/                  # PWA 图标（脚本生成）
│   ├── share/og-default.png    # OG 默认分享卡
│   └── robots.txt
├── scripts/
│   └── generate-icons.mjs      # 生成 PWA 图标 + OG 默认卡
├── src/
│   ├── assets/beasts/          # 8 只灵 + 全家福（romanized 文件名）
│   ├── components/             # Header / Footer / BeastCard / BeastStage / HomeHero / ParticleField / SectionHeading
│   ├── data/
│   │   └── beasts.ts           # ★ 8 只灵的全部元数据：名字/情绪/签名/调色板/粒子/故事碎片
│   ├── layouts/
│   │   └── Base.astro          # 全站骨架：meta / 时辰光晕 / Header / Footer / fade-up IO / 埋点注入
│   ├── lib/
│   │   ├── analytics.ts        # 埋点工具（Plausible + GA 双通道）
│   │   ├── resonance.ts        # 灵兽共鸣测试题库 + 匹配算法
│   │   └── time.ts             # 12 时辰 → 渐变色 / CSS 变量
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── beasts/
│   │   │   ├── [id].astro      # 8 只灵的独立详情页（动态路由）
│   │   │   └── index.astro     # 档案馆索引
│   │   ├── index.astro         # 首页 · 五行流转之境
│   │   ├── origin.astro        # 起源故事
│   │   ├── resonance.astro     # 灵兽共鸣测试 + 分享卡
│   │   └── series.astro        # 古灵新生系列 + lulumart 跳转
│   ├── styles/
│   │   └── global.css          # 设计 token + 全局基础 + 通用动效 keyframes
│   └── env.d.ts
├── astro.config.mjs            # Astro / PWA / Sitemap 配置
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── .env.example                # 环境变量模板
```

---

## 内容修改指引

| 想做什么 | 改哪里 |
|---|---|
| 改某只小兽的名字 / 情绪 / 签名 / 故事 | `src/data/beasts.ts` |
| 加 / 删一只小兽 | `src/data/beasts.ts` + 把 PNG 放进 `src/assets/beasts/` |
| 改时辰渐变色 | `src/lib/time.ts` 的 `SHICHEN` 数组 |
| 改共鸣测试题或权重 | `src/lib/resonance.ts` |
| 改全局调色板 / 字体 | `src/styles/global.css` 的 `@theme` |
| 改导航 / footer 链接 | `src/components/Header.astro` / `Footer.astro` |
| 改 lulumart 跳转目标 | 设置 `PUBLIC_LULUMART_URL` 环境变量 |
| 改埋点事件 | `src/lib/analytics.ts` 的 `Events` 常量 |
| 改 PWA 图标 / OG 卡 | `scripts/generate-icons.mjs` 后跑 `pnpm gen:assets` |

---

## 环境变量

复制 `.env.example` 为 `.env`（不要提交）：

```bash
SITE_URL=https://wuxing-beasts.com   # 站点正式域名（影响 canonical / OG / sitemap）
PUBLIC_LULUMART_URL=https://lulumart.app

# 可选：埋点接入（任填一个或两个）
PUBLIC_PLAUSIBLE_DOMAIN=wuxing-beasts.com
PUBLIC_GA_ID=G-XXXXXXXXXX
```

> `PUBLIC_*` 前缀变量会被打入客户端 bundle，不要塞密钥。

---

## 部署

构建产物是纯静态站点，几乎所有 Static Host 都能跑：

### Vercel
1. 直接 import 仓库
2. Build Command: `pnpm build` · Output Directory: `dist` · Install Command: `pnpm install`
3. 在 Project Settings → Environment Variables 填上述变量

### Netlify
1. Build Command: `pnpm build` · Publish Directory: `dist`
2. 在 Site Settings → Environment Variables 填变量

### Cloudflare Pages / 自托管
- Build: `pnpm build`
- Publish: `dist/`
- 域名后记得在 host 上把 `_astro/` 里的资源加上 `Cache-Control: public, max-age=31536000, immutable`（文件名都带 hash）

---

## 设计与品牌

- **核心调性**："萌趣而不失底蕴"。大量留白 + 微动效 + 细腻阴影
- **色彩体系**：不直接用高饱和五行色，而是按当前真实时辰流转主色（见 `src/lib/time.ts`）
- **粒子层**：每只灵有专属粒子（金箔尘 / 花瓣 / 水滴 / 余烬 / 土砾 / 雾 / 光屑 / 原初尘），见 `src/components/ParticleField.astro`
- **首页 3D 感**：CSS perspective + 鼠标/陀螺仪驱动的多层视差，没有真 Three.js 场景

---

## 路线图

v1 已完成 doc 中**未标注延后**的全部模块；以下功能按 doc 标注延后：

- [ ] 在线抽盒机（v2）：摇盒 / 称重 / 透卡 / 全屏爆灯
- [ ] 藏家五行阁（v2+）：登录 + 收集进度 + 五行合成
- [ ] UGC 灵感池（v2+）：二创瀑布流 + 节气活动

可继续打磨的细节：

- [ ] 角色感官彩蛋音效（金属碰撞声 / 水滴声等，待音频资产）
- [ ] 灵兽共鸣题目扩展到 5 道，结果增加副守护
- [ ] 真 3D 模型接入（Three.js + GLB）

---

## 致谢

- 山海集 出品，五行小兽 IP 视觉资产
- 字体：Noto Serif SC / Noto Sans SC / Cormorant Garamond（Google Fonts）

© 五行小兽 · 山海集出品
