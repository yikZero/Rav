# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun dev` (runs on port 11300)
- **Build**: `bun run build`
- **Production server**: `bun run start` (port 11300)
- **Linting**: `bun run lint`
- **SVG optimization**: `bun run svg` (generates React components from assets/)
- **Translation**: `bun run translate` (translates zh-CN posts to English)
- **Force translation**: `bun run translate:force` (re-translates all posts)

## Architecture Overview

This is a Next.js 16 blog application with MDX content, internationalization, and AI integration.

### Key Architecture Patterns

- **App Router**: Uses Next.js 16 app directory structure with nested routing
- **Internationalization**: Built with `next-intl` v4
  - Default locale: `zh-CN` (Chinese)
  - Supported locales: `zh-CN`, `en`
  - Locale prefix strategy: `as-needed` (default locale has no prefix)
  - i18n messages in `messages/[locale].json`
- **Content Management**: MDX files in `content/` with localized versions
- **Static Site Generation**: Uses `generateStaticParams()` with `dynamicParams = false` for full static export
- **Component Structure**: Organized by function in `components/` with icon components in `components/icons/`

### Content Loading Architecture

**Critical pattern**: The application uses a two-tier content loading strategy:

1. **Metadata Loading** (`lib/post.utils.ts`):
   - `getBlogPosts({ language, filterPublished })` - Server-side filesystem reading
   - Parses frontmatter from MDX files using regex
   - Returns post metadata (title, date, description, category, state)
   - Used for: listing pages, sitemap generation, static params

2. **Content Rendering** (`lib/mdx.utils.ts`):
   - `loadLocalizedMDX(directory, locale, slug)` - Dynamic import of compiled MDX
   - Returns React component (not raw content)
   - Falls back to null if locale version doesn't exist
   - Used for: actual page rendering

**Important**: These are separate systems. Metadata comes from filesystem parsing, content comes from webpack-compiled MDX modules.

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

MDX frontmatter structure:

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

The application includes an automated translation system:

- **Source**: `content/posts/zh-CN/` (Chinese posts)
- **Target**: `content/posts/en/` (English posts)
- **Translation tool**: Google Generative AI (requires `GOOGLE_GENERATIVE_AI_API_KEY`)
- **State tracking**: `scripts/translate-state.json` (tracks file hashes)
- **Behavior**:
  - Only translates files with `state: published`
  - Skips files with `state: draft`
  - Uses file hash to detect changes (incremental translation)
  - Preserves frontmatter structure and code blocks
- **English post notice**: Shows "Machine-translated from Chinese" notice on English blog posts

### Routing Structure

```
/                              # Redirects to /[defaultLocale]
/[locale]                      # Home page
/[locale]/blog                 # Blog listing
/[locale]/blog/[slug]          # Blog post detail
/[locale]/talk                 # Talk/chat page
/[locale]/[...rest]            # Catch-all for dynamic routes
/api/og                        # Open Graph image generation
/rss.xml                       # RSS feed
```

**Legacy redirects** (in `next.config.ts`):

- `/posts` → `/blog`
- `/drafts` → `/works`

### Configuration Files

- `rav.config.ts` - Site-wide configuration (title, author, URLs, description, email, since year)
- `next.config.ts` - Next.js config with:
  - MDX processing pipeline
  - Redirects
  - i18n setup via `next-intl/plugin`
  - Image optimization settings (CDN: cdn.yikzero.com)
  - Output mode: `standalone` (for Docker)
  - Custom port 11300 for dev and production
- `i18n/routing.ts` - i18n routing configuration (locales, default locale, locale prefix strategy)

### MDX Processing Pipeline

Enhanced with remark/rehype plugins (configured in `next.config.ts`):

**Remark plugins** (process Markdown AST):

- `remark-frontmatter` - Parse YAML frontmatter
- `remark-gfm` - GitHub Flavored Markdown support

**Rehype plugins** (process HTML AST):

- `rehype-unwrap-images` - Remove paragraph wrappers from images
- `rehype-slug` - Add IDs to headings
- `rehype-autolink-headings` - Add anchor links to headings
- `rehype-accessible-emojis` - Make emojis accessible
- `prism-react-renderer` - Client-side syntax highlighting with custom theme (see `components/code-block.tsx`)

### Styling System

- **Tailwind CSS 4** with CSS-first configuration (use `@theme` directive, not tailwind.config.js)
- **Motion library** (`motion/react-client`) for animations
  - Common pattern: `initial="hidden"` → `animate="visible"` with staggerChildren
  - Transition easing: `[0.25, 0.1, 0.25, 1]`
- **Custom fonts** in `fonts/` directory
- **Design tokens**:
  - Text colors: `text-strong`, `text-sub`, `text-soft`
  - Border colors: `border-strong`
  - Responsive breakpoint: `sm:` prefix for larger screens
- **Max width pattern**: `max-w-172` (custom Tailwind width)

### API Routes

- `/api/og` - Dynamic Open Graph image generation with Vercel's ImageResponse
  - Query params: title, description, pubDate, imageUrl, locale
- `/api/chat` - AI chat integration (using @ai-sdk/xai or @ai-sdk/google)
- `/rss.xml` - RSS feed generation for blog posts

### Static Generation

The application is fully statically generated:

- `generateStaticParams()` generates all locale/slug combinations at build time
- `dynamicParams = false` ensures no dynamic routes at runtime
- Post filtering: only includes posts with `state: 'published'`

### Component Patterns

- **Server components by default** (Next.js 16 App Router)
- **Client components**: Use `'use client'` directive for interactivity (e.g., `motion`, `canvas-confetti`)
- **Async metadata**: `generateMetadata()` is always async and receives `Promise<{ params }>`
- **i18n hooks**: `setRequestLocale(locale)` must be called at the top of every page component
- **Icon components**: Auto-generated from SVG files in `assets/` using `@svgr/cli`

### React 19 / Next.js 16 Patterns

- Use async versions of runtime APIs: `await cookies()`, `await headers()`, `await draftMode()`
- Handle async params: `const { slug, locale } = await params`
- Use `useActionState` instead of deprecated `useFormState`
- Favor React Server Components (RSC) where possible

## Docker Support

Application supports containerized deployment:

- Output mode: `standalone` (Next.js builds a self-contained server)
- Custom port: 11300
- Image optimization: `unoptimized: true` (no sharp processing in container)
