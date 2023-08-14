import { type ReactNode } from 'react';
import { createVar, useClassNames } from '@marigold/system';

export interface CheckboxFieldProps {
  children: ReactNode;
  labelWidth: string;
}

export const CheckboxField = ({ children, labelWidth }: CheckboxFieldProps) => {
  const classNames = useClassNames({ component: 'Field' });

  return (
    <div className={classNames}>
      <div className="w-[--labelWidth]" style={createVar({ labelWidth })} />
      {children}
    </div>
  );
};
