import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';
import type { Locale } from 'next-intl';

import { routing } from '@/i18n/routing';
import { getBlogPosts } from '@/lib/post.utils';
import { formatDate } from '@/lib/utils';
import ravConfig from '@/rav.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Blog post cover';

const OG_CONFIG = {
  maxTitleLength: 100,
  maxDescLength: 200,
  defaultImage: 'https://cdn.yikzero.com/markdown/images/post-background.jpg',
};

let cachedAssets: {
  regularFont: Buffer;
  semiboldFont: Buffer;
  logoBase64: string;
} | null = null;

async function loadAssets() {
  if (cachedAssets) return cachedAssets;

  const [regularFont, semiboldFont, logo] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'fonts', 'MiSans-Regular.otf')),
    fs.readFile(path.join(process.cwd(), 'fonts', 'MiSans-Semibold.otf')),
    fs.readFile(path.join(process.cwd(), 'public', 'logo.svg')),
  ]);

  cachedAssets = {
    regularFont,
    semiboldFont,
    logoBase64: `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`,
  };

  return cachedAssets;
}

function removeProtocol(url: string) {
  return url.replace(/^https?:\/\//, '');
}

function OGImage({
  title,
  description,
  formattedDate,
  imageUrl,
  logoBase64,
}: {
  title: string;
  description: string;
  formattedDate: string;
  imageUrl: string;
  logoBase64: string;
}) {
  return (
    <div tw="flex flex-col w-full h-full relative">
      <div
        tw="absolute inset-0"
        style={{
          filter: 'blur(4px)',
          backgroundImage: `url(${imageUrl}!/fw/1200)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.05)',
        }}
      />
      <div
        tw="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, #000 100%)',
        }}
      />
      <div
        tw="absolute inset-0 opacity-60"
        style={{
          backgroundRepeat: 'repeat',
          backgroundImage:
            'url(https://cdn.yikzero.com/roominess5/hero/noise-background.png)',
          maskImage: 'linear-gradient(to top,transparent,black)',
        }}
      />
      <div tw="flex flex-col w-full h-4/5 py-10 px-16 justify-center">
        <div
          tw="text-white/65 text-2xl leading-[35px] pb-5"
          style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        >
          {formattedDate}
        </div>
        <div
          tw="flex text-6xl w-full font-bold tracking-tight text-white pb-4"
          style={{
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            lineHeight: '78px',
          }}
        >
          {title}
        </div>
        <div
          tw="flex text-2xl w-full font-normal tracking-tight text-white/65 max-w-[800px]"
          style={{
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            lineHeight: '36px',
          }}
        >
          {description}
        </div>
      </div>
      <div tw="w-full h-1/5 border-t border-white/15 bg-white/5 flex py-10 px-16 items-center justify-between text-2xl">
        <div tw="flex items-center">
          <img alt="logo" src={logoBase64} width={40} height={40} />
          <span tw="ml-3 text-white/85">
            {removeProtocol(ravConfig.siteUrl)}
          </span>
        </div>
        <div tw="flex items-center">
          <img
            alt="Avatar"
            src="https://cdn.yikzero.com/roominess5/designwork/avatar.jpg!/fw/96"
            width={60}
            height={60}
            tw="rounded-full"
          />
          <div tw="flex flex-col ml-4">
            <span tw="text-white text-2xl font-bold">{ravConfig.author}</span>
            <span tw="text-white/65 text-xl">Product Designer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPosts({ language: locale }).find((p) => p.slug === slug);

  const title =
    post?.metadata.title?.slice(0, OG_CONFIG.maxTitleLength) || ravConfig.title;
  const description =
    post?.metadata.description?.slice(0, OG_CONFIG.maxDescLength) ||
    ravConfig.description;
  const pubDate = post?.metadata.updatedAt || post?.metadata.publishedAt || '';
  const imageUrl = post?.metadata.image || OG_CONFIG.defaultImage;
  const formattedDate = pubDate ? formatDate(pubDate, locale) : '';

  const { regularFont, semiboldFont, logoBase64 } = await loadAssets();

  return new ImageResponse(
    <OGImage
      title={title}
      description={description}
      formattedDate={formattedDate}
      imageUrl={imageUrl}
      logoBase64={logoBase64}
    />,
    {
      ...size,
      fonts: [
        {
          name: 'Mi Sans',
          data: regularFont,
          weight: 400 as const,
          style: 'normal' as const,
        },
        {
          name: 'Mi Sans',
          data: semiboldFont,
          weight: 600 as const,
          style: 'normal' as const,
        },
      ],
    },
  );
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBlogPosts({ language: locale }).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}
