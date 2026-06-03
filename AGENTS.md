# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-22
**Commit:** 11d4cea
**Branch:** main

## OVERVIEW

Next.js 16 personal blog. MDX content, i18n (zh-CN/en), AI translation pipeline. Fully static SSG. Tailwind CSS 4 + CSS-only animations. React Compiler enabled.

## STRUCTURE

```
.
├── app/[locale]/            # App Router pages (blog, stack)
│   ├── blog/[slug]/         # MDX blog post detail (dynamicParams=false)
│   ├── stack/               # Tools & software page
│   ├── [...rest]/           # Catch-all → 404
│   ├── error.tsx            # Error boundary (client component)
│   └── loading.tsx          # Progress bar skeleton
├── app/api/og/              # OG image generation (satori + MiSans fonts)
├── app/rss.xml/             # RSS feed (zh-CN only, 1h cache)
├── app/robots.ts            # Dynamic robots.txt generation
├── app/sitemap.ts           # Dynamic sitemap with i18n alternates
├── components/              # Flat dir (25 files, no nesting except icons/)
│   └── icons/               # Auto-generated from assets/ via `bun run svg`
├── content/posts/           # MDX: zh-CN/ (source), en/ (auto-translated)
├── lib/                     # Utilities (5 files)
├── i18n/                    # next-intl routing + request config
├── messages/                # UI strings (zh-CN.json, en.json)
├── scripts/                 # AI translation pipeline (Google Generative AI)
├── fonts/                   # MiSans (OG only, 6MB each) + Instrument Serif subset (5.9KB)
├── mdx-components.tsx       # MDX component registry (a, img, pre, table, Video)
├── rav.config.ts            # Site config (title, author, siteUrl, email, twitter)
└── proxy.ts                 # next-intl middleware (matcher excludes static assets)
```

## WHERE TO LOOK

| Task                  | Location                                                                                                         | Notes                                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Add new page          | `app/[locale]/`                                                                                                  | Must call `setRequestLocale(locale)` at top                                                                           |
| Add nav link          | `lib/navigation.ts` + `messages/*.json` (Navigation key)                                                         | `nav.tsx` reads `AllLinks`                                                                                            |
| Blog post metadata    | `lib/post.utils.ts`                                                                                              | Filesystem parsing, `cache()` wrapped                                                                                 |
| MDX rendering         | `lib/mdx.utils.ts`                                                                                               | Dynamic import `@/content/{dir}/{locale}/{slug}.mdx`                                                                  |
| MDX custom components | `mdx-components.tsx`                                                                                             | Maps: `a`→CustomLink, `img`→Image, `pre`→CodeBlock, `table`→TableWrapper, `Video`                                     |
| Syntax highlighting   | `components/code-block.tsx`                                                                                      | Client-side `prism-react-renderer`, custom brand theme                                                                |
| Image zoom            | `components/custom-image.tsx`                                                                                    | Client-side `medium-zoom`, `memo`-wrapped                                                                             |
| Site config           | `rav.config.ts`                                                                                                  | Title, author, siteUrl, email, twitter                                                                                |
| i18n routing          | `i18n/routing.ts`                                                                                                | `locales`, `defaultLocale`, `localePrefix: 'as-needed'`                                                               |
| i18n navigation       | `i18n/navigation.ts`                                                                                             | `Link`, `redirect`, `usePathname`, `useRouter`                                                                        |
| OG images             | `app/api/og/route.tsx`                                                                                           | Satori + MiSans fonts, module-scope asset cache                                                                       |
| Structured data       | `app/[locale]/page.tsx` (WebSite), `blog/page.tsx` (Blog), `blog/[slug]/page.tsx` (BlogPosting + BreadcrumbList) | JSON-LD `<script>` tags                                                                                               |
| Design tokens         | `app/globals.css`                                                                                                | `@theme` directive: `--color-strong`, `--color-sub`, `--color-soft`, `--color-weak`                                   |
| Animations            | `app/globals.css`                                                                                                | CSS keyframes: `hero-blur-fade`, `stagger-fade-up`, `header-fade-in`                                                  |
| Stack data            | `lib/stack.ts`                                                                                                   | Hardcoded items with i18n descriptions                                                                                |
| MDX plugins           | `next.config.ts`                                                                                                 | remark-frontmatter, remark-gfm, rehype-slug, rehype-autolink-headings, rehype-unwrap-images, rehype-accessible-emojis |
| Deployment            | `Dockerfile`                                                                                                     | Multi-stage, standalone output, port 11300                                                                            |
| CI/CD                 | `.github/workflows/deploy.yml`                                                                                   | Push to main → Docker build → SSH deploy                                                                              |

## CONVENTIONS

