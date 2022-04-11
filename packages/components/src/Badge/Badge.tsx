import React from "react";
import { ComponentProps } from "@marigold/types";
import { useComponentStyles } from "@marigold/system";

import { Box } from "../Box";

// Theme Extension
// ---------------
export interface BadgeThemeExtension<Value> {
  Badge?: {
    base: Value;
    variant?: {
      [key: string]: Value;
    };
  };
}

// Props
// ---------------
export interface BadgeProps extends ComponentProps<"div"> {
  variant?: string;
}

// Component
// ---------------
export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  ...props
}) => {
  const styles = useComponentStyles("Badge", { variant });
  return (
    <Box {...props} css={styles}>
      {children}
    </Box>
  );
};
