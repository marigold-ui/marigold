import type RAC from 'react-aria-components';
import { DateSegment } from 'react-aria-components';
import { cn } from '@marigold/system';

export type DateSegmentProps = RAC.DateSegmentProps;

const _DateSegment = ({ segment, ...props }: DateSegmentProps) => {
  return (
    <DateSegment
      {...props}
      segment={segment}
      style={{
        minWidth:
          segment.maxValue != null
            ? `${String(segment.maxValue).length}ch`
            : undefined,
      }}
    >
      {({ text, placeholder, isPlaceholder }) => (
        <>
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
              : segment.type === 'month' || segment.type === 'day'
                ? segment.text.padStart(2, '0')
                : text}
          </span>
        </>
      )}
    </DateSegment>
  );
};

export { _DateSegment as DateSegment };
