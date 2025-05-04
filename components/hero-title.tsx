import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function HeroTitle() {
  return (
    <h1
      className={`${instrumentSerif.className} max-w-140 text-center text-4xl tracking-[0.01em] text-strong text-shadow-md sm:text-5xl sm:leading-[3.875rem]`}
    >
      <span className="inline-block">yikZero,</span>{' '}
      <span className="inline-block">Web3</span>{' '}
      <span className="inline-block">Product Designer</span>{' '}
      <span className="inline-block">based in</span>{' '}
      <span className="inline-block">Hangzhou</span>{' '}
      <span className="inline-block">China</span>
    </h1>
  );
}
