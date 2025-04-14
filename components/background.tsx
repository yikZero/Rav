'use client';

import { usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import Noise from '@/public/noise.png';
import Image from 'next/image';

import { cn } from '@/lib/utils';

export default function Background() {
  const pathname = usePathname();
  const isHomePage =
    pathname === '/' || locales.some((locale) => pathname === `/${locale}`);

  return (
    <div
      className={cn(
        'absolute top-0 right-0 left-0 -z-1 h-200 w-full overflow-hidden mask-b-from-0 transition duration-1000',
        !isHomePage && 'opacity-40',
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#01040E] to-[#0A122B]"
      />
      <video
        className="z-2 mx-auto h-full w-full scale-150 opacity-80 blur-[48px]"
        muted
        autoPlay
        loop
        playsInline
      >
        <source
          src="https://cdn.yikzero.com/rav/background.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Image
        aria-hidden
        className="absolute inset-0 z-3 h-full w-full opacity-20"
        src={Noise}
        alt="Noise Background"
      />
    </div>
  );
}
