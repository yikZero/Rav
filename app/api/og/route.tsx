import { defaultLocale } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import fs from 'fs/promises';
import { ImageResponse } from 'next/og';
import path from 'path';

import { formatDate } from '@/lib/utils';

const OG_CONFIG = {
  width: 1200,
  height: 630,
  maxTitleLength: 100,
  maxDescLength: 200,
  defaultLocale: defaultLocale,
  defaultTitle: ravConfig.title,
  defaultDescription: ravConfig.description,
};

async function loadAssets() {
  const [regularFont, semiboldFont, logo] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'fonts', 'MiSans-Regular.otf')),
    fs.readFile(path.join(process.cwd(), 'fonts', 'MiSans-Semibold.otf')),
    fs.readFile(path.join(process.cwd(), 'public', 'logo.svg')),
  ]);

  return {
    regularFont,
    semiboldFont,
    logoBase64: `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`,
  };
}

function parseParams(url: string) {
  const { searchParams } = new URL(url);

  return {
    title:
      searchParams.get('title')?.slice(0, OG_CONFIG.maxTitleLength) ||
      OG_CONFIG.defaultTitle,
    description:
      searchParams.get('description')?.slice(0, OG_CONFIG.maxDescLength) ||
      OG_CONFIG.defaultDescription,
    pubDate: searchParams.get('pubDate'),
    locale: searchParams.get('locale') || OG_CONFIG.defaultLocale,
    imageUrl: searchParams.get('imageUrl'),
  };
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
  imageUrl: string | null;
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
          <img alt="logo" src={logoBase64} tw="w-10 h-10" />
          <span tw="ml-3 text-white/85">
            {removeProtocol(ravConfig.siteUrl)}
          </span>
        </div>
        <div tw="flex items-center">
          <img
            alt="Avatar"
            src="https://cdn.yikzero.com/roominess5/designwork/avatar.jpg!/fw/96"
            tw="w-15 h-15 rounded-full"
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

export async function GET(request: Request) {
  try {
    const params = parseParams(request.url);
    const formattedDate = params.pubDate
      ? formatDate(params.pubDate, params.locale)
      : '';

    const { regularFont, semiboldFont, logoBase64 } = await loadAssets();

    return new ImageResponse(
      (
        <OGImage
          title={params.title}
          description={params.description}
          formattedDate={formattedDate}
          imageUrl={params.imageUrl}
          logoBase64={logoBase64}
        />
      ),
      {
        width: OG_CONFIG.width,
        height: OG_CONFIG.height,
        fonts: [
          {
            name: 'Mi Sans',
            data: regularFont,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Mi Sans',
            data: semiboldFont,
            weight: 600,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.error('Failed to generate OG image:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
