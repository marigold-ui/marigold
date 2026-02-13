'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

type MarginType = string;

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number; opacity?: number; filter?: string };
    visible: { y: number; opacity?: number; filter?: string };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 14,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) => {
  const defaultVariants = {
    hidden: { y: -yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: inViewMargin }}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
