import { Inline } from '@/ui';
import { PropsWithChildren } from 'react';
import { Logo } from '@/ui/Logo';
import { DefaultLayout } from '@/ui/layout/DefaultLayout';

// Layout
// ---------------
const Layout = ({ children }: PropsWithChildren) => (
  <DefaultLayout>
    {children}
    <p className="prose mt-5">
      <Inline alignY="center" space={2}>
        <span>Yours, DST</span>
        <Logo className="inline-block size-4" />
      </Inline>
    </p>
  </DefaultLayout>
);

export default Layout;
