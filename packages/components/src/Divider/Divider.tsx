import type RAC from 'react-aria-components';
import { Separator } from 'react-aria-components/Separator';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface DividerProps extends Omit<RAC.SeparatorProps, RemovedProps> {
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: 'default' | 'bold' | (string & {});
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
  size?: string & {};
}

const Divider = ({ variant, size, orientation, ...props }: DividerProps) => {
  const classNames = useClassNames({
    component: 'Divider',
    variant,
    size,
  });

  const orientationStyles =
    orientation === 'vertical' ? 'min-h-8 w-px' : 'h-px min-w-full';

  return (
    <Separator
      orientation={orientation}
      className={cn('border-none', orientationStyles, classNames)}
      {...props}
    />
  );
};

export { Divider };
