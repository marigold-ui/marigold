// Shadows (from https://open-props.style/#shadows)
// ---------------
const SHADOW_COLOR = '220 3% 15%';
const SHADOW_STRENGTH = '1%';

export const shadow = {
  xsmall: `0 1px 2px -1px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 9%))`,
  small: `
    0 3px 5px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 7px 14px -5px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 5%))`,
  medium: `
    0 -1px 3px 0 hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 2%)),
    0 1px 2px -5px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 2%)),
    0 2px 5px -5px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 4%)),
    0 4px 12px -5px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 5%)),
    0 12px 15px -5px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 7%))`,
  large: `
    0 -2px 5px 0 hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 2%)),
    0 1px 1px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 2px 2px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 5px 5px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 4%)),
    0 9px 9px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 5%)),
    0 16px 16px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 6%))`,
  xlarge: `
    0 -1px 2px 0 hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 2%)),
    0 2px 1px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 5px 5px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 10px 10px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 4%)),
    0 20px 20px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 5%)),
    0 40px 40px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 7%))`,
  xxlarge: `
    0 -1px 2px 0 hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 2%)),
    0 3px 2px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 7px 5px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 3%)),
    0 12px 10px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 4%)),
    0 22px 18px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 5%)),
    0 41px 33px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 6%)),
    0 100px 80px -2px hsl(${SHADOW_COLOR} / calc(${SHADOW_STRENGTH} + 7%))`,
} as const;
