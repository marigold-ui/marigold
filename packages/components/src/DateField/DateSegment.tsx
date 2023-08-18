import React, { useRef } from 'react';

import { useDateSegment } from '@react-aria/datepicker';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { DateSegment as DateSegmentInterface } from '@react-stately/datepicker';
import { DateFieldState } from '@react-stately/datepicker';

import { cn, useStateProps } from '@marigold/system';

interface DateSegmentProps {
  segment: DateSegmentInterface;
  state: DateFieldState;
  isPrevPlaceholder?: boolean;
  className?: string;
}

export const DateSegment = ({
  className,
  segment,
  state,
  isPrevPlaceholder,
}: DateSegmentProps) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const { focusProps, isFocused } = useFocusRing({
    within: true,
    isTextInput: true,
  });
  const stateProps = useStateProps({
    disabled: state.isDisabled,
    focusVisible: isFocused,
  });

  const { isPlaceholder, placeholder, text, type, maxValue } = segment;

  return (
    <div
      {...mergeProps(segmentProps, stateProps, focusProps)}
      ref={ref}
      className={cn(
        'group/segment',
        'text-center leading-none outline-0',
        type !== 'literal' && 'p-0.5',
        className
      )}
      style={{
        ...segmentProps.style,
        minWidth: maxValue != null ? String(maxValue).length + 'ch' : undefined,
      }}
    >
      <span
        aria-hidden="true"
        className={cn(
          isPlaceholder ? 'visible block' : 'invisible hidden',
          'pointer-events-none w-full text-center'
        )}
      >
        {isPlaceholder && placeholder?.toUpperCase()}
      </span>
      <span>
        {isPlaceholder
          ? ''
          : type === 'month' || type === 'day'
          ? Number(text) < 10
            ? '0' + text
            : text
          : text}
      </span>
    </div>
  );
};
