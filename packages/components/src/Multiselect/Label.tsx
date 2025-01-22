import { Label as _Label } from 'react-aria-components';
import { LabelProps as LabelComponentProps } from 'react-aria-components';
import { SVG, cn, createVar } from '@marigold/system';
import { useFieldGroupContext } from '../FieldBase';

interface LabelProps extends LabelComponentProps {
  classNames: {
    labelContainer?: string;
    labelIndicator?: string;
  };
}

export const Label = ({ classNames, children, ...props }: LabelProps) => {
  const { labelWidth } = useFieldGroupContext();
  console.log('classNamesclassNames', classNames);
  return (
    <_Label
      {...props}
      className={cn(classNames.labelContainer, 'flex w-[var(--labelWidth)]')}
      style={createVar({ labelWidth })}
    >
      {children}
      <SVG
        viewBox="0 0 24 24"
        role="presentation"
        size={16}
        className={cn('hidden', classNames.labelIndicator)}
      >
        <path d="M10.8 3.84003H13.2V9.85259L18.1543 7.01815L19.3461 9.10132L14.3584 11.9549L19.3371 14.7999L18.1463 16.8836L13.2 14.0572V20.16H10.8V13.9907L5.76116 16.8735L4.56935 14.7903L9.5232 11.9561L4.56 9.12003L5.75073 7.03624L10.8 9.92154V3.84003Z" />
      </SVG>
    </_Label>
  );
};
