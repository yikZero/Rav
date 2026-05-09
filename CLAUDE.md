# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun dev` (runs on port 11300, Turbopack by default)
- **Build**: `bun run build` (Turbopack by default)
- **Production server**: `bun run start` (port 11300)
- **Linting**: `bun run lint`
- **SVG optimization**: `bun run svg` (generates React components from `assets/` into `components/icons/`)
- **Translation**: `bun run translate` (translates zh-CN posts to English)
- **Force translation**: `bun run translate:force` (re-translates all posts)

No test framework is configured in this project.

## Architecture Overview

This is a Next.js 16 blog/portfolio application with MDX content, internationalization, and AI integration.

### Key Architecture Patterns

- **App Router**: Next.js 16 app directory with nested routing
- **Internationalization**: `next-intl` v4
  - Default locale: `zh-CN` (Chinese), also supports `en`
  - Locale prefix strategy: `as-needed` (default locale has no prefix in URL)
  - i18n messages in `messages/[locale].json`
  - Config in `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`
- **Content Management**: MDX files in `content/` with localized versions
- **Static Site Generation**: `generateStaticParams()` + `dynamicParams = false` for full static export
- **React Compiler**: Enabled via `reactCompiler: true` in next.config.ts
- **Experimental**: `inlineCss` and `viewTransition` enabled

### Content Loading Architecture

**Critical pattern**: Two separate systems for content:

1. **Metadata Loading** (`lib/post.utils.ts`):
   - `getBlogPosts({ language, filterPublished, limit })` - Server-side filesystem reading with `react.cache`
   - Parses frontmatter from MDX files using `yaml` package (with regex fallback)
   - In development mode, draft posts are shown regardless of `filterPublished`
   - Used for: listing pages, sitemap, static params, RSS

2. **Content Rendering** (`lib/mdx.utils.ts`):
   - `loadLocalizedMDX(directory, locale, slug)` - Dynamic import of compiled MDX
   - Returns React component (not raw content), falls back to `null`
   - Used for: actual page rendering

**Important**: Metadata comes from filesystem parsing, content comes from Turbopack-compiled MDX modules. These are independent.

### Content Structure

```
content/
├── posts/
│   ├── zh-CN/       # Chinese posts (source of truth)
│   └── en/          # English posts (auto-translated)
├── changelogs/
│   ├── zh-CN/
│   └── en/
└── projects/
    ├── zh-CN/
    └── en/
```

MDX frontmatter:

```yaml
---
title: string
publishedAt: string (YYYY-MM-DD)
updatedAt: string (YYYY-MM-DD, optional)
description: string
image: string (URL)
category: string
state: 'draft' | 'published' | 'archived'
---
```

### Translation Workflow

- **Source**: `content/posts/zh-CN/` → **Target**: `content/posts/en/`
- **Engine**: Google Generative AI (requires `GOOGLE_GENERATIVE_AI_API_KEY`)
- **State tracking**: `scripts/translate-state.json` (file hash-based incremental)
- Only translates `state: published` posts; skips drafts
- English blog posts show "Machine-translated from Chinese" notice

### Routing Structure

```
/                              # Redirects to default locale
/[locale]                      # Home page
/[locale]/blog                 # Blog listing
/[locale]/blog/[slug]          # Blog post detail
/[locale]/stack                # Tech stack page
/[locale]/[...rest]            # Catch-all → notFound()
/rss.xml                       # RSS feed
/sitemap.xml                   # Auto-generated sitemap
/robots.txt                    # Auto-generated robots
```

Legacy redirects in `next.config.ts`: `/posts` → `/blog`, `/drafts` → `/works`

### Configuration

- `rav.config.ts` - Site-wide config (title, author, URLs, description, email, since year)
- `next.config.ts` - MDX pipeline, redirects, i18n plugin, image optimization, standalone output
- `i18n/routing.ts` - Locale definitions and routing config

### MDX Processing Pipeline

Configured in `next.config.ts`:

- **Remark**: `remark-frontmatter`, `remark-gfm`
- **Rehype**: `rehype-unwrap-images`, `rehype-slug`, `rehype-autolink-headings`
- **Syntax highlighting**: `prism-react-renderer` (client-side, custom theme in `components/code-block.tsx`)

### Styling System

- **Tailwind CSS 4** with CSS-first `@theme` directive in `app/globals.css`
- **Design tokens** (dark-theme-only, oklch colors):
  - Text: `text-strong` (85% white), `text-sub` (85%), `text-soft` (65%), `text-weak` (45%), `text-disabled` (25%)
  - Background: `bg-background` (dark blue-gray)
  - Brand: `brand-50` through `brand-950` (blue/indigo palette)