- **Static generation everywhere**: `generateStaticParams()` + `dynamicParams = false`
- **Two-tier content loading**: Metadata via filesystem (`post.utils.ts`), rendering via dynamic import (`mdx.utils.ts`) — separate systems, separate cache contexts
- **Default locale has no URL prefix**: zh-CN → `/blog`, en → `/en/blog`
- **Server components by default**: `'use client'` only for: nav (usePathname), footer (locale switch), code-block (prism), custom-image (medium-zoom), background-video (requestIdleCallback), confetti-button (canvas-confetti), error boundary
- **React Compiler enabled**: `reactCompiler: true` — avoid manual `useMemo`/`useCallback`
- **Tailwind CSS 4**: CSS-first config (`@theme` directive in globals.css), NOT tailwind.config.js
- **Design tokens**: `text-strong`, `text-sub`, `text-soft`, `text-weak`, `border-strong` — use these, not raw colors
- **Animation pattern**: CSS-only via class + inline `animationDelay`. No framer-motion. Stagger: `.stagger-animate` + `style={{ animationDelay: '0.1s' }}`
- **Import sorting** (enforced): `@/lib/*` → `@/components/*` → relative. Plugin: `@trivago/prettier-plugin-sort-imports`
- **cn() helper**: `lib/utils.ts` — `clsx` + `tailwind-merge`, use for conditional classes. `tailwindFunctions: ["cn"]` in prettier
- **Inline CSS**: `experimental.inlineCss: true` — no separate stylesheet requests
- **View Transitions**: `experimental.viewTransition: true` — nav uses `ViewTransition` API for indicator slide
- **Background video**: Lazy-loaded via `requestIdleCallback`, `preload="none"`, dynamic import wrapper
- **Image hosting**: Cloudflare R2 (`r2:yikzero-cdn`) via rclone, served at `cdn.yikzero.com`. No runtime image processing — images are pre-resized and compressed (TinyPNG) before upload

## ANTI-PATTERNS

- **Never suppress types**: No `as any`, `@ts-ignore`, `@ts-expect-error`
- **Never use tailwind.config.js**: Project uses Tailwind CSS 4 CSS-first approach
- **Never use `next/link` directly**: Use `Link` from `@/i18n/navigation`
- **Never add dependencies for existing functionality**: `cn()` exists, CSS animations exist, etc.
- **Never create MDX content in `en/` manually**: English posts are auto-translated from zh-CN
- **Never edit icon components in `components/icons/`**: Edit SVGs in `assets/`, run `bun run svg`
- **Never use raw color classes**: Use design tokens (`text-strong`, not `text-gray-200`)
- **Never use manual `useMemo`/`useCallback`**: React Compiler handles this
- **Never use Upyun image processing params**: No `!/fw/`, `!/fh/`, `!/format/` suffixes — R2 doesn't support them

## CONTENT WORKFLOW

1. Create MDX in `content/posts/zh-CN/` with frontmatter (`state: 'published'`)
2. Run `bun run translate` → generates `content/posts/en/` via Google AI
3. Translation state tracked in `scripts/translate-state.json` (MD5 file hashes)
4. Draft posts (`state: 'draft'`) visible in dev, hidden in production
5. Frontmatter fields: `title`, `publishedAt`, `updatedAt`, `description`, `image`, `category`, `state`

## COMMANDS

```bash
bun dev                  # Dev server on :11300 (webpack)
bun run build            # Production build (standalone output)
bun run start            # Production server on :11300
bun run lint             # ESLint (core-web-vitals + typescript)
bun run svg              # Regenerate icon components from assets/
bun run translate        # Incremental zh-CN → en translation
bun run translate:force  # Re-translate all posts
```

## GOTCHAS

- `getBlogPosts()` is `cache()` wrapped but cache doesn't persist across `generateMetadata` and page render (separate React request contexts)
- `output: 'standalone'` — deployment uses `.next/standalone` + `node server.js`, not `next start`
- Background video in `components/background.tsx` dynamically imports `background-video.tsx` — the video component is client, the wrapper is server
- Icon components in `components/icons/` are auto-generated — edit SVGs in `assets/`, not the components
- `inlineCss: true` (experimental) — CSS is inlined, no separate stylesheet requests
- MiSans font files (6.2MB each OTF) exist only for OG image generation server-side — NOT loaded in browser
- Instrument Serif loaded via `next/font/local` in `hero-content.tsx` only (5.9KB woff2 subset)
- Body uses system font stack (Inter, PingFang SC, etc.) — no custom web font for body text
- `proxy.ts` is the next-intl middleware — matcher excludes static assets from i18n processing
- OG images are `.webp` format: `opengraph-image.webp` (zh-CN), `opengraph-image-en.webp` (en)
- Redirects: `/posts` → `/blog`, `/drafts` → `/works` (permanent 301 in next.config.ts)
- Environment variable `GOOGLE_GENERATIVE_AI_API_KEY` required for translation script only
