import { ReactNode } from 'react';

import {
  GridColsAlignProp,
  GridColumn,
  PlaceItemsProp,
  cn,
  createVar,
  gridColsAlign,
  gridColumn,
  placeItems,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

export interface ContainerProps
  extends HtmlProps<'div'>,
    PlaceItemsProp,
    GridColumn,
    GridColsAlignProp {
  children?: ReactNode;
  contentType?: 'content' | 'header';
  size?: keyof typeof content | keyof typeof header;
  align?: 'left' | 'right' | 'center';
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
      className={cn(
        'grid',
        placeItems[alignItems],
        gridColsAlign[align],
        gridColumn[align]
      )}
      style={createVar({ maxWidth })}
      {...props}
    >
      {children}
    </div>
  );
};
