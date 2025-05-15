'use client';

import { Link } from '@/i18n/navigation';
import GithubSlugger from 'github-slugger';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { type PostMetadata } from '@/lib/post.utils';
import { cn } from '@/lib/utils';

import { ListBullet } from '@/components/icons';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  post: {
    slug: string;
    metadata: PostMetadata;
    content: string;
  };
}

export default function TableOfContents({ post }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const HEADER_OFFSET = 56;
  const slugger = new GithubSlugger();
  const t = useTranslations('TableOfContents');

  const extractHeadings = (content: string): TOCItem[] => {
    const headings: TOCItem[] = [];
    const lines = content.split('\n');
    slugger.reset();

    let insideDetails = false;

    for (const line of lines) {
      if (line.includes('<details>')) {
        insideDetails = true;
      } else if (line.includes('</details>')) {
        insideDetails = false;
      }

      if (!insideDetails) {
        const h2Match = line.match(/^##\s+(.+)$/);

        if (h2Match) {
          const text = h2Match[1].trim();
          const id = slugger.slug(text);

          headings.push({ id, text, level: 2 });
        }
      }
    }

    return headings;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top =
        element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  // 保持滚动监听功能
  const getTopHeader = useCallback(
    (headingElements: HTMLElement[]): string | undefined => {
      const scrollY = window.scrollY;
      const threshold = scrollY + HEADER_OFFSET + 10;

      for (let i = 0; i < headingElements.length; i++) {
        if (headingElements[i].offsetTop > threshold) {
          return i === 0 ? headingElements[0].id : headingElements[i - 1].id;
        }
      }
      return headingElements[headingElements.length - 1]?.id;
    },
    [],
  );

  const updateToc = useCallback(() => {
    requestAnimationFrame(() => {
      const headingElements = Array.from(
        document.querySelectorAll('.rypo h2'),
      ) as HTMLElement[];

      const topHeaderId = getTopHeader(headingElements);
      if (topHeaderId) {
        setActiveId(topHeaderId);
      }
    });
  }, [getTopHeader]);

  const debouncedUpdateToc = useMemo(() => {
    let rafId: number;
    return () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateToc();
      });
    };
  }, [updateToc]);

  useEffect(() => {
    updateToc();
    document.addEventListener('scroll', debouncedUpdateToc);

    return () => {
      document.removeEventListener('scroll', debouncedUpdateToc);
    };
  }, [debouncedUpdateToc, updateToc]);

  return (
    <nav className="sticky top-20 mt-12 pl-6">
      <div className="flex flex-row items-center gap-2 text-sm text-strong">
        <ListBullet className="size-4 text-soft" />
        {t('onThisPage')}
      </div>
      <div className="ro-toc relative mt-4">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className="group relative my-3 block"
            style={{ paddingLeft: `${(heading.level - 2) * 20 + 20}px` }}
            onClick={(e) => handleClick(e, heading.id)}
          >
            {activeId === heading.id && (
              <motion.div
                layoutId="toc-indicator"
                className="absolute inset-y-0 -left-[0.05rem] w-0.75 rounded-full bg-strong"
                aria-hidden
              />
            )}
            <span
              className={cn(
                'line-clamp-1 text-sm text-sub delay-100 hover:line-clamp-none hover:text-nowrap hover:text-strong',
                { 'text-strong': activeId === heading.id },
              )}
            >
              {heading.text}
            </span>
          </Link>
        ))}
        <div className="absolute inset-y-0 left-0 -z-10 h-full w-px bg-strong/10" />
      </div>
    </nav>
  );
}
