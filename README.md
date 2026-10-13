# Marszy 的个人主页

使用 Next.js、React 和 Tailwind CSS 的单页个人主页，部署在 Vercel。首页在构建时预渲染；主题跟随系统，并保留浏览器已保存的主题偏好。

## 本地开发

使用 Node.js 24 和 `package.json` 中指定的 pnpm 版本。`.node-version` 与 GitHub Actions 使用同一个 Node 主版本，避免开发与自动检查环境不一致。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 验证改动

```sh
pnpm check
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
```

`pnpm check` 依次执行类型检查、代码检查、格式检查和默认的 Turbopack 生产构建。类型检查会先运行 `next typegen`，生成全新安装环境所需的 Next.js 类型声明，不依赖旧构建文件。浏览器测试使用上一步的生产产物，自动在本机 3100 端口启动服务。

测试覆盖首页资源、链接目的地、44 像素点击区域、键盘焦点、系统主题变化、保存的主题偏好、减少动态效果设置、320 像素窄屏、禁用 JavaScript、永久跳转（含查询参数）和 404。`pnpm test:e2e` 验证 Chromium 的桌面/窄屏、浅色/深色四种组合，以及 WebKit 手机模拟，共 40 项。WebKit 测试不能替代真实 iPhone/Safari 设备验收；目前不包含完整的可访问性审核。

Firefox 的 8 项检查使用 `pnpm test:firefox` 单独执行，Linux CI 会额外运行它。当前本机 Firefox 在打开页面前就提示无法访问配置目录，与 [Playwright 的 macOS 已知启动问题](https://github.com/microsoft/playwright/issues/42768) 相符，因此尚未验证通过。没有通过修改系统权限、浏览器保护或用户配置来绕过这个问题。

若本机的受限运行环境禁止 Turbopack 创建内部监听端口，可以补充验证：

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build:webpack
pnpm test:e2e
```

Webpack 验证通过不代表默认 Turbopack 构建也通过。GitHub Actions 始终运行默认构建，不会自动忽略或绕过失败。

需要分析打包体积时，运行 `pnpm analyze`，查看终端给出的报告位置。当前使用 Next.js 自带的 Turbopack 分析命令，不再安装仅服务于 Webpack 的分析插件。

## 发布与配置

- GitHub Actions 对 PR 和 `main` 上的提交运行完整检查及浏览器测试，失败时保存测试报告。
- CI 文件只有提交并推送后才会在 GitHub 执行；合并前应将该工作流的 `check` 作业设为必须通过。这项仓库设置需要仓库管理员操作。
- `next.config.js` 统一维护安全响应头及 `/blog`、`/twitter`、`/github` 的 308 永久跳转，本地生产服务和 Vercel 使用同一套规则。
- `vercel.json` 仅保留已有的 GitHub 通知设置。旧的 `public/_headers`、`public/_redirects` 已移除；若改用其他静态托管平台，应按该平台规则配置响应头和跳转。
- 保留原有 `pnpm prod` 命令，它仍等同于生产构建，避免影响已有的发布脚本。
- `app/fonts/overpass-latin.woff2` 是 Overpass 的 Latin 可变字体，来自 Google Fonts；开源授权保存在同目录的 `OFL.txt`。构建和访客加载均使用本地字体，无需访问 Google 字体服务。
- 页面文字和链接在 `app/components/Main.tsx`；分享、canonical 和 manifest 配置在 `app/components/siteMeta.ts`；图标和 manifest 文件在 `public/`。

## 依赖维护原则

优先解决实际安全、兼容性或维护问题。框架大版本迁移单独评估；不因为版本较新就替换已经稳定工作的方案。

- 依赖更新机器人为 `renovate[bot]`，没有开启自动合并。
- 保持三天发布时间缓冲；已过期的特定版本豁免已经移除。
- 安全告警更新的时间限制设为空列表，不受周末更新计划限制；更新规则已通过 Renovate 官方配置规范验证。
- Tailwind 的 `<4` 限制只作用于 Tailwind；同组的 PostCSS 与 Autoprefixer 可以正常获得更新。
- TypeScript 暂时限制为 `<6.1`，与当前 typescript-eslint 的支持范围一致。调整限制前先确认整套检查工具兼容。
- `@eslint/eslintrc>js-yaml` 保持 4.x，`minimatch@3>brace-expansion` 保持 1.x。底层替换跨大版本前，需要验证调用者；后者直接替换为 5.x 已复现接口错误。
- 完整的替换路径使用 Renovate 的 `matchDepNames` 匹配；`matchPackageNames` 只用于真正的包名，避免限制规则不生效。
- 更新后执行完整检查和浏览器测试。Vercel 构建成功不能替代这些检查。

### 临时依赖替换的退出条件

`pnpm-workspace.yaml` 中保留必要的版本下限，限制在兼容的大版本范围内。安全版本下限与上游要求都满足后，每次只撤回一条规则，重新安装并检查锁定文件、安全审计和测试结果。

| 替换规则                    | 当前用途与撤回检查                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `next>sharp`                | 保持在 0.35.5 或更高的 0.35.x；确认 Next 自身要求和锁定版本达到下限后可撤回。                        |
| `postcss>source-map-js`     | 保留已有的 1.2.2 兼容下限；上游解析结果自然达到该版本时撤回。                                        |
| `postcss-selector-parser`   | 保留现有安全修复。它跨越部分调用者声明的 6.x，需要重点检查 Tailwind 的样式输出，等待调用者正式兼容。 |
| `@eslint/eslintrc>js-yaml`  | 保持安全的 4.3.2 下限，等待上游要求自然达到安全版本；不强制替换为 5.x。                              |
| `postcss>nanoid`            | 保持已修补的 3.3.19 下限；上游解析结果自然达到该版本时撤回。                                         |
| `browserslist`              | 保持已修补的 4.29.0 下限；所有调用者与锁定结果满足后撤回。                                           |
| `baseline-browser-mapping`  | 保持已修补的 2.11.25 下限；所有调用者与锁定结果满足后撤回。                                          |
| 两条 `brace-expansion` 规则 | 分别维持调用者可用的 1.x、5.x 安全版本，不将旧调用者强行接到新接口。                                 |

已撤回旧的 `next>postcss` 替换：当前 Next 16.3.8 自身固定要求 PostCSS 8.5.23，已经达到原安全下限。

### 未关闭的安全告警

截至 2026-10-13，`braces` 3.0.3 的 [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) 仍没有已发布的修复版本。深度嵌套的恶意文件匹配规则可能导致 Node 进程崩溃。

本项目通过 Tailwind 和代码检查工具间接使用它，尚未发现访客输入触发路径；此前的生产构建追踪未列出该包。把构建工具移到开发依赖只会改正分类，不会修复漏洞。保留告警，关注上游；不要在这些工具中处理外部传入的文件匹配规则。

```sh
pnpm audit
pnpm why braces
```

发现新的告警时，重新核实影响路径。不能为了让审计变绿而忽略、关闭告警或强行替换不兼容的大版本。
