import { SVG, SVGProps } from '@marigold/system';

export const Upload = (props: SVGProps) => (
  <SVG
    {...props}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 9l-6-6-6 6M12 3v14M5 21h14" />
  </SVG>
);
