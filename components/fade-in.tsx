import * as motion from 'motion/react-client';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({ children, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
