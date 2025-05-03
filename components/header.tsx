import Nav from '@/components/nav';

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-4 z-50 transition-transform duration-800 sm:top-8">
      <header className="mx-auto flex w-fit flex-row rounded-xl bg-linear-to-b from-strong/3 to-strong/1 p-1 shadow-2xl shadow-[#01040E]/15 outline outline-white/7 backdrop-blur-md transition duration-300 hover:outline-white/9">
        <Nav />
      </header>
    </div>
  );
}
