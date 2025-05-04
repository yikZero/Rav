import Nav from '@/components/nav';

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-4 z-50 transition-transform duration-800 sm:top-8">
      <header className="mx-auto flex w-fit flex-row rounded-xl border border-strong/4 bg-gradient-to-b from-brand-950/30 to-brand-950/30 p-1 backdrop-blur-md transition duration-500 hover:border-strong/6">
        <Nav />
      </header>
    </div>
  );
}
