'use client';

import { Dialog, Button } from '@/ui';
import Image from 'next/image';

// Helpers
// ---------------
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// Component
// ---------------
export const MobileNavigation = () => {
  return (
    <Dialog.Trigger>
      <Button>
        <MenuIcon />
      </Button>
      <Dialog variant="fullpage" closeButton>
        <div className="flex items-center text-3xl font-bold uppercase text-[#46505a]">
          <Image src="/logo.svg" alt="Marigold Logo" width={64} height={64} />
          Marigold Docs
        </div>
      </Dialog>
    </Dialog.Trigger>
  );
};

// return (
//   <Sheet.Trigger>
//     <Sheet.Button>
//       <MenuIcon />
//     </Sheet.Button>
//     <Sheet>this will be the navigation</Sheet>
//   </Sheet.Trigger>
// );
