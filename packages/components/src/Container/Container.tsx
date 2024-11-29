import { ReactNode } from 'react';
import type {
  GapSpaceProp,
  GridColsAlignProp,
  PlaceItemsProp,
} from '@marigold/system';
import {
  cn,
  createVar,
  gapSpace,
  gridColsAlign,
  gridColumn,
  placeItems,
} from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface ContainerProps extends GapSpaceProp, AriaRegionProps {
  children?: ReactNode;
  /**
   * The content type of the container.
   * @default 'content'
   */
  contentType?: 'content' | 'header';
  /**
   * @deprecated use `containerWidth` instead
   */
  size?: keyof typeof content | keyof typeof header;

  /**
   * Width of the container.
   */
  containerWidth?: keyof typeof content | keyof typeof header;
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
  containerWidth = 'medium',
  align = 'left',
  alignItems = 'none',
  space = 0,
  children,
  ...props
}: ContainerProps) => {
  const maxWidth =
    contentType === 'content'
      ? content[props.size ?? containerWidth]
      : header[props.size ?? containerWidth];
  return (
    <div
      {...props}
      className={cn(
        'grid',
        placeItems[alignItems],
        gridColsAlign[align],
        gridColumn[align],
        gapSpace[space]
      )}
      style={createVar({ maxWidth })}
    >
      {children}
    </div>
  );
};
