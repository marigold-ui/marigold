import type { FormEvent } from 'react';
import { Button, Form, Slider, Stack } from '@marigold/components';

export default () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    alert(
      `Age is selected from ${formData.get('start')} to ${formData.get('end')}.`
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack space={8} alignX="left">
        <Slider
          label="Age Range"
          defaultValue={[20, 50]}
          maxValue={100}
          step={10}
          name={['start', 'end']}
          width="1/2"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
