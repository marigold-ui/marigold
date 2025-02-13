import { FormEvent } from 'react';
import {
  Button,
  Container,
  FieldBase,
  FieldGroup,
  Inline,
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
    <Container size={'large'}>
      <Form onSubmit={handleSubmit}>
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
        <Inline space={4} alignX={'right'}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Inline>
      </Form>
    </Container>
  );
};