- **Content max width**: `max-w-172` (custom Tailwind width)
- **MDX content wrapper**: `.rypo` class in `globals.css` — all MDX article styling (headings, paragraphs, lists, tables, code blocks, images)
- **Animation classes**: CSS-only animations (`stagger-animate`, `stagger-animate-sm`, `section-animate`, `hero-animate`, `header-animate`) — no JS hydration needed
- **View transitions**: Enabled experimentally, used for nav slides (`.nav-slide`)

### Image Hosting

- Static assets hosted on **Upyun** CDN, served via `cdn.yikzero.com`
- Custom image loader (`lib/image-loader.ts`) auto-appends Upyun processing params (`!/fw/{width}/format/webp`)
- For images with manual processing params (e.g. `!/fh/572/format/webp`), the loader skips auto-processing
- `next.config.ts` uses `loader: 'custom'` with `loaderFile: './lib/image-loader.ts'`

**Upyun image processing params**:

- `!/fw/{width}` — resize by width
- `!/fh/{height}` — resize by height
- `format/webp` — convert to WebP format
- `quality/{q}` — set quality (0-100)
- Example: `https://cdn.yikzero.com/image.jpg!/fw/1920/format/webp`

**Common paths on CDN**:

- `common/` — site-wide assets (avatar, etc.)
- `roominess5/about/` — about page photos
- `roominess5/designwork/` — OG image assets
- `markdown/images/` — blog post images (MDX content)

### Component Patterns

- **Server components by default**, `'use client'` only for interactivity
- **Async params**: `const { slug, locale } = await params` or `const { locale } = use(params)` for synchronous server components
- **i18n requirement**: `setRequestLocale(locale)` must be called at the top of every page/layout component
- **Icon components**: Auto-generated from SVG files in `assets/` via `bun run svg`
- **Utility function**: `cn()` in `lib/utils.ts` — `clsx` + `tailwind-merge` wrapper

### Stack Data

Tech stack data is defined in `lib/stack.ts` as a typed array (`StackItem[]`) with bilingual descriptions. Categories: AI, Design, Development, Productivity.

## PR conventions

Write PR titles and descriptions in Chinese.

### Title

- Max 50 characters.
- Start with a verb: 新增 (add) / 修复 (fix) / 调整 (adjust) / 更新 (update) / 重构 (refactor) / 删除 (remove).
- Examples:
  - 新增博客「为什么我换回 macOS」
  - 修复 RSS feed 缺失 image 字段
  - 调整首页头图加载策略

### Description

Use the three sections below, each as an H2, in this fixed order:

```markdown
## 改动

— 1-3 句话说背景 + 做了什么。关联 issue 末尾加 Fixes #N。

## 影响

— 列以下四项，没受影响就写"无"：

- 用户面：访客看到的内容/布局/交互变化
- SEO：URL / sitemap / RSS / metadata 变化
- i18n：zh-CN 与 en 是否需要同步
- 性能：bundle 体积 / Lighthouse / 首屏

## 验证

本地怎么验（"bun dev 看页面" / "bun run build 通过" / "纯文案，预览即可"）
```

Section meanings:

- **改动 (Changes)**: 1–3 sentences covering context and what was done. Append `Fixes #N` at the end if it closes an issue.
- **影响 (Impact)**: list the four items below; write "无" (none) for any that don't apply:
  - User-facing: content / layout / interaction changes visible to visitors.
  - SEO: URL / sitemap / RSS / metadata changes.
  - i18n: whether zh-CN and en need to stay in sync.
  - Performance: bundle size / Lighthouse / first paint.
- **验证 (Verification)**: how to verify locally (e.g. "bun dev 看页面", "bun run build 通过", or "纯文案，预览即可" for copy-only changes).

### Special notes

- **i18n bilingual sync**: when editing `content/posts/zh-CN/<slug>.mdx`, either update the matching `content/posts/en/<slug>.mdx` in the same PR, or note in the description that it will be auto-synced by `bun run translate` ("待 bun run translate 自动同步").
- **Images go to Upyun**: upload new images to [cdn.yikzero.com](http://cdn.yikzero.com); do not commit them to the repo.
- **`next.config.ts` / `i18n/routing.ts` changes**: add an extra line in the description listing risk points and rollback steps ("风险点 + 回滚步骤").
