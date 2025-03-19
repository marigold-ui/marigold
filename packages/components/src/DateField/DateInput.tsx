import { ReactElement } from 'react';
import type RAC from 'react-aria-components';
import { DateInput, Group } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { DateSegment } from './DateSegment';

type RemovedProps = 'style' | 'className' | 'children';

export interface DateInputProps extends Omit<RAC.DateInputProps, RemovedProps> {
  variant?: string;
  size?: string;
  action?: ReactElement<any>;
}

const _DateInput = ({ variant, size, action, ...props }: DateInputProps) => {
  const classNames = useClassNames({ component: 'DateField', variant, size });

  return (
    <Group className={classNames.field}>
      <DateInput className="flex flex-1 items-center" {...props}>
        {segment => (
          <DateSegment className={classNames.segment} segment={segment} />
        )}
      </DateInput>
      {action ? action : null}
    </Group>
  );
};

export { _DateInput as DateInput };
