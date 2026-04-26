import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.yikzero.com',
      },
    ],
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    qualities: [75, 85],
  },
  reactCompiler: true,
  experimental: {
    inlineCss: true,
    viewTransition: true,
    appNewScrollHandler: true,
  },
  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/posts/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/:locale/posts',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/:locale/posts/:path*',
        destination: '/:locale/blog/:path*',
        permanent: true,
      },
      {
        source: '/drafts',
        destination: '/works',
        permanent: true,
      },
      {
        source: '/:locale/drafts',
        destination: '/:locale/works',
        permanent: true,
      },
      {
        source: '/llm.txt',
        destination: '/llms.txt',
        permanent: true,
      },
      {
        source: '/:locale/llms.txt',
        destination: '/llms.txt',
        permanent: true,
      },
      {
        source: '/:locale/llm.txt',
        destination: '/llms.txt',
        permanent: true,
      },
    ];
  },
  output: 'standalone',
  pageExtensions: ['mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
    rehypePlugins: [
      'rehype-unwrap-images',
      'rehype-slug',
      'rehype-autolink-headings',
    ],
  },
});

const withNextIntl = createNextIntlPlugin({
  experimental: {
    messages: {
      path: './messages',
      locales: 'infer',
      format: 'json',
      precompile: true,
    },
  },
});
export default withNextIntl(withMDX(nextConfig));
