import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Stack } from '../Stack/Stack';
import type { LoaderProps } from './BaseLoader';
import { BaseLoader } from './BaseLoader';

// Full Size
// ---------------
const LoaderFullSize = (props: LoaderProps) => {
  const className = useClassNames({
    component: 'Underlay',
    variant: 'modal',
    className:
      'fixed left-0 top-0 z-10 flex h-[--visual-viewport-height] w-screen items-center justify-center bg-gray-950/30 cursor-progress',
  });

  return (
    <ModalOverlay defaultOpen className={className} isKeyboardDismissDisabled>
      <Modal>
        <Dialog className="outline-0">
          <Stack space={2} alignX="center">
            <BaseLoader {...props} />
          </Stack>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

// Inline
// ---------------
const LoaderInline = (props: LoaderProps) => (
  // TODO: Can we move the div into the basloader as a variant?
  <div className="flex size-full items-center justify-center bg-gray-950/30">
    <Stack space={2} alignX="center">
      <BaseLoader {...props} />
    </Stack>
  </div>
);

// Component
// ---------------
export const XLoader = ({ mode, ...props }: LoaderProps) =>
  mode === 'fullsize' ? (
    <LoaderFullSize {...props} />
  ) : mode === 'inline' ? (
    <LoaderInline {...props} />
  ) : (
    <BaseLoader {...props} />
  );
