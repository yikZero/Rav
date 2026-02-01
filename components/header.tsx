import Nav from '@/components/nav';

export default function Header() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 sm:top-8">
      <header className="header-animate mx-auto flex w-fit flex-row rounded-xl border border-strong/4 bg-linear-to-b from-brand-950/20 to-brand-950/10 p-1 backdrop-blur-md transition duration-500 hover:border-strong/6">
        <Nav />
      </header>
    </div>
  );
}
