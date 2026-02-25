# Blog Detail Page Readability Optimization

## Goal

Improve reading comfort on blog detail pages by adjusting font size, line height, paragraph spacing, content width, and heading proportions. Targeting an "Apple Newsroom / Vercel" style comfortable reading experience.

## Current vs Proposed

| Property | Current | Proposed | Reference |
|---|---|---|---|
| Content max-width | 688px (`max-w-172`) | **720px** (`max-w-180`) | Vercel: 720px |
| Body font-size | 15px (`0.9375rem`) | **17px** (`1.0625rem`) | Apple: 17-19px, Linear: 17px |
| Line-height | 26px (`leading-6.5`, ratio 1.73) | **28px** (`leading-7`, ratio 1.65) | Linear: 1.6, Apple: 1.47 |
| Paragraph spacing | 16px (`my-4`) | **20px** (`my-5`) | Linear: 20px |
| List spacing | 16px (`my-4`) | **20px** (`my-5`) | Match paragraph |
| h2 size | 24px (`text-2xl`) | **22px** (`text-[1.375rem]`) | 1.29x body ratio |
| h3 size | 20px (`text-xl`) | **18px** (`text-lg`) | 1.06x body ratio |
| h2 top margin | `mt-8` (32px) | **`mt-10`** (40px) | More breathing room |
| h2 bottom margin | `mb-2` (8px) | **`mb-3`** (12px) | Slightly more space |
| h3 bottom margin | `mb-2` (8px) | **`mb-3`** (12px) | Slightly more space |
| Footer max-width (blog) | `43rem` (688px) | **`45rem`** (720px) | Match content |

## Files to Modify

1. **`app/globals.css`** - `.rypo` class typography, footer width
2. **`app/[locale]/blog/[slug]/page.tsx`** - `max-w-172` to `max-w-180`

## Unchanged

- Font family (Inter + system fallback)
- Letter-spacing (Inter defaults work well at 17px)
- Blockquote, code block, inline code styling
- Image/video styling
- Color system
- h1 size (stays at 1.75rem / 2rem)
