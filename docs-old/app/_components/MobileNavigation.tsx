'use client';

import { Button, Dialog } from '@/ui';
import { Logo } from '@/ui/Logo';
import { Navigation } from '@/ui/navigation/Navigation';

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
    <Button variant="ghost">
      <MenuIcon />
    </Button>
    <Dialog variant="fullscreen" closeButton>
      {({ close }) => (
        <>
          <header className="flex items-center gap-2 pl-4 text-3xl font-bold tracking-tight text-[#46505a] uppercase">
            <Logo className="size-10" />
            Marigold
          </header>
          <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full right-0 bottom-0 -mr-4 h-[calc(100vh-90px)] overflow-y-auto">
            <Navigation onClick={close} />
          </div>
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);
