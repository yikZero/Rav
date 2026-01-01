export default function BlogTranslateNotice() {
  return (
    <div className="mt-8 rounded-lg border border-brand-950 bg-brand-600/9 px-4 py-2 font-medium text-brand-300">
      This article was translated from Chinese by
      <a
        href="https://gemini.google/about"
        className="inline-flex px-1"
        rel="noopener noreferrer"
        target="_blank"
      >
        Gemini 3 Pro
      </a>
      . If there are any discrepancies, please refer to the Chinese version.
    </div>
  );
}
