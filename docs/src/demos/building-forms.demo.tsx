import {
  Button,
  Stack,
  NumberField,
  TextField,
  ThemeProvider,
} from '@marigold/components';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface IFormInputs {
  firstName: string;
  name: string;
  phone: number;
  mail: string;
}

export const Form = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: '',
      name: '',
      phone: 0,
      mail: '',
    },
  });

  const [error, setError] = useState<boolean>(false);
  if (
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    )
  ) {
    setError(true);
  }
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space="medium">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Firstname:"
                description="Please enter your firstname"
                placeholder="Firstname"
                {...field}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name:"
                description="Please enter your name"
                placeholder="Name"
                {...field}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <NumberField
                label="Phone:"
                description="Please enter your phone number"
                hideStepper
                {...field}
              />
            )}
          />

          <Controller
            name="mail"
            control={control}
            render={({ field }) => (
              <TextField
                label="E-Mail:"
                description="Please enter your E-Mail adress"
                placeholder="E-Mail"
                error={error}
                value={field.value}
                errorMessage="Please enter a valid E-Mail adress."
                {...field}
              />
            )}
          />
          <Button variant="primary" size="small" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
