'use client';

import { type FooterProps, PageFooter } from 'fumadocs-ui/layouts/docs/page';
import { SiteFooter } from './SiteFooter';

export const DocsPageFooter = (props: FooterProps) => (
  <>
    <PageFooter {...props} />
    <SiteFooter />
  </>
);
