import Noise from '@/public/noise.png';
import Image from 'next/image';

export default function Background() {
  return (
    <div className="absolute top-0 right-0 left-0 -z-1 h-200 w-full mask-b-from-0">
      <Image
        aria-hidden
        className="inset-0h-full absolute -z-1 w-full"
        src={Noise}
        alt="Noise Background"
      />
      <video
        className="-z-2 mx-auto h-full w-full scale-150 opacity-80 blur-[48px]"
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
      <div
        aria-hidden
        className="absolute inset-0 -z-3 h-full w-full bg-gradient-to-b from-[#01040E] to-[#0A122B]"
      />
    </div>
  );
}
