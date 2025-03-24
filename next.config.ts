import createMDX from '@next/mdx';
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [rehypeUnwrapImages, rehypeSlug, rehypeAutolinkHeadings],
  },
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
