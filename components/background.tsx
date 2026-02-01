import BackgroundVideo from '@/components/background-video';

export default function Background(): React.ReactElement {
  return (
    <div className="bg-overlay absolute top-0 right-0 left-0 -z-1 h-200 w-full overflow-hidden mask-b-from-0 opacity-15 transition-opacity duration-500">
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full bg-linear-to-b from-[#01040E] to-[#0A122B]"
      />
      <BackgroundVideo />
      <div className="absolute inset-0 z-3 bg-[url(https://cdn.yikzero.com/rav/noise.png)] bg-center bg-repeat opacity-10" />
    </div>
  );
}
