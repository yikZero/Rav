'use client';

import { motion } from 'motion/react';
import { Instrument_Serif } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function HeroTitle() {
  return (
    <h1
      className={`${instrumentSerif.className} max-w-140 text-center text-4xl tracking-[0.01em] text-strong text-shadow-md sm:text-5xl sm:leading-[3.875rem]`}
    >
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6 }}
      >
        yikZero,
      </motion.span>{' '}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Web3
      </motion.span>{' '}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Product Designer
      </motion.span>{' '}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        based in
      </motion.span>{' '}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Hangzhou,
      </motion.span>{' '}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        China.
      </motion.span>
    </h1>
  );
}
