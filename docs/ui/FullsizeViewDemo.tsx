import { ReactNode } from 'react';

import { Button, Dialog } from '@marigold/components';

export interface FullsizeViewProps {
  code?: ReactNode;
}

export const FullsizeView = ({ code }: FullsizeViewProps) => {
  return (
    <Dialog.Trigger dismissable>
      <Button className="border-none p-0 outline-0">
        <svg width="20px" height="20px" viewBox="0 0 24 24">
          <path
            className="size-5 fill-white"
            d="M18.5625 18.5625H5.4375V5.4375H12V3.5625H5.4375C4.39687 3.5625 3.5625 4.40625 3.5625 5.4375V18.5625C3.5625 19.5938 4.39687 20.4375 5.4375 20.4375H18.5625C19.5938 20.4375 20.4375 19.5938 20.4375 18.5625V12H18.5625V18.5625ZM13.8648 3.5625V5.44042H17.2356L8.00565 14.6704L9.32959 15.9943L18.5596 6.76436V10.1352H20.4375V3.5625H13.8648Z"
          ></path>
        </svg>
      </Button>
      <Dialog closeButton variant="fullscreen">
        <div className="not-prose overflow-y-auto rounded-lg bg-[#1f2937] p-6">
          <pre className="[&>code]:bg-transparent">{code}</pre>
        </div>
      </Dialog>
    </Dialog.Trigger>
  );
};
