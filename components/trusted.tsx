import { Link } from '@/i18n/navigation';

import {
  Asiainfo,
  Chagee,
  ChinaMobile,
  IDigital,
  Migu,
  OneKey,
} from '@/components/icons';

interface Partner {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  height: string;
}

const partners: Partner[] = [
  {
    name: 'Asiainfo',
    url: 'https://www.asiainfo.com/zh_cn/index.html',
    icon: Asiainfo,
    height: 'h-7',
  },
  {
    name: 'ChinaMobile',
    url: 'https://www.10086.cn',
    icon: ChinaMobile,
    height: 'h-7',
  },
  {
    name: 'OneKey',
    url: 'http://onekey.so',
    icon: OneKey,
    height: 'h-7.5',
  },
  {
    name: 'Chagee',
    url: 'https://bwcj.com',
    icon: Chagee,
    height: 'h-7',
  },
  {
    name: 'IDigital',
    url: 'https://www.idigital.com.cn',
    icon: IDigital,
    height: 'h-8',
  },
  {
    name: 'Migu',
    url: 'https://www.miguvideo.com',
    icon: Migu,
    height: 'h-6.5',
  },
];

export default function Trusted() {
  return (
    <section className="mx-auto mt-32 flex max-w-192 flex-col gap-6">
      <h2 className="text-center text-xs leading-4 font-medium text-soft select-none">
        TRUSTED BY GLOBAL ENTERPRISES
      </h2>
      <div
        className="flex flex-row gap-12 text-strong"
        style={{
          maskImage:
            'linear-gradient(90deg, rgba(0, 0, 0, 0.20) 0%, #000 40%, #000 60%, rgba(0, 0, 0, 0.20) 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, rgba(0, 0, 0, 0.20) 0%, #000 40%, #000 60%, rgba(0, 0, 0, 0.20) 100%)',
        }}
      >
        {partners.map((partner) => {
          const Icon = partner.icon;
          return (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-45 transition duration-500 hover:opacity-100"
            >
              <Icon className={partner.height} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
