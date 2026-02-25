import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import LifeSection from '@/components/life-section';
import PhotoCard from '@/components/photo-card';

const ConfettiButton = dynamic(() => import('@/components/confetti-button'));

export default function HomeAbout() {
  const t = useTranslations('About');
  const locale = useLocale();

  return (
    <section className="mt-32 flex flex-col items-center gap-28 sm:mt-40">
      <h2 className="sr-only">{t('title')}</h2>
      <div className="mx-auto grid max-w-240 grid-cols-1 gap-16 overflow-hidden sm:grid-cols-4">
        <div className="-ml-4 flex flex-row sm:col-span-2 sm:-ml-0">
          <PhotoCard
            title="Hello,World!"
            url="https://cdn.yikzero.com/roominess5/about/aboutme-6.jpg"
            className="translate-y-2 scale-85 -rotate-6 hover:scale-86 hover:-rotate-[5deg]"
          />
          <PhotoCard
            title="Hello,World!"
            url="https://cdn.yikzero.com/roominess5/about/aboutme-5.jpg"
            className="-ml-16 translate-y-4 rotate-[5deg] hover:scale-101 hover:rotate-3 sm:-ml-12"
          />
        </div>
        <div className="mt-6 flex flex-col gap-20 px-4 sm:col-span-2 sm:px-6">
          <div
            className={cn(
              'flex flex-col gap-2.5 text-base leading-6 text-soft sm:leading-6.5',
              {
                'leading-5.5 sm:leading-6': locale === 'en',
              },
            )}
          >
            <p>
              {t.rich('introduction', {
                highlight: (chunks) => (
                  <span className="font-medium text-strong">{chunks}</span>
                ),
              })}
            </p>
            <p>{t('hobby')}</p>
          </div>
          <div className="relative flex flex-col gap-8 sm:gap-6">
            <LifeSection
              time={t('experience.onekey.time')}
              image="https://cdn.yikzero.com/roominess5/onekey.png"
              title={t('experience.onekey.title')}
              url="https://onekey.so/"
              description={t('experience.onekey.description')}
            />
            <LifeSection
              time={t('experience.asiainfo.time')}
              image="https://cdn.yikzero.com/roominess5/asiainfo.png"
              title={t('experience.asiainfo.title')}
              url="https://asiainfo.com/"
              description={t('experience.asiainfo.description')}
            />
            <LifeSection
              time={t('experience.zjut.time')}
              image="https://cdn.yikzero.com/roominess5/zjut.png"
              title={t('experience.zjut.title')}
              url="https://www.zjut.edu.cn/"
              description={t('experience.zjut.description')}
            />
            <div className="absolute inset-y-0 -z-10 mt-1.5 flex w-2 items-stretch justify-center sm:left-1">
              <div className="w-0.5 bg-linear-to-b from-strong/4 via-strong/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      <ConfettiButton />
    </section>
  );
}
