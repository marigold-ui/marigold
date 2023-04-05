import { useRef } from 'react';
import { DateSegment as DateSegmentInterface } from '@react-stately/datepicker';
import { DateFieldState } from '@react-stately/datepicker';
import { useComponentStyles } from '@marigold/system';
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
  return (
    <Box
      {...segmentProps}
      ref={ref}
      __baseCSS={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? String(segment.maxValue).length + 'ch'
            : '',
        paddingX: '0.125rem',
        boxSizing: 'content-box',
        fontVariantNumeric: 'lining-nums',
        textAlign: 'center',
        outline: '0',
        borderRadius: '2px',
      }}
      css={styles.segment}
      className={state.isDisabled ? 'disabled' : undefined}
    >
      <Box
        as="span"
        aria-hidden="true"
        __baseCSS={{
          visibility: segment.isPlaceholder ? 'visible' : 'hidden',
          height: segment.isPlaceholder ? '' : 0,
          pointerEvents: 'none',
          display: 'block',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {segment.placeholder}
      </Box>
      {segment.isPlaceholder
        ? ''
        : segment.text === '/'
        ? '.'
        : Number(segment.text) < 10
        ? '0' + segment.text
        : segment.text}
    </Box>
  );
};
