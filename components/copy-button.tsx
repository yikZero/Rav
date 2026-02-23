'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute right-2 top-2 rounded-md bg-white/10 p-1.5 opacity-100 backdrop-blur-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
    >
      {copied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className="size-4 text-white/70" />
      )}
    </button>
  );
}
