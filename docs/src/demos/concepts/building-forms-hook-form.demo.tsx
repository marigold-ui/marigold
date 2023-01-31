import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import {
  Button,
  FieldGroup,
  Select,
  Stack,
  TextField,
  Headline,
  Columns,
} from '@marigold/components';

interface IFormInputs {
  firstName: string;
  name: string;
  phone: string;
  mail: string;
  country: string | number;
}
export const SubmitFormWithReactHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      name: '',
      phone: '',
      mail: '',
      country: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    alert(JSON.stringify(data));
  };

  return (
    <FieldGroup labelWidth="medium">
      <Headline level="2">Example Form</Headline>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space="medium">
          <Columns columns={[2, 2]} space="medium">
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
          </Columns>
          <Stack space="medium">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                min: 6,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone:"
                  required
                  placeholder="Phone"
                  type="tel"
                  description="Please enter your phone number"
                  error={!/^[0-9]*$/.test(field.value) ? true : false}
                  errorMessage="The field is required. Please enter a valid phone number."
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
                    field.value.length > 0 &&
                    !/^\S+@\S+\.\S+$/.test(field.value)
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
                  description="Please select your country."
                >
                  <Select.Option key={'none'}>
                    Select an option...
                  </Select.Option>
                  <Select.Option key={'germany'}>Germany</Select.Option>
                  <Select.Option key={'austria'}>Austria</Select.Option>
                  <Select.Option key={'switzerland'}>Switzerland</Select.Option>
                </Select>
              )}
            />
          </Stack>
        </Stack>
        <Stack alignX="right">
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
    </FieldGroup>
  );
};
