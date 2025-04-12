import {
  Asiainfo,
  Chagee,
  ChinaMobile,
  IDigital,
  Migu,
  OneKey,
} from '@/components/icons';

export default function Trusted() {
  return (
    <section
      title="trust"
      className="mx-auto mt-32 flex max-w-192 flex-col gap-6"
    >
      <h2 className="text-center text-xs leading-4 font-normal text-soft">
        TRUSTED BY GLOBAL ENTERPRISES
      </h2>
      <div
        className="flex flex-row gap-12 text-strong opacity-45"
        style={{
          maskImage:
            'linear-gradient(90deg, rgba(0, 0, 0, 0.20) 0%, #000 40%, #000 60%, rgba(0, 0, 0, 0.20) 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, rgba(0, 0, 0, 0.20) 0%, #000 40%, #000 60%, rgba(0, 0, 0, 0.20) 100%)',
        }}
      >
        <Asiainfo className="h-7" />
        <ChinaMobile className="h-7" />
        <OneKey className="h-7.5" />
        <Chagee className="h-7" />
        <IDigital className="h-8" />
        <Migu className="h-6.5" />
      </div>
    </section>
  );
}
