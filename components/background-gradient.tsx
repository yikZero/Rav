export default function BackgroundGradient() {
  return (
    <div
      style={{ maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, black 100%)' }}
      className="pointer-events-none fixed inset-x-0 bottom-0 isolate z-1 h-24 w-full translate-z-0 transform bg-background-gradient blur-xs transition duration-300 ease-in-out select-none"
    ></div>
  );
}
