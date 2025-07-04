# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` (runs on port 11300)
- **Build**: `pnpm build`
- **Production server**: `pnpm start` (port 11300)
- **Linting**: `pnpm lint`
- **SVG optimization**: `pnpm svg` (generates React components from assets/)

## Architecture Overview

This is a Next.js 15 blog application with MDX content, internationalization, and AI integration.

### Key Architecture Patterns

- **App Router**: Uses Next.js 15 app directory structure with nested routing
- **Internationalization**: Built with `next-intl`, supports fallback to default locale (English)
- **Content Management**: MDX files in `content/` with localized versions (en, zh-CN)
- **Dynamic MDX Loading**: `lib/mdx.utils.ts` provides `loadLocalizedMDX()` for runtime content loading with fallback logic
- **Component Structure**: Organized by function in `components/` with icon components in `components/icons/`

### Content Structure

- `content/posts/[locale]/` - Blog posts
- `content/changelogs/[locale]/` - Changelog entries  
- `content/projects/[locale]/` - Project showcases
- MDX files use frontmatter and are processed with remark/rehype plugins

### Configuration Files

- `rav.config.ts` - Site configuration (title, author, URLs, description)
- `next.config.ts` - Next.js config with MDX processing, redirects, and i18n setup
- Custom port 11300 is used consistently across dev/prod

### MDX Processing

Enhanced with plugins:
- Syntax highlighting (Shiki with 'houston' theme)
- Auto-generated heading links
- Image optimization
- Accessible emojis
- GitHub Flavored Markdown

### Styling

- Tailwind CSS 4 with custom configuration
- Motion library for animations
- Custom fonts in `fonts/` directory
- Component-based styling patterns

### API Routes

- `/api/chat` - AI integration endpoint
- `/api/og` - Open Graph image generation
- `/rss.xml` - RSS feed generation

## Docker Support

Application supports containerized deployment with standalone output mode enabled in Next.js config.