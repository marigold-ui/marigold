// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import dynamic from 'next/dynamic';

export const registry = {
  'basic-accordion': {
    name: 'basic-accordion',
    demo: dynamic(
      () => import('@/content/components/accordion/basic-accordion.demo')
    ),
    file: 'content/components/accordion/basic-accordion.demo.tsx',
  },
  'button-variant': {
    name: 'button-variant',
    demo: dynamic(
      () => import('@/content/components/button/button-variant.demo')
    ),
    file: 'content/components/button/button-variant.demo.tsx',
  },
  'inset-equal': {
    name: 'inset-equal',
    demo: dynamic(() => import('@/content/components/inset/inset-equal.demo')),
    file: 'content/components/inset/inset-equal.demo.tsx',
  },
  'inset-hv': {
    name: 'inset-hv',
    demo: dynamic(() => import('@/content/components/inset/inset-hv.demo')),
    file: 'content/components/inset/inset-hv.demo.tsx',
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
} as const;
