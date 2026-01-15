import { ReactNode } from 'react';
import { Button, Dialog } from '@marigold/components';
import { CopyButton } from './CopyButton';

export interface FullsizeViewProps {
  code: ReactNode;
  codeString: string;
}

export const FullsizeView = ({ code, codeString }: FullsizeViewProps) => (
  <Dialog.Trigger dismissable>
    <div className="[&>button]:hidden [&>button]:md:block">
      <Button variant="icon">
        <svg width="20px" height="20px" viewBox="0 0 24 24">
          <path
            className="fill-white"
            fillRule="evenodd"
            d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
    <Dialog variant="codeblock">
      {({ close }) => (
        <>
          <div className="absolute top-6 right-6 flex justify-end gap-4">
            <CopyButton codeString={codeString} />
            <Button variant="inverted" size="small" onPress={close}>
              Close
            </Button>
          </div>
          {code}
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);
