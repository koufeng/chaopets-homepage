# 部署 · Deployment

> 五行小兽官网 v1 上线手册。从 git push 到第一个用户访问的全流程。

本站是**纯静态产物**（无 server runtime 依赖），可部署到任何 static host。下文按实操频率排序。

---

## 0 · 上线前 Checklist

按顺序勾完再发布。

- [ ] `pnpm install` 在干净环境跑通
- [ ] `pnpm build` 成功（看到 `[build] Complete!`，无 ERROR）
- [ ] `pnpm preview` 在本地能打开首页 + 任意一个角色页
- [ ] `.env`（或 host 的环境变量面板）填了 `SITE_URL` 为正式域名
- [ ] `astro.config.mjs` 中的 fallback 域名 `https://wuxing-beasts.com` 改成你的实际域名（或始终通过 env 注入）
- [ ] 文案 review 通过：`src/data/beasts.ts` 的角色情绪 / 签名 / 故事碎片是 brand 校阅过的版本
- [ ] PWA 图标已是品牌确认稿（默认是脚本生成的几何 logo，正式上线建议替换）
- [ ] 埋点选型确定（Plausible 或 GA4），并在 host 配好对应 env

---

## 1 · 构建产物

```bash
pnpm build
```

实际执行的链路：

1. `node scripts/generate-icons.mjs` — 用 `sharp` 生成 PWA 图标（16/32/192/512/180）+ OG 默认卡（1200×630）
2. `astro check` — 静态类型检查（`.astro` + `.ts`）
3. `astro build` — 出静态站

输出到 `dist/`，约 **21 MB**：

```
dist/
├── _astro/                          # 内容哈希命名的 JS / CSS / WebP / 原 PNG
├── beasts/{jin,mu,...}/index.html   # 8 只灵的详情页
├── beasts/index.html                # 档案馆索引
├── icons/                           # PWA 图标（精缓存）
├── share/og-default.png             # OG 默认卡
├── 404.html / index.html / origin/ / resonance/ / series/
├── favicon.svg
├── manifest.webmanifest             # PWA manifest
├── sw.js + workbox-*.js             # Service Worker
├── registerSW.js                    # SW 注册脚本
├── robots.txt
└── sitemap-index.xml + sitemap-0.xml
```

> 21 MB 中约 **17 MB 是原始 PNG**（仅按需被 runtime cache 拉取，首次访问只加载 webp 版本，约 30–80 KB / 张）。

---

## 2 · 环境变量

| 变量 | 必填 | 用途 | 示例 |
|---|---|---|---|
| `SITE_URL` | 推荐 | canonical / OG / sitemap 的绝对 URL 前缀 | `https://wuxing-beasts.com` |
| `PUBLIC_LULUMART_URL` | 否 | 实体盲盒外链（footer / series / 角色页） | `https://lulumart.app` |
| `PUBLIC_PLAUSIBLE_DOMAIN` | 否 | 接 Plausible 埋点（自托管或 plausible.io） | `wuxing-beasts.com` |
| `PUBLIC_GA_ID` | 否 | 接 GA4 埋点 | `G-XXXXXXXXXX` |

⚠ `PUBLIC_*` 前缀的变量会被打入客户端 bundle —— **不要塞密钥**。

⚠ 修改 `SITE_URL` 后**必须重新 build**，否则 sitemap / OG / canonical 还是旧值。

---

## 3 · 部署路径

### A · Vercel（推荐）

零配置：

1. New Project → Import Git Repository
2. Framework Preset 自动识别为 **Astro**
3. **Build Command**：`pnpm build`
4. **Output Directory**：`dist`
5. **Install Command**：`pnpm install`（Vercel 已内置 pnpm，无需额外操作）
6. 在 Settings → Environment Variables 填上面的变量（`Production` + `Preview` 都要勾）
7. Deploy

绑域名：Domains → Add → 填 `wuxing-beasts.com` → 按提示在 DNS 加 CNAME。Vercel 会自动签 SSL。

预览部署：每个 PR / 分支自动生成一个独立 preview URL（用于灰度评审）。

### B · Netlify

零配置：

1. Add new site → Import existing project
2. **Build command**：`pnpm build`
3. **Publish directory**：`dist`
4. Site Settings → Environment Variables 填变量
5. Deploy

可选：在仓库根加一个 `netlify.toml` 锁死 Node 版本：

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
  PNPM_VERSION = "10"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/icons/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### C · Cloudflare Pages

1. Create project → Connect to Git
2. **Framework preset**：Astro
3. **Build command**：`pnpm build`
4. **Build output directory**：`dist`
5. Settings → Environment variables 填变量
6. Save and Deploy

