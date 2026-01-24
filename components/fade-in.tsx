import * as motion from 'motion/react-client';

import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({
  children,
  className,
}: FadeInProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}
