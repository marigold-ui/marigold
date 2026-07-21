import { LazyMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Load motion's `domMax` feature set (animations + exit + gestures + drag +
 * layout) asynchronously. The dynamic import targets a local module (not
 * `motion/react` directly) so bundlers split the ~30 kB feature bundle into
 * its own chunk — components that pull in motion (ActionBar, Tabs, Tray) ship
 * only the tiny `m` core (~5 kB) up front and fetch the features on demand.
 */
const loadFeatures = () =>
  import('./motionFeatures.js').then(res => res.domMax);

/**
 * Wraps a motion subtree with lazily-loaded features. Use together with the
 * `m` components from `motion/react-m` (never the full `motion` proxy — that
 * would defeat the lazy split and trip `strict` mode).
 */
export const MotionFeatures = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={loadFeatures} strict>
    {children}
  </LazyMotion>
);
