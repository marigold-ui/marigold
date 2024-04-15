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
            className="fill-white"
            fill-rule="evenodd"
            d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </Button>
      <Dialog>
        {/* need to add the background color here otherwise it will not be displayed */}
        {({ close }) => (
          <div className="not-prose h-[90vh] w-full overflow-y-auto rounded-lg bg-[#1f2937] p-6">
            <div className="flex justify-end gap-2">
              <CopyButton codeString={codeString} />
              <Button variant="inverted" onPress={close}>
                Close
              </Button>
            </div>
            <pre className="[&>code]:bg-transparent">{code}</pre>
          </div>
        )}
      </Dialog>
    </Dialog.Trigger>
  );
};
