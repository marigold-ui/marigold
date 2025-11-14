import { Dialog, Modal } from 'react-aria-components';
import { useId } from '@react-aria/utils';
import { useClassNames } from '@marigold/system';
import { Underlay } from '../Overlay/Underlay';
import type { BaseLoaderProps } from './BaseLoader';
import { BaseLoader } from './BaseLoader';

export type LoaderVisualType = 'xloader' | 'circle';

// Full Size
// ---------------
export interface LoaderProps extends BaseLoaderProps {
  /**
   * Show the loader in `fullscreen` to overlay and block interaction with the site or `section` to show loading for a certain area.
   * @default undefined
   */
  mode?: 'fullscreen' | 'section';
  /**
   * Selects the visual style of the loading indicator shown when loading is true. Accepts `xloader` or `cycle`.
   * @default cycle
   */
  loaderType?: LoaderVisualType;
}

// Full Screen
// ---------------
const LoaderFullScreen = (props: BaseLoaderProps) => {
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
const LoaderSection = (props: BaseLoaderProps) => {
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
export const Loader = ({ mode, variant, ...props }: LoaderProps) =>
  mode === 'fullscreen' ? (
    <LoaderFullScreen variant={variant ?? 'inverted'} {...props} />
  ) : mode === 'section' ? (
    <LoaderSection variant={variant ?? 'inverted'} {...props} />
  ) : (
    <BaseLoader variant={variant} {...props} />
  );
