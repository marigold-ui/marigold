import React from 'react';
import { SVG, cn, createVar, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface LabelProps extends HtmlProps<'label'> {
  as?: 'label' | 'span';
  variant?: string;
  size?: string;
  required?: boolean;
  labelWidth?: string;
}

// Component
// ---------------
export const Label = ({
  as = 'label',
  required,
  children,
  variant,
  size,
  labelWidth,
  ...props
}: LabelProps) => {
  const Component = as;
  const classNames = useClassNames({ component: 'Label', size, variant });

  return (
    <Component
      {...props}
      className={cn(classNames, 'flex w-[var(--labelWidth)]')}
      style={createVar({ labelWidth })}
      // aria-required is set on the field and will already be announced,
      // so we don't need to add it here. BUT we need it for styling the required label, so this is needed.
      aria-required={required}
    >
      {children}
      {required && (
        <SVG
          viewBox="0 0 24 24"
          role="presentation"
          size={16}
          className="text-error-text"
        >
          <path d="M10.8 3.84003H13.2V9.85259L18.1543 7.01815L19.3461 9.10132L14.3584 11.9549L19.3371 14.7999L18.1463 16.8836L13.2 14.0572V20.16H10.8V13.9907L5.76116 16.8735L4.56935 14.7903L9.5232 11.9561L4.56 9.12003L5.75073 7.03624L10.8 9.92154V3.84003Z" />
        </SVG>
      )}
    </Component>
  );
};
