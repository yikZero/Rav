# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun dev` (runs on port 11300, uses `--webpack` flag)
- **Build**: `bun run build` (uses `--webpack` flag)
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

**Important**: Metadata comes from filesystem parsing, content comes from webpack-compiled MDX modules. These are independent.

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
/api/og                        # OG image generation
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
- **Rehype**: `rehype-unwrap-images`, `rehype-slug`, `rehype-autolink-headings`, `rehype-accessible-emojis`
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

### Image Optimization

- Custom CDN loader (`lib/image-loader.ts`) for `cdn.yikzero.com`
- Appends `!/fw/{width}/format/webp/quality/{quality}` to image URLs
- Docker builds use `unoptimized: true`

### Component Patterns

- **Server components by default**, `'use client'` only for interactivity
- **Async params**: `const { slug, locale } = await params` or `const { locale } = use(params)` for synchronous server components
- **i18n requirement**: `setRequestLocale(locale)` must be called at the top of every page/layout component
- **Icon components**: Auto-generated from SVG files in `assets/` via `bun run svg`
- **Utility function**: `cn()` in `lib/utils.ts` — `clsx` + `tailwind-merge` wrapper

### Stack Data

Tech stack data is defined in `lib/stack.ts` as a typed array (`StackItem[]`) with bilingual descriptions. Categories: AI, Design, Development, Productivity.
