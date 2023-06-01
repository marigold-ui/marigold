import { SVG, SVGProps } from '@marigold/system';
import { forwardRef } from 'react';

export const FigmaIcon = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    ref={ref}
    {...props}
  >
    <path d="M192.951 94A45.979 45.979 0 0 0 162 14.001H94a45.979 45.979 0 0 0-30.951 80 45.932 45.932 0 0 0 0 67.999A45.99 45.99 0 1 0 140 196v-27.613a45.98 45.98 0 0 0 52.951-74.386ZM184 60.001a22.024 22.024 0 0 1-21.98 22L162 82l-.039.001H140V38h22a22.025 22.025 0 0 1 22 22Zm-112 0a22.025 22.025 0 0 1 22-22h22V82H93.981A22.025 22.025 0 0 1 72 60.001ZM72 128a22.025 22.025 0 0 1 21.981-22l.019.001h22v43.998L94 150a22.025 22.025 0 0 1-22-22Zm44 68a22 22 0 1 1-22-22h22Zm46-46a22 22 0 0 1-.039-43.999H162.02A22 22 0 0 1 162 150Z" />
  </SVG>
));
