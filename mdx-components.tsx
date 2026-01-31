import { Link } from '@/i18n/navigation';
import type { MDXComponents } from 'mdx/types';

import Pre from '@/components/code-block';
import Image from '@/components/custom-image';
import Video from '@/components/custom-video';

function CustomLink({
  href,
  children,
  ...props
}: React.LinkHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function TableWrapper(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
    img: Image,
    pre: Pre,
    table: TableWrapper,
    Video,
    ...components,
  };
}
