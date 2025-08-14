import { Undo2 } from 'lucide-react';
import {
  Button,
  Inline,
  NumberField,
  Slider,
  Stack,
  Tooltip,
} from '@marigold/components';

const Reset = () => (
  <Tooltip.Trigger>
    <Button size="small" variant="link" slot={null}>
      <Undo2 className="size-4" strokeWidth={2.5} />
    </Button>
    <Tooltip>Reset filter</Tooltip>
  </Tooltip.Trigger>
);

export default () => (
  <div className="mx-auto w-1/2">
    <Stack space={6}>
      <NumberField
        label={
          <Inline space={2}>
            <>Min. available Tickets</>
            <Reset />
          </Inline>
        }
        defaultValue={2}
        minValue={0}
        maxValue={150}
      />
      <Slider
        label={
          <Inline space={2}>
            <>Ticket Price</>
            <Reset />
          </Inline>
        }
        defaultValue={[30, 80]}
        step={10}
        maxValue={150}
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
        }}
      />
    </Stack>
  </div>
);
