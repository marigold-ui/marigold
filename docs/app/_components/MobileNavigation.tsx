'use client';

import { Dialog, Button, Header } from '@/ui';

import { Logo } from './Logo';
import { Navigation } from './Navigation';

// Helpers
// ---------------
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// Component
// ---------------
export const MobileNavigation = () => (
  <Dialog.Trigger>
    <Button variant="ghost" className="md:hidden">
      <MenuIcon />
    </Button>
    <Dialog variant="fullpage" closeButton>
      {({ close }) => (
        <>
          <Header className="flex items-center gap-2 pl-4 text-3xl font-bold uppercase tracking-tight text-[#46505a]">
            <Logo className="h-10 w-10" />
            Marigold
          </Header>
          <Navigation onClick={close} />
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);
