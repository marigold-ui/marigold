import React, { createContext, ReactNode, useContext } from 'react';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
  ThemeComponentProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface CardThemeExtension
  extends ThemeExtensionsWithParts<'Card', ['container', 'title']> {}

// Context
// ---------------
const CardContext = createContext<ThemeComponentProps>({});

const useCardContext = (
  part: string,
  { variant, size, ...props }: ThemeComponentProps
) => {
  const ctx = useContext(CardContext);
  const styles = useComponentStyles(
    'Card',
    { variant: variant || ctx.variant, size: size || ctx.size },
    { parts: [part] }
  );

  return {
    css: styles[part],
    ...props,
  };
};

// Parts
// ---------------
interface CardTitleProps extends ThemeComponentProps, ComponentProps<'div'> {
  children?: ReactNode;
}

const CardTitle = (props: CardTitleProps) => {
  const titleProps = useCardContext('title', props);
  return <Box {...titleProps} />;
};

// Props
// ---------------
export interface CardProps extends ThemeComponentProps, ComponentProps<'div'> {
  children?: ReactNode;
}

// Component
// ---------------
export const Card = ({ children, variant, size, ...props }: CardProps) => {
  const styles = useComponentStyles(
    'Card',
    { variant, size },
    { parts: ['container'] }
  );
  return (
    <CardContext.Provider value={{ variant, size }}>
      <Box {...props} css={styles.container}>
        {children}
      </Box>
    </CardContext.Provider>
  );
};

Card.Title = CardTitle;
