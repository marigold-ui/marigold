// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import dynamic from 'next/dynamic';

export const registry = {
  'accordion-basic': {
    name: 'accordion-basic',
    demo: dynamic(
      () => import('@/content/components/accordion/accordion-basic.demo')
    ),
    file: 'content/components/accordion/accordion-basic.demo.tsx',
  },
  'basic-accordion': {
    name: 'basic-accordion',
    demo: dynamic(
      () => import('@/content/components/accordion/basic-accordion.demo')
    ),
    file: 'content/components/accordion/basic-accordion.demo.tsx',
  },
  'horizontal-breakout': {
    name: 'horizontal-breakout',
    demo: dynamic(
      () => import('@/content/components/breakout/horizontal-breakout.demo')
    ),
    file: 'content/components/breakout/horizontal-breakout.demo.tsx',
  },
  'iframe-breakout': {
    name: 'iframe-breakout',
    demo: dynamic(
      () => import('@/content/components/breakout/iframe-breakout.demo')
    ),
    file: 'content/components/breakout/iframe-breakout.demo.tsx',
  },
  'vertical-breakout': {
    name: 'vertical-breakout',
    demo: dynamic(
      () => import('@/content/components/breakout/vertical-breakout.demo')
    ),
    file: 'content/components/breakout/vertical-breakout.demo.tsx',
  },
  'button-variant': {
    name: 'button-variant',
    demo: dynamic(
      () => import('@/content/components/button/button-variant.demo')
    ),
    file: 'content/components/button/button-variant.demo.tsx',
  },
  'full-container': {
    name: 'full-container',
    demo: dynamic(
      () => import('@/content/components/container/full-container.demo')
    ),
    file: 'content/components/container/full-container.demo.tsx',
  },
  'small-container': {
    name: 'small-container',
    demo: dynamic(
      () => import('@/content/components/container/small-container.demo')
    ),
    file: 'content/components/container/small-container.demo.tsx',
  },
  rightside: {
    name: 'rightside',
    demo: dynamic(() => import('@/content/components/aside/rightside.demo')),
    file: 'content/components/aside/rightside.demo.tsx',
  },
  space: {
    name: 'space',
    demo: dynamic(() => import('@/content/components/aside/space.demo')),
    file: 'content/components/aside/space.demo.tsx',
  },
} as const;
