import { Button, NumberField, Slider } from '@marigold/components';

export default () => (
  <div className="item-center mx-auto grid max-w-1/2 place-items-center gap-12 py-4">
    <Slider
      label={
        <>
          <>Ticket Price</>
          <Button variant="link">Reset filter</Button>
        </>
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
    <NumberField
      label={
        <div className="flex w-full items-center justify-between">
          <>Min. available Tickets</>
          <Button variant="link" slot={null}>
            Reset filter
          </Button>
        </div>
      }
      defaultValue={2}
      minValue={0}
      maxValue={150}
    />
  </div>
);
