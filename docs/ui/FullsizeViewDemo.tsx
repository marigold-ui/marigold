import { ReactNode } from 'react';

import { Button, Dialog } from '@marigold/components';

import { CopyButton } from './CopyButton';

export interface FullsizeViewProps {
  code: ReactNode;
  codeString: string;
}

export const FullsizeView = ({ code, codeString }: FullsizeViewProps) => {
  return (
    <Dialog.Trigger dismissable>
      <Button className="hidden border-none p-0 outline-0 md:block">
        <svg width="20px" height="20px" viewBox="0 0 24 24">
          <path
            className="size-5 fill-white"
            d="M18.5625 18.5625H5.4375V5.4375H12V3.5625H5.4375C4.39687 3.5625 3.5625 4.40625 3.5625 5.4375V18.5625C3.5625 19.5938 4.39687 20.4375 5.4375 20.4375H18.5625C19.5938 20.4375 20.4375 19.5938 20.4375 18.5625V12H18.5625V18.5625ZM13.8648 3.5625V5.44042H17.2356L8.00565 14.6704L9.32959 15.9943L18.5596 6.76436V10.1352H20.4375V3.5625H13.8648Z"
          ></path>
        </svg>
      </Button>
      <Dialog>
        {/* need to add the background color here otherwise it will not be displayed */}
        <div className="not-prose h-[90vh] w-full overflow-y-auto rounded-lg bg-[#1f2937] p-10">
          <div className="flex justify-end gap-2">
            <CopyButton codeString={codeString} />
          </div>
          <pre className="[&>code]:bg-transparent">{code}</pre>
        </div>
      </Dialog>
    </Dialog.Trigger>
  );
};
