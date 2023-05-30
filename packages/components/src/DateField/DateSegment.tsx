import React, { useRef } from 'react';
import { DateSegment as DateSegmentInterface } from '@react-stately/datepicker';
import { DateFieldState } from '@react-stately/datepicker';
import { cn, useClassNames } from '@marigold/system';
import { useDateSegment } from '@react-aria/datepicker';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

interface DateSegmentProps {
  segment: DateSegmentInterface;
  state: DateFieldState;
  isPrevPlaceholder?: boolean;
  variant?: string;
  size?: string;
}

export const DateSegment = ({
  segment,
  variant,
  size,
  state,
  isPrevPlaceholder,
}: DateSegmentProps) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const classNames = useClassNames({ component: 'DateField', variant, size });

  const { focusProps } = useFocusRing({
    within: true,
    isTextInput: true,
  });

  const { isPlaceholder, placeholder, text, type, maxValue } = segment;

  console.log(
    type === 'literal'
      ? `literal ${
          !isPrevPlaceholder && 'activeLiteral text-datefield-segment'
        }`
      : '',
    !isPrevPlaceholder,
    type
  );
  return (
    <div
      {...mergeProps(segmentProps, focusProps)}
      ref={ref}
      className={cn(
        maxValue != null && `min-w-[${String(maxValue).length}ch]`,
        'box-content rounded-sm text-center outline-0',
        classNames.segment
      )}
      // __baseCSS={{
      //   ...segmentProps.style,
      //   minWidth: maxValue != null ? String(maxValue).length + 'ch' : '',
      //   boxSizing: 'content-box',
      //   //fontVariantNumeric: 'lining-nums',
      //   textAlign: 'center',
      //   outline: '0',
      //   borderRadius: '2px',
      //   '&[data-focus-visible]': {
      //     bg: 'gray60',
      //     color: 'white',
      //   },
      //   '&:not([data-disabled]):not([data-focus-visible])': {
      //     '& span:nth-of-type(2)': {
      //       '&:not(.literal), &.activeLiteral': {
      //         color: 'gray60',
      //       },
      //     },
      //   },
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
      <span
        className={cn(
          type === 'literal'
            ? `literal ${
                !isPrevPlaceholder && 'activeLiteral text-datefield-segment'
              }`
            : '[&>*:not([data-focus-visible])]:text-datefield-segment'
        )}
      >
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