可选：在 `public/_headers` 加缓存策略（Cloudflare Pages / Netlify 通用，Vercel 会忽略）：

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/icons/*
  Cache-Control: public, max-age=2592000

/sw.js
  Cache-Control: public, max-age=0, must-revalidate

/manifest.webmanifest
  Cache-Control: public, max-age=86400
```

### D · 自托管 (nginx)

构建后把 `dist/` 整个上传到服务器，nginx 配置示例：

```nginx
server {
  listen 443 ssl http2;
  server_name wuxing-beasts.com;

  ssl_certificate     /etc/letsencrypt/live/wuxing-beasts.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/wuxing-beasts.com/privkey.pem;

  root /var/www/wuxing-beasts/dist;
  index index.html;

  # 启用 brotli + gzip
  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml application/manifest+json;

  # 内容哈希文件 — 永久缓存
  location /_astro/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # 图标
  location /icons/ {
    expires 30d;
  }

  # Service Worker — 不缓存
  location = /sw.js {
    add_header Cache-Control "no-cache, must-revalidate";
  }

  # 默认：HTML 短缓存 + 必须 revalidate
  location / {
    try_files $uri $uri/ $uri.html /404.html;
    add_header Cache-Control "public, max-age=300, must-revalidate";
  }
}

server {
  listen 80;
  server_name wuxing-beasts.com;
  return 301 https://$host$request_uri;
}
```

---

## 4 · 缓存策略（重要）

| 资源类型 | 路径示例 | 推荐 Cache-Control | 原因 |
|---|---|---|---|
| 哈希命名 | `/_astro/*.{js,css,webp,png}` | `public, max-age=31536000, immutable` | 文件名带 hash，永不过期 |
| 静态图标 | `/icons/*.png`、`/favicon.svg` | `public, max-age=2592000` | 30 天，偶尔换图 |
| OG 卡 | `/share/og-default.png` | `public, max-age=2592000` | 30 天 |
| Manifest | `/manifest.webmanifest` | `public, max-age=86400` | 1 天 |
| **Service Worker** | `/sw.js` `/registerSW.js` | `public, max-age=0, must-revalidate` | **关键**：让 SW 更新能即时生效 |
| HTML | `/`、`/beasts/*/index.html` | `public, max-age=300` 或 `no-cache` | 短缓存或 revalidate，方便文案修改快速生效 |
| Sitemap / robots | `/sitemap-*.xml`、`/robots.txt` | `public, max-age=3600` | 1 小时 |

⚠ **绝对不要**给 `sw.js` 加长缓存——会导致用户卡在旧版 PWA 里。

---

## 5 · 域名 / DNS / SSL

1. 注册域名（推荐 Cloudflare Registrar / Namecheap）
2. 在 DNS 服务商加记录：
   - 用 Vercel：`A @ 76.76.21.21` + `CNAME www cname.vercel-dns.com`
   - 用 Netlify：`CNAME @ apex-loadbalancer.netlify.com` + `CNAME www <your-site>.netlify.app`
   - 用 Cloudflare Pages：在 Cloudflare 内绑定，自动接管
3. SSL 由 host 自动签发（Vercel / Netlify / Cloudflare 都默认 Let's Encrypt 自动续期）
4. 检查 HTTP → HTTPS 自动跳转

绑域名后必做：
- 把 `SITE_URL` env 改为 `https://你的域名`
- 重新触发 build
- 在 Google Search Console / Bing Webmaster 提交 sitemap

---

## 6 · 上线后核查

部署完成后 5 分钟内跑一遍：

```bash
# 1. 站点可达
curl -I https://wuxing-beasts.com           # 期望 200

# 2. 关键路由全 200
for p in / /origin /beasts /beasts/jin /beasts/xuan /beasts/hundun /series /resonance; do
  echo -n "$p → "
  curl -o /dev/null -s -w "%{http_code}\n" "https://wuxing-beasts.com$p"
done

# 3. PWA 三件套
curl -I https://wuxing-beasts.com/manifest.webmanifest  # application/manifest+json
curl -I https://wuxing-beasts.com/sw.js                 # application/javascript
curl -I https://wuxing-beasts.com/icons/icon-512.png    # image/png

# 4. SEO 三件套
curl https://wuxing-beasts.com/robots.txt
curl https://wuxing-beasts.com/sitemap-index.xml
curl -s https://wuxing-beasts.com/ | grep -E '(og:title|og:image|application/ld\+json)' | head -5
```

浏览器手动核查：

