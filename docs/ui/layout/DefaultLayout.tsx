import type { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { SectionNavigation } from './SectionNavigation';

export const DefaultLayout = ({ children }: PropsWithChildren) => (
  <>
    <aside
      className={[
        'top-(--page-header-height)',
        'py-(--page-sub-nav-padding) xl:py-(--page-sub-nav-padding-xl)',
        'pl-(--page-padding-md) xl:pl-(--page-padding-xl)',
        'h-[calc(100vh-var(--page-header-height))] w-(--page-sub-nav-width) xl:w-(--page-sub-nav-width-xl)',
        'fixed z-10 hidden overflow-hidden hover:overflow-y-auto md:block',
        'scrollbar-thin scrollbar-thumb-secondary-400 scrollbar-thumb-rounded-full scrollbar-track-transparent',
        'border-secondary-200 border-r',
      ].join(' ')}
    >
      <SectionNavigation />
    </aside>
    <main
      className={[
        'pt-(--page-main-padding) xl:pt-(--page-main-padding-xl)',
        'px-(--page-padding) md:px-(--page-padding-md) xl:pr-(--page-padding-xl)',
        'md:pl-[calc(var(--page-sub-nav-width)+var(--page-main-padding))] xl:pl-[calc(var(--page-sub-nav-width-xl)+var(--page-main-padding-xl))]',
      ].join(' ')}
    >
      {children}
      <Footer />
    </main>
  </>
);
