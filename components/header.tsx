import { Link } from '@/i18n/navigation';

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-10 z-50">
      <header className="mx-auto flex w-fit flex-row gap-1 rounded-xl bg-linear-to-b from-[#172554]/15 to-[#172554]/9 p-1 text-sm font-normal shadow-[#01040E]/15 outline outline-white/6 backdrop-blur-[2px] transition duration-300 hover:outline-white/9">
        <Link
          href="/"
          className="cursor-pointer rounded-lg bg-linear-to-b from-white/6 to-white/9 px-3 py-1.5 font-medium text-strong transition duration-300 hover:from-white/9 hover:to-white/12"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="cursor-pointer rounded-lg px-3 py-1.5 text-sub transition duration-300 hover:text-strong"
        >
          Blog
        </Link>
        <button className="cursor-pointer rounded-lg px-3 py-1.5 text-sub transition duration-300 hover:text-strong">
          Ask
        </button>
      </header>
    </div>
  );
}
