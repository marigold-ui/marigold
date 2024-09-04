import { FormEvent, useState } from 'react';
import {
  Button,
  FieldGroup,
  Form,
  Headline,
  Stack,
  TextField,
  XLoader,
} from '@marigold/components';

export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const api = (): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Data succesfully fetched!');
      }, 3000);
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await api();
    setIsLoading(false);
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <FieldGroup labelWidth="100px">
          <Headline level={2}>Book search</Headline>
          <TextField
            label="Book name:"
            description="Please enter a book name"
            placeholder="Book name"
          />
          <Stack alignX="right">
            <Button
              variant="primary"
              size="small"
              type="submit"
              className="w-20"
            >
              Submit
            </Button>
          </Stack>
        </FieldGroup>
      </Form>
      {isLoading && <XLoader mode="fullsize" size={80} />}
    </div>
  );
};