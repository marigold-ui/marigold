import dynamic from 'next/dynamic';

export const registry = {
  'button-variant': dynamic(
    () => import('@/content/components/button/button-variant.demo')
  ),
};
