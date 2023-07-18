import dynamic from 'next/dynamic';

export const registry: any = {
  'button-variant': dynamic(
    () => import('@/content/components/button/button-variant.demo')
  ),
  'accordion-basic': dynamic(
    () => import('@/content/components/accordion/accordion-basic.demo')
  ),
};
