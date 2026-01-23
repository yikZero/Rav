import { Link } from '@/i18n/navigation';
import type { MDXComponents } from 'mdx/types';

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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
    img: Image,
    Video,
    ...components,
  };
}
