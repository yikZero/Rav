import { useLocale, useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import ConfettiButton from '@/components/confetti-button';
import LifeSection from '@/components/life-section';
import PhotoCard from '@/components/photo-card';

export default function HomeAbout() {
  const t = useTranslations('About');
  const locale = useLocale();

  return (
    <section className="flex flex-col items-center gap-48">
      <div className="mx-auto mt-32 grid max-w-240 grid-cols-1 gap-16 sm:mt-48 sm:grid-cols-4">
        <div className="flex flex-row sm:col-span-2">
          <PhotoCard
            title="Hello,World!"
            url="https://cdn.yikzero.com/roominess5/about/aboutme-6.jpg"
            className="translate-y-2 scale-85 -rotate-[10deg]"
          />
          <PhotoCard
            title="Hello,World!"
            url="https://cdn.yikzero.com/roominess5/about/aboutme-5.jpg"
            className="-ml-12 translate-y-4 rotate-[6deg]"
          />
        </div>
        <div className="mt-8 flex flex-col gap-16 sm:col-span-2">
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
            <div className="absolute inset-y-0 -z-10 flex w-1.5 items-start justify-center sm:left-1">
              <div className="mt-3.5 h-36 w-[1px] bg-linear-to-b from-strong/10 via-strong/15 to-strong/10" />
            </div>
          </div>
        </div>
      </div>
      <ConfettiButton />
    </section>
  );
}
