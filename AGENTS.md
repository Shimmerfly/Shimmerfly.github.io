# AGENTS.md

本文件为 AI 编码代理提供本仓库的导航信息。修改代码前请先阅读本文件，并结合根目录下的 `CLAUDE.md`（项目架构细节）使用。

## 项目概览

**Firefly（流萤）** 是一款基于 **Astro 7** + **Svelte 5** + **Tailwind CSS 4** 构建的清新美观的静态博客主题，是 [Fuwari](https://github.com/saicaca/fuwari) 的二次开发分支（上游：[CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)）。

本仓库是个人 fork，主要语言为简体中文，附带 en、zh_TW、ja、ko、ru 的 i18n。站点部署在 GitHub Pages，域名为 `https://shimmerfly.github.io`。

## 常用命令

包管理器固定为 **pnpm**（`preinstall` 脚本强制），Node.js >= 22。

| 命令 | 用途 |
|---|---|
| `pnpm dev` / `pnpm start` | 本地开发服务器（localhost:4321） |
| `pnpm check` | Astro 诊断（astro check） |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations`（覆盖 src/ 和 scripts/） |
| `pnpm lint` | Biome 检查 + 自动修复（仅 ./src） |
| `pnpm format` | Biome 格式化（仅 ./src） |
| `pnpm build` | 完整生产构建（GitHub 卡片数据 → LQIP → VNDB 封面 → Astro build → pio 资源裁剪 → 字体子集化 → 内联脚本压缩 → Pagefind 索引） |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm new-post <filename>` | 脚手架新文章 |
| `pnpm new-dynamic` (`new-d`) | 脚手架新动态（微博客）条目 |
| `pnpm lqips` | 重新生成 `src/constants/lqips.json` |

**注意**：`package.json` 声明 `"packageManager": "pnpm@11.22.0"`，pnpm 会自动切换到该版本。若本机未安装对应版本，pnpm 会尝试自动下载；网络受限时可配置 socks5 代理（如 `HTTPS_PROXY=socks5://127.0.0.1:7897`）后重试。

## 代码结构

```
src/
├── pages/          # Astro 文件路由（bangumi、bilibili、vndb、mal、friends、sponsor...）
├── layouts/        # 布局组件（Layout.astro、MainGridLayout.astro）
├── components/     # 按域组织的组件：analytics/ comment/ common/ controls/ features/ layout/ misc/ pages/ widget/
├── config/         # 站点配置（siteConfig.ts、sidebarConfig.ts、backgroundWallpaper.ts 等），经 src/config/index.ts 导出
├── types/          # 与 src/config 对应的类型定义
├── content/        # 内容集合：posts/（博客文章）、spec/（关于、留言板）、dynamic/（动态）
├── content.config.ts  # 内容集合 schema
├── plugins/        # 15 个自定义 remark/rehype 插件（Mermaid、PlantUML、KaTeX、GitHub 卡片、阅读时间、wiki 链接等）
├── i18n/           # i18nKey.ts + languages/*.ts + translation.ts
├── utils/          # 排序、加密文章、日期格式化、图片/LQIP、TOC 等
├── styles/         # 全局样式
├── assets/         # 源码管理的图片（壁纸、头像等）
├── constants/      # lqips.json、icons-data.json 等生成/静态数据
└── workers/        # 边缘/服务端逻辑
scripts/            # 构建工具（generate-lqips.ts、generate-vndb-covers.ts、generate-github-card-data.ts、subset-fonts.ts、new-post.js 等）
public/             # 直接静态服务（favicon、pio、gallery、videos 等）
docs/               # 多语言 README 与图片
```

路径别名（tsconfig.json）：`@components/*`、`@assets/*`、`@constants/*`、`@utils/*`、`@i18n/*`、`@layouts/*` → `./src/<dir>/*`；`@/*` → `./src/*`。

## 编码规范

- **Biome** 负责格式化与 lint：tab 缩进、双引号、推荐 lint 规则集
- `.svelte` / `.astro` / `.vue` 文件放宽部分规则（useConst、useImportType、noUnusedVariables、noUnusedImports）
- 组件命名 `PascalCase`（`PostCard.astro`、`Search.svelte`）；配置文件 `camelCase` 以 `Config.ts` 结尾；工具函数用 kebab-case 文件名（如 `date-utils.ts`）
- `pnpm lint`/`pnpm format` 仅作用于 `./src`；`scripts/` 只做 type-check，存在既有 Biome 发现项，勿顺手大改
- 保持 `src/types` 与 `src/config` 对齐

## 内容集合

- **posts**：`.md`/`.mdx`，frontmatter 含 title、published、tags、category、draft、pinned、password、comment 等
- **spec**：特殊页面（about、guestbook 等）
- **dynamic**：动态条目 `.md`，frontmatter 含 published、pinned、location

## 提交规范

遵循 **Conventional Commits**，与现有历史保持一致：`feat:`、`fix:`、`chore:`、`docs:`、`perf:`、`refactor:` 等。一次提交只关注一个主题。提交前运行 `pnpm check` 与 `pnpm type-check`；涉及渲染/内容/生成资产时运行 `pnpm build`。

## 仓库工作流（重要）

- 工作分支为 **`Shimmerfly`**（origin 默认分支即 Shimmerfly，也是 GitHub Pages 部署分支，见 `.github/workflows/deploy.yml`）
- **同步上游**：`git fetch upstream` → `git merge upstream/master`（历史上一直采用 merge 而非 rebase）→ 解决冲突 → 验证 → 提交 merge → `git push origin Shimmerfly`
- remote：
  - `origin` = `https://github.com/Shimmerfly/Shimmerfly.github.io.git`（个人 fork 仓库）
  - `upstream` = `https://github.com/CuteLeaf/Firefly.git`（上游模板）
- 合并上游冲突时，原则是**结构跟随上游、保留本 fork 的个性化配置**（站点 URL、标题、页面开关、图片、链接等），例如 `src/config/siteConfig.ts` 的 `pages` 开关、`backgroundWallpaper.ts` 的壁纸/轮播/横幅文字

## 部署

- **GitHub Pages**（主）：push 到 `Shimmerfly` 分支触发 `.github/workflows/deploy.yml`
- **Vercel**（`vercel.json`）、**Cloudflare Workers**（`wrangler.jsonc`，需设 `CF_WORKERS` 环境变量）
- 构建产物输出到 `dist/`（gitignore）

## 安全提示

- 不要把密钥、令牌、服务 key 提交进配置文件（如 `siteConfig.ts` 的 `vndb.apiToken` 保持为空）
- 提交前复查生成文件：`src/constants/lqips.json`、`src/constants/icons-data.json`、`dist/`
- `public/vndb-covers/` 为 gitignore 的下载产物，勿提交
