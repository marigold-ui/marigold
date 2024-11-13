import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import type { LoaderProps } from './BaseLoader';
import { BaseLoader } from './BaseLoader';

// Full Size
// ---------------
export interface XLoaderProps extends LoaderProps {
  /**
   * Show the loader in `fullsize` to overlay and block interaction with the site or `ìnline` to show loading for a certain area.
   * @default undefined
   */
  mode?: 'fullsize' | 'inline';
}

// Full Size
// ---------------
const LoaderFullSize = (props: LoaderProps) => {
  const className = useClassNames({
    component: 'Underlay',
    variant: 'modal',
    className: 'fixed left-0 top-0 z-10 h-[--visual-viewport-height] w-screen',
  });

  return (
    <ModalOverlay defaultOpen className={className} isKeyboardDismissDisabled>
      <Modal className="grid h-[--visual-viewport-height] cursor-progress place-items-center">
        <Dialog className="outline-0" aria-label="Fullscreen Loader">
          <BaseLoader {...props} />
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

// Inline
// ---------------
const LoaderInline = (props: LoaderProps) => {
  const className = useClassNames({
    component: 'Underlay',
    variant: 'modal',
    className: 'flex size-full items-center justify-center',
  });

  return (
    <div className={className}>
      <BaseLoader {...props} />
    </div>
  );
};

// Component
// ---------------
export const XLoader = ({ mode, variant, ...props }: XLoaderProps) =>
  mode === 'fullsize' ? (
    <LoaderFullSize variant="inverted" {...props} />
  ) : mode === 'inline' ? (
    <LoaderInline variant="inverted" {...props} />
  ) : (
    <BaseLoader {...props} />
  );
