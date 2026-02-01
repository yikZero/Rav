export const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const fadeUpVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const fadeUpSmallVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
