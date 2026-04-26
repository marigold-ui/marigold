import { useState } from 'react';
import { Button, Form, SelectList, Stack, Text } from '@marigold/components';

export default () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <Stack space={4} alignX="left">
      <Form
        onSubmit={event => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setSubmitted(data.getAll('addons').join(', ') || 'none');
        }}
      >
        <Stack space={4} alignX="left">
          <SelectList
            label="Shipping add-ons"
            description="Bundle extras with your order."
            name="addons"
            selectionMode="multiple"
          >
            <SelectList.Option id="insurance" textValue="Parcel insurance">
              <Text slot="label">Parcel insurance</Text>
              <Text slot="description">Covers loss or damage up to €500.</Text>
            </SelectList.Option>
            <SelectList.Option id="signature" textValue="Signature on delivery">
              <Text slot="label">Signature on delivery</Text>
              <Text slot="description">
                Require a signature when handed over.
              </Text>
            </SelectList.Option>
            <SelectList.Option id="gift-wrap" textValue="Gift wrap">
              <Text slot="label">Gift wrap</Text>
              <Text slot="description">
                Premium paper and a handwritten note.
              </Text>
            </SelectList.Option>
          </SelectList>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Stack>
      </Form>
      {submitted !== null && <Text>Selected add-ons: {submitted}</Text>}
    </Stack>
  );
};