- [ ] 首页 hero 图能渲染、字体加载（思源宋体/Cormorant Garamond）
- [ ] 浏览器右下角"安装应用"提示出现（PWA OK）
- [ ] DevTools → Application → Manifest 无 warning
- [ ] DevTools → Application → Service Workers 显示 activated
- [ ] DevTools → Lighthouse Performance ≥ 85，PWA ≥ 90
- [ ] 微信 / 微博 粘贴链接，预览卡显示 og-default.png
- [ ] 灵兽共鸣测试走完三步，下载分享卡可用，复制专属链接也可用
- [ ] 移动端访问，hero 视差不出现卡顿；底部导航不被全面屏遮挡

---

## 7 · 数据观测

### Plausible（推荐 · 隐私友好）

1. 在 [plausible.io](https://plausible.io) 添加 site，domain 填 `wuxing-beasts.com`
2. 设 env：`PUBLIC_PLAUSIBLE_DOMAIN=wuxing-beasts.com`
3. 重新 build，重新部署
4. 在 Plausible Dashboard 设置以下 **自定义事件目标**（事件名见 `src/lib/analytics.ts` 的 `Events` 常量）：
   - `home_hero_viewed` — 首页 hero 曝光
   - `resonance_opened` / `resonance_completed` / `resonance_shared` — 共鸣漏斗
   - `beast_viewed` — 角色页 PV（带 `beast` prop）
   - `series_outlink` — 跳 lulumart 的转化（关键转化指标）
   - `origin_finished` — 起源故事读完率

### GA4（备用）

1. 在 [analytics.google.com](https://analytics.google.com) 创建 GA4 property，拿到 Measurement ID（`G-XXXXXXXXXX`）
2. 设 env：`PUBLIC_GA_ID=G-XXXXXXXXXX`
3. 重新 build + 部署
4. 在 GA4 → 事件 中创建以上事件的转化标记

> 两个埋点可同时启用，互不冲突。

---

## 8 · 回滚

### Vercel
Deployments → 选一个旧的成功部署 → ⋯ → Promote to Production。**秒级回滚**。

### Netlify
Deploys → 选一个旧的 → Publish deploy。

### Cloudflare Pages
Deployments → 选一个旧的 → Rollback。

### 自托管
保留上一版 `dist/` 备份目录，nginx `root` 切换 + reload：

```bash
mv /var/www/wuxing-beasts/dist /var/www/wuxing-beasts/dist-rollback
mv /var/www/wuxing-beasts/dist-prev /var/www/wuxing-beasts/dist
nginx -s reload
```

⚠ 回滚后 PWA 用户可能在浏览器里卡着旧 SW，需手动 **DevTools → Application → Service Workers → Unregister** 或等 24 小时自然刷新。

---

## 9 · 常见问题

### Q：build 报 `Configure "workbox.maximumFileSizeToCacheInBytes"`
A：你往 `src/assets/beasts/` 塞了大于 3 MB 的新 PNG。要么压缩它，要么把它改走 runtime cache（不要再调高精缓存上限——首次 PWA 安装会拉太大）。

### Q：Vercel build 失败 `sharp` 找不到
A：检查 `package.json` 里 `pnpm.onlyBuiltDependencies` 是否包含 `sharp`。Vercel 会用项目里的 pnpm 版本，遵循该字段。

### Q：上线后 OG 卡显示不对
A：清缓存：
- 微信：暂无主动清缓存方式，等 24 小时
- Twitter/X：[Card Validator](https://cards-dev.twitter.com/validator)
- Facebook：[Sharing Debugger](https://developers.facebook.com/tools/debug/) → Scrape Again

### Q：用户反馈"看到的是上一版"
A：99% 是 PWA Service Worker 缓存。让用户：
1. 强制刷新（Cmd/Ctrl + Shift + R）
2. 或 DevTools → Application → Service Workers → Update

为减少这个问题，确保 `sw.js` 的 Cache-Control 是 `max-age=0, must-revalidate`。

### Q：移动端首屏白屏 1-2 秒
A：检查 Google Fonts 是否被墙（中国大陆访客）。临时解决：在 `Base.astro` 把 Google Fonts 改成自托管 + `font-display: swap`，或换国内 CDN（如字节的 fonts.bytedance.com）。

### Q：sitemap 里的 URL 是错的域名
A：build 时 `SITE_URL` env 没设对。在 host 上设环境变量后**重新触发 build**（仅改 env 不会自动重 build）。

---

## 10 · 后续上线 v2 时的迁移注意

doc 里标注的几个 v2 模块（在线抽盒机 / 藏家五行阁 / UGC 灵感池）会引入：

- 用户登录 → 需要后端或 Auth 服务（Clerk / Supabase / 自建）
- 抽盒交互 → 需要陀螺仪 + 物理引擎，可能要切 Astro `output: 'server'` 或加 islands hydration
- UGC → 需要 CMS 或后端

届时本文档需要新增"动态后端"章节。v1 阶段保持纯静态。

---

© 五行小兽 · 山海集出品
