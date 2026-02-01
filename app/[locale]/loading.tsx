export default function Loading() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
        <div className="animate-progress h-full w-full bg-brand-500/80" />
      </div>
      <div className="min-h-[calc(100svh-172px)]" />
    </>
  );
}
