import { FormEvent } from 'react';
import {
  Button,
  Center,
  FieldBase,
  FieldGroup,
  Slider,
  Stack,
} from '@marigold/components';
import { Form } from '@marigold/components/src/Form/Form';

export default () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData(e.target as HTMLFormElement);
    alert(
      `Age is selected from ${formData.get('start')} to ${formData.get('end')}.`
    );
  };

  return (
    <Center>
      <Form onSubmit={handleSubmit}>
        <Stack alignX="right" space={4}>
          <FieldGroup labelWidth={'100px'}>
            <Stack space={2}>
              <FieldBase label="Age">
                <Slider
                  defaultValue={[20, 30]}
                  maxValue={100}
                  thumbLabels={['start', 'end']}
                  width={60}
                />
              </FieldBase>
            </Stack>
          </FieldGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Center>
  );
};
