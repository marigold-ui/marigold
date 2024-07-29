import { ReactNode } from 'react';

import type { GridColsAlignProp, PlaceItemsProp } from '@marigold/system';
import {
  cn,
  createVar,
  gridColsAlign,
  gridColumn,
  placeItems,
} from '@marigold/system';

export interface ContainerProps {
  children?: ReactNode;
  /**
   * The content type of the container.
   * @default 'content'
   */
  contentType?: 'content' | 'header';
  size?: keyof typeof content | keyof typeof header;
  /**
   * Set alignment the content inside the container.
   * @default left
   */
  align?: GridColsAlignProp['align'];
  /**
   * Set alignment of the items inside the container.
   */
  alignItems?: PlaceItemsProp['align'];
}

const content = {
  small: '20ch',
  medium: '45ch',
  large: '60ch',
};

const header = {
  small: '20ch',
  medium: '25ch',
  large: '35ch',
};

export const Container = ({
  contentType = 'content',
  size = 'medium',
  align = 'left',
  alignItems = 'none',
  children,
  ...props
}: ContainerProps) => {
  const maxWidth = contentType === 'content' ? content[size] : header[size];
  return (
    <div
      {...props}
      className={cn(
        'grid',
        placeItems[alignItems],
        gridColsAlign[align],
        gridColumn[align]
      )}
      style={createVar({ maxWidth })}
    >
      {children}
    </div>
  );
};
