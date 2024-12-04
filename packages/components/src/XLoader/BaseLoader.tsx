import type { ReactNode } from 'react';
import { Label, ProgressBar } from 'react-aria-components';
import type { ProgressBarProps } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

// Props
// ---------------
export interface LoaderProps
  extends Pick<
    ProgressBarProps,
    | 'id'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'aria-details'
  > {
  /**
   * Children of the component that will make up the label.
   */
  children?: ReactNode;
  size?: string;
  variant?: string;
}

// Base
// ---------------
export const BaseLoader = ({
  variant,
  size,
  children,
  'aria-label': ariaLabel,
  ...props
}: LoaderProps) => {
  const className = useClassNames({ component: 'XLoader', variant, size });

  return (
    <ProgressBar
      className={className.container}
      isIndeterminate
      aria-label={ariaLabel || children ? ariaLabel : 'Loading...'}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 150"
        fill="currentColor"
        className={className.loader}
      >
        <path id="XMLID_1_" d="M35.3 27h26.5l54 74.1H88.7z" />
        <path
          id="XMLID_5_"
          d="M124.3 12.8h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c0 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="1.0s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_18_"
          d="M115.9 24.4h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c0 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.9s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_19_"
          d="M107.5 35.9h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c0 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.8s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_20_"
          d="M99.1 47.5h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c0 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.7s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_21_"
          d="M90.7 59H90c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c0 2.8-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.6s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_22_"
          d="M68 89.8h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.8c0 2.6-2.2 4.8-4.9 4.8z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.5s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_23_"
          d="M59.6 101.4h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c0 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.4s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_24_"
          d="M51.2 112.9h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c-.1 2.8-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.3s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_25_"
          d="M42.8 124.5h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c-.1 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.2s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_26_"
          d="M34.4 136h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c-.1 2.7-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.1s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          id="XMLID_27_"
          d="M26 147.6h-.7c-2.7 0-4.9-2.2-4.9-4.9v-.7c0-2.7 2.2-4.9 4.9-4.9h.7c2.7 0 4.9 2.2 4.9 4.9v.7c-.1 2.8-2.2 4.9-4.9 4.9z"
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .01; 1; 1; 1;"
            begin="0.0s"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      {children ? <Label className={className.label}>{children}</Label> : null}
    </ProgressBar>
  );
};
