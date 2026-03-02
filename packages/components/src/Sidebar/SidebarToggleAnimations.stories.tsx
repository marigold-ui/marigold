import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';

// SVG building blocks from lucide PanelLeftClose (24×24)
const FRAME = <rect width="18" height="18" x="3" y="3" rx="2" />;
const CHEVRON_CLOSE = 'm16 15-3-3 3-3';

// Spring-like cubic-bezier (slight overshoot)
const SPRING_BEZIER = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

// ---------------------------------------------------------------------------
// Panel Slide (motion/react) — divider shifts + chevron rotates
// ---------------------------------------------------------------------------
const PanelSlide = ({ expanded }: { expanded: boolean }) => {
  const reduce = useReducedMotion();
  const spring = reduce
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 350, damping: 25 };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {FRAME}
      <motion.g animate={{ x: expanded ? 0 : -3 }} transition={spring}>
        <path d="M9 3v18" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: '15px 12px' }}
        animate={{ rotate: expanded ? 0 : 180 }}
        transition={spring}
      >
        <path d={CHEVRON_CLOSE} />
      </motion.g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Panel Slide (CSS-only) — same animation, no motion dependency
// ---------------------------------------------------------------------------
const PanelSlideCss = ({ expanded }: { expanded: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {FRAME}
    <g
      style={{
        transform: expanded ? 'translateX(0)' : 'translateX(-3px)',
        transition: `transform 200ms ${SPRING_BEZIER}`,
      }}
    >
      <path d="M9 3v18" />
    </g>
    <g
      style={{
        transformOrigin: '15px 12px',
        transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: `transform 200ms ${SPRING_BEZIER}`,
      }}
    >
      <path d={CHEVRON_CLOSE} />
    </g>
  </svg>
);

// ---------------------------------------------------------------------------
// Story
// ---------------------------------------------------------------------------
const meta = preview.meta({
  title: 'Icon/SidebarToggleAnimations',
});

export const Showcase = meta.story({
  render: () => {
    const [expanded, setExpanded] = useState(true);

    return (
      <div className="p-8">
        <Stack space="6">
          <Button onPress={() => setExpanded(prev => !prev)}>
            {expanded ? 'Collapse' : 'Expand'}
          </Button>

          <div className="flex items-center gap-8">
            <div>
              <p className="mb-2 text-sm">motion/react</p>
              <PanelSlide expanded={expanded} />
            </div>
            <div>
              <p className="mb-2 text-sm">CSS-only</p>
              <PanelSlideCss expanded={expanded} />
            </div>
          </div>
        </Stack>
      </div>
    );
  },
});
