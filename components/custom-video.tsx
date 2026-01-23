interface VideoProps {
  src: string;
  poster?: string;
}

export default function Video({ src, poster }: VideoProps) {
  const type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';

  return (
    <video controls preload="metadata" poster={poster}>
      <source src={src} type={type} />
    </video>
  );
}
