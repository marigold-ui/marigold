import { FormEvent, useState } from 'react';
import { Button, Form, Headline, Stack, TextField } from '@marigold/components';

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

    //avoid multiple submits while loading
    if (isLoading) {
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data: { [bookInput: string]: FormDataEntryValue } =
      Object.fromEntries(formData);
    setIsLoading(true);
    const res = await api(data['bookInput'].toString());
    setSearchTerm(res);
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
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
            loading={isLoading}
          >
            Submit
          </Button>
        </Stack>
        {searchTerm && `You searched for <b>${searchTerm}</b>.`}
      </Stack>
    </Form>
  );
};
