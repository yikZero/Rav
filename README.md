# Rav

Rav is a modern personal blog built with Next.js 16, featuring MDX content management, internationalization support, AI-powered translation, and interactive features.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Motion (Framer Motion)
- **Content**: MDX with Prism React Renderer syntax highlighting
- **Internationalization**: next-intl v4 (zh-CN, en)
- **AI Integration**:
  - @ai-sdk/xai for chat
  - @ai-sdk/google for automated translation
- **Package Manager**: bun
- **Code Quality**: ESLint + Prettier
- **Deployment**: Docker support (standalone mode)

## Key Features

- **Next.js 16 App Router** - Fully static site generation with `generateStaticParams()`
- **React Compiler** - Automatic optimization with React Compiler enabled
- **Enhanced MDX** - Syntax highlighting (Prism), auto-linked headings, GFM support
- **Bilingual Support** - Chinese (default) and English with automatic translation
- **AI-Powered Translation** - Automated zh-CN to en translation using Google Generative AI
- **Modern Styling** - Tailwind CSS 4 with custom design tokens and inline CSS optimization
- **Smooth Animations** - Motion library with stagger effects
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Dynamic OG images, RSS feed, sitemap
- **Docker Ready** - Standalone output mode for easy deployment
- **SVG Optimization** - Auto-generated React components from SVG assets

## Getting Started

### Prerequisites

- Node.js 18+
- bun
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yikZero/Rav.git

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun dev
```

The development server will start at http://localhost:11300.

### Build and Production

```bash
# Build for production
bun run build

# Start production server
bun run start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t rav .

# Run Docker container
docker run -p 11300:11300 rav
```

## Project Structure

```
rav/
├── app/
│   ├── [locale]/          # Localized routes (zh-CN, en)
│   │   ├── blog/          # Blog listing and posts
│   │   │   └── [slug]/    # Individual blog post pages
│   │   ├── talk/          # AI chat page
│   │   └── page.tsx       # Homepage
│   ├── api/
│   │   └── og/            # Open Graph image generation
│   ├── rss.xml/           # RSS feed generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # React components
│   ├── icons/             # Auto-generated SVG components
│   └── ...                # UI components
├── content/               # MDX content
│   └── posts/
│       ├── zh-CN/         # Chinese posts (source)
│       └── en/            # English posts (auto-translated)
├── lib/                   # Core utilities
│   ├── animations.ts      # Animation variants
│   ├── image-loader.ts    # Custom image loader for CDN
│   ├── mdx.utils.ts       # MDX loading logic
│   ├── navigation.ts      # Navigation utilities
│   ├── post.utils.ts      # Post metadata parsing
│   └── utils.ts           # Helper functions
├── scripts/               # Build and translation scripts
│   ├── translate.ts       # AI translation automation
│   └── utils/             # Translation utilities
├── i18n/                  # i18n configuration
├── messages/              # Translation messages (UI)
│   ├── zh-CN.json
│   └── en.json
├── public/                # Static assets
├── fonts/                 # Custom fonts
├── rav.config.ts          # Site configuration
└── next.config.ts         # Next.js configuration
```

## Development Guide

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode
- Import sorting with @trivago/prettier-plugin-sort-imports

### Content Management

#### Creating a New Post

1. Create a new MDX file in `content/posts/zh-CN/` with frontmatter:

```yaml
---
title: 'Your Post Title'
publishedAt: '2024-01-01'
description: 'Post description'
image: 'https://cdn.yikzero.com/your-image.jpg'
category: 'Tech'
state: 'published'
---
```

2. Write your content in MDX format (supports GFM, code blocks, images, etc.)

#### Automated Translation

Translate Chinese posts to English automatically using AI:

```bash
# Translate only changed files
bun run translate

# Force translate all files (ignore cache)
bun run translate:force

# Translate a specific file
bun run translate your-post-name
```

**Requirements**: Set `GOOGLE_GENERATIVE_AI_API_KEY` in your `.env` file.

**How it works**:

- Reads posts from `content/posts/zh-CN/`
- Only processes posts with `state: published` (skips drafts)
- Uses file hash to detect changes (incremental translation)
- Generates English versions in `content/posts/en/`
- Tracks translation state in `scripts/translate-state.json`

### SVG Optimization

```bash
# Generate optimized React components from SVG files in assets/
bun run svg
```

Components will be created in `components/icons/`

## License

[MIT](https://github.com/yikZero/Rav/blob/main/LICENSE)


README edit test: updated by AI assistant.
