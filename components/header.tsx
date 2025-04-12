import Nav from '@/components/nav';

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-10 z-50">
      <header className="mx-auto flex w-fit flex-row rounded-xl bg-linear-to-b from-[#172554]/20 to-[#172554]/9 p-1 shadow-2xl shadow-[#01040E]/15 outline outline-white/6 backdrop-blur-md transition duration-300 hover:outline-white/7">
        <Nav />
      </header>
    </div>
  );
}
