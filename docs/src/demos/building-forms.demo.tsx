import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Select, Stack, TextField } from '@marigold/components';
import { useState } from 'react';

interface IFormInputs {
  firstName: string;
  name: string;
  phone: string;
  mail: string;
  country: string | number;
}

export const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      firstName: '',
      name: '',
      phone: '',
      mail: '',
      country: '',
    },
  });
  const [selected, setSelected] = useState<string | number>('');
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  console.log(selected);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space="medium">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Firstname:"
                required
                description="Please enter your firstname"
                placeholder="Firstname"
                error={field.value.length < 0 ? true : false}
                errorMessage="The field is required. Please enter your firstname."
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name:"
                required
                description="Please enter your name"
                placeholder="Name"
                error={field.value.length < 0 ? true : false}
                errorMessage="The field is required. Please enter your name."
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone:"
                required
                description="Please enter your phone number"
                error={
                  field.value.length <= 6 && /^\d+$/.test(field.value)
                    ? true
                    : false
                }
                errorMessage="The field is required. Please enter a valid phone number."
                pattern="[0-9]*"
              />
            )}
          />

          <Controller
            name="mail"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="E-Mail:"
                description="Please enter your E-Mail adress"
                placeholder="E-Mail"
                required
                error={
                  field.value.length > 0 && !/^\S+@\S+\.\S+$/.test(field.value)
                    ? true
                    : false
                }
                errorMessage="The field is required. Please enter a valid E-Mail adress."
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Country:"
                name="country"
                description="Please select your country."
                onSelectionChange={setSelected}
                selectedKey={selected}
                onChange={e => {
                  field.onChange(e);
                  console.log('log', e.target.value); // let's say this is the additional processing
                }}
              >
                <Select.Option key={'germany'} textValue={'germany'}>
                  Germany
                </Select.Option>
                <Select.Option key={'austria'} textValue={'austria'}>
                  Austria
                </Select.Option>
                <Select.Option key={'switzerland'} textValue={'switzerland'}>
                  Switzerland
                </Select.Option>
              </Select>
            )}
          />

          <Button
            variant="primary"
            size="small"
            type="submit"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
