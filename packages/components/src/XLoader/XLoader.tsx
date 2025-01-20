import { Dialog, Modal } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Underlay } from '../Overlay';
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
const LoaderFullSize = (props: LoaderProps) => (
  <Underlay defaultOpen keyboardDismissable variant="modal">
    <Modal className="grid h-[--visual-viewport-height] cursor-progress place-items-center">
      <Dialog className="outline-0" aria-label="Fullscreen Loader">
        <BaseLoader {...props} />
      </Dialog>
    </Modal>
  </Underlay>
);

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
    <LoaderFullSize variant={variant ?? 'inverted'} {...props} />
  ) : mode === 'inline' ? (
    <LoaderInline variant={variant ?? 'inverted'} {...props} />
  ) : (
    <BaseLoader variant={variant} {...props} />
  );
