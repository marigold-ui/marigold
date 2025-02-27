import { Dialog, Modal } from 'react-aria-components';
import { useId } from '@react-aria/utils';
import { useClassNames } from '@marigold/system';
import { Underlay } from '../Overlay';
import type { LoaderProps } from './BaseLoader';
import { BaseLoader } from './BaseLoader';

// Full Size
// ---------------
export interface XLoaderProps extends LoaderProps {
  /**
   * Show the loader in `fullscreen` to overlay and block interaction with the site or `section` to show loading for a certain area.
   * @default undefined
   */
  mode?: 'fullscreen' | 'section';
}

// Full Screen
// ---------------
const LoaderFullScreen = (props: LoaderProps) => {
  const id = useId();

  return (
    <Underlay defaultOpen keyboardDismissable variant="modal">
      <Modal className="grid h-(--visual-viewport-height) cursor-progress place-items-center">
        <Dialog className="outline-0" aria-labelledby={id}>
          <BaseLoader id={id} {...props} />
        </Dialog>
      </Modal>
    </Underlay>
  );
};

// Section
// ---------------
const LoaderSection = (props: LoaderProps) => {
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
  mode === 'fullscreen' ? (
    <LoaderFullScreen variant={variant ?? 'inverted'} {...props} />
  ) : mode === 'section' ? (
    <LoaderSection variant={variant ?? 'inverted'} {...props} />
  ) : (
    <BaseLoader variant={variant} {...props} />
  );
