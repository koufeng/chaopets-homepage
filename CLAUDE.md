# 五行小兽 官网 · 协作约束

> 给 AI 协作者（Claude Code 等）使用的快速地图。修代码前请先扫一遍。

## 这是什么

「五行小兽 / Wǔ Xíng Beasts」品牌官网 v1。山海集出品的中国五行哲学潮玩盲盒 IP，8 个角色：

- 五行：jin / mu / shui / huo / tu （金/木/水/火/土）
- 三相：xuan / yao / hundun （玄·阴 / 曜·阳 / 混沌）

文档 / 设计源在 `docs/官网设计构思.md`，记得先读它再下手改重要逻辑。

## 技术栈一句话

Astro 5 静态站 + Tailwind 4 + 自研 CSS / IO 视差 + sharp 图像处理 + @vite-pwa/astro。**全静态、零后端**。

## 关键约束（不要改的口径）

1. **资产只有 PNG**——`src/assets/beasts/*.png`（romanized 命名：jin/mu/shui/huo/tu/xuan/yao/hundun/group）。**不要假设有 3D 模型**。Three.js 已装但只作未来预留，v1 不用。
2. **包管理用 pnpm**——`onlyBuiltDependencies` 允许 `esbuild` + `sharp`。
3. **设计文档明确"未来版本"的功能不要做**：在线抽盒机、藏家五行阁、UGC 灵感池。要做的话先和用户对齐。
4. **`directly outlinks` 用 `lulumart.app`**（或环境变量 `PUBLIC_LULUMART_URL`）作为购买实体盲盒的去处。
5. **dark theme 锁死**——`color-scheme: dark`，没有亮色模式。
6. **中文优先**——文案、注释、issue 都用中文；用户也用中文沟通。

## 命令速查

```bash
pnpm dev              # 启动开发（默认 :4321）
pnpm build            # gen:assets + astro check + astro build
pnpm preview          # 预览生产产物
pnpm gen:assets       # 重新生成 PWA 图标 + OG 卡
```

## 目录索引（高频改动点）

| 改动需求 | 文件 |
|---|---|
| 8 只灵的元数据（情绪/签名/故事/调色） | `src/data/beasts.ts` |
| 12 时辰 → 渐变色 | `src/lib/time.ts` |
| 共鸣测试题与匹配算法 | `src/lib/resonance.ts` |
| 埋点事件常量 | `src/lib/analytics.ts` |
| 全局 token / 字体 / 颜色 | `src/styles/global.css`（`@theme` 块） |
| 全站布局 / meta / 渐进增强 | `src/layouts/Base.astro` |
| 导航 / Footer | `src/components/Header.astro` / `Footer.astro` |
| 首页 hero | `src/components/HomeHero.astro` |
| 单只小兽页模板 | `src/pages/beasts/[id].astro` |
| PWA / sitemap | `astro.config.mjs` |
| PWA 图标生成 | `scripts/generate-icons.mjs` |

## 已建立的约定（请沿用）

- **路径别名**：`@/*` 指向 `src/*`，全程使用，不要写相对路径如 `../../`
- **图片导入**：用 `import xxx from '@/assets/...'`，组件里用 `<Image src={xxx} ... />`（来自 `astro:assets`）。这样会自动出 webp 多档
- **角色调色**：每只灵的 palette 在 `beasts.ts`，渲染时通过 `--c-aura / --c-deep / --c-glow / --c-ink / --c-surface / --g1/g2/g3` 注入到 inline `style`
- **粒子**：用 `<ParticleField kind="..." count={...} />`；新增 `kind` 要同步更新 `beasts.ts` 的 `ParticleKind` 联合类型 + `ParticleField.astro` 的 `palettes` 表
- **入场动效**：`.fade-up` 默认 opacity:0；`Base.astro` 里的 IO 会在元素进入视口时加 `is-visible`。**只在 `.js` 子选择器下生效**（渐进增强：JS 禁用时内容直接可见）
- **埋点**：`track(Events.XXX, { ... })`，不要直接 `window.plausible(...)`
- **导航跳转**：站内用 `<a href="/...">`，站外用 `target="_blank" rel="noopener"`
- **`<script>` 块**：写在 `.astro` 文件里被处理为 ESM 模块（默认有 type=module 行为）；要写成 inline 早执行的，用 `<script is:inline>`

## 应避免的反模式

- 不要写 `astro check` 之外的额外 lint / format 工具，没必要
- 不要把 PNG 重新搬回 `images/`，那个目录是 raw 备份，构建不读
- 不要给 `.fade-up` 元素加 `style="opacity:1"` 来"修"它，那是渐进增强机制，必须保留 IO + `.js` 选择器结构
- 不要在 `src/pages/*` 之外创建新顶级路由（Astro 文件路由）
- 不要在前端 bundle 里塞密钥（`PUBLIC_*` 前缀的 env 会被打包到客户端）
- 不要把 PWA 精缓存上限再调高——大 PNG 走 runtime cache 是有意为之，避免首次安装下载 20MB+

## 用户偏好

- **沟通语言：中文**
- **代码注释：中文优先**
- **风格：简洁，不绕弯子，先给结论再给细节**
- **要变更视觉/文案，先确认**——这是品牌站，文案细节由 brand owner 拍板
