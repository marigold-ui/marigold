import React, { useRef } from 'react';
import { DateSegment as DateSegmentInterface } from '@react-stately/datepicker';
import { DateFieldState } from '@react-stately/datepicker';
import { useComponentStyles, useStateProps } from '@marigold/system';
import { useDateSegment } from '@react-aria/datepicker';
import { Box } from '@marigold/system';
import { useFocusRing } from '@react-aria/focus';

interface DateSegmentProps {
  segment: DateSegmentInterface;
  state: DateFieldState;
  isPrevPlaceholder?: boolean;
}

export const DateSegment = ({
  segment,
  state,
  isPrevPlaceholder,
}: DateSegmentProps) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const styles = useComponentStyles(
    'DateField',
    {},
    { parts: ['segment', 'placeholder', 'segmentValue'] }
  );
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
    <Box
      {...segmentProps}
      {...stateProps}
      {...focusProps}
      ref={ref}
      __baseCSS={{
        ...segmentProps.style,
        minWidth: maxValue != null ? String(maxValue).length + 'ch' : '',
        boxSizing: 'content-box',
        fontVariantNumeric: 'lining-nums',
        textAlign: 'center',
        outline: '0',
        borderRadius: '2px',
      }}
      css={styles.segment}
    >
      <Box
        as="span"
        aria-hidden="true"
        __baseCSS={{
          visibility: isPlaceholder ? 'visible' : 'hidden',
          pointerEvents: 'none',
          display: isPlaceholder ? 'block' : 'none',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {isPlaceholder && placeholder?.toUpperCase()}
      </Box>

      <Box
        css={styles.segmentValue}
        as="span"
        className={
          type === 'literal'
            ? `literal  ${!isPrevPlaceholder && 'activeLiteral'}`
            : ''
        }
      >
        {isPlaceholder
          ? ''
          : type === 'month' || type === 'day'
          ? Number(text) < 10
            ? '0' + text
            : text
          : text}
        {/* {isPlaceholder ? "" : text} */}
      </Box>
    </Box>
  );
};
