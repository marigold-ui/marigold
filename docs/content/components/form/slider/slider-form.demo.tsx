import { FormEvent } from 'react';
import {
  Button,
  Center,
  FieldBase,
  Form,
  Slider,
  Stack,
} from '@marigold/components';

export default () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    alert(
      `Age is selected from ${formData.get('start')} to ${formData.get('end')}.`
    );
  };

  return (
    <Center>
      <Form onSubmit={handleSubmit}>
        <Stack alignX="right" space={4}>
          <Stack space={2}>
            <FieldBase label="Age">
              <Slider
                defaultValue={[20, 30]}
                maxValue={100}
                name={['start', 'end']}
                width={60}
              />
            </FieldBase>
          </Stack>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Center>
  );
};
