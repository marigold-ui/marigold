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
  const [searchTerm, setSearchTerm] = useState<string>('');

  const api = (inputValue: string): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(inputValue);
      }, 3000);
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: { [bookInput: string]: FormDataEntryValue } =
      Object.fromEntries(formData);

    setIsLoading(true);
    const res = await api(data['bookInput'].toString());
    setSearchTerm(res);
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
            name="bookInput"
          />
          <Stack space={2}>
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
            {searchTerm && `You searched for ${searchTerm}.`}
          </Stack>
        </FieldGroup>
      </Form>
      {isLoading && <XLoader mode="fullsize" size={80} />}
    </div>
  );
};
