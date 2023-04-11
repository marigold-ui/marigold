import React, { useRef } from 'react';
import { DateSegment as DateSegmentInterface } from '@react-stately/datepicker';
import { DateFieldState } from '@react-stately/datepicker';
import { useComponentStyles, useStateProps } from '@marigold/system';
import { useDateSegment } from '@react-aria/datepicker';
import { Box } from '@marigold/system';

interface DateSegmentProps {
  segment: DateSegmentInterface;
  state: DateFieldState;
}

export const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const styles = useComponentStyles('DateField', {}, { parts: ['segment'] });
  const stateProps = useStateProps({ disabled: state.isDisabled });
  const { maxValue, isPlaceholder, placeholder, text, type } = segment;
  return (
    <Box
      {...segmentProps}
      {...stateProps}
      ref={ref}
      __baseCSS={{
        ...segmentProps.style,
        minWidth: maxValue != null ? String(maxValue).length + 'ch' : '',
        paddingX: '0.125rem',
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
          height: isPlaceholder ? '' : 0,
          pointerEvents: 'none',
          display: 'block',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {placeholder}
      </Box>

      {isPlaceholder
        ? ''
        : type === 'month' || type === 'day'
        ? Number(text) < 10
          ? '0' + text
          : text
        : text}
      {/* {isPlaceholder ? "" : text} */}
    </Box>
  );
};
