import preview from '.storybook/preview';
import { DateField } from '../DateField/DateField';
import { Grid } from '../Grid/Grid';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { NumberField } from '../NumberField/NumberField';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { TextArea } from '../TextArea/TextArea';
import { TextField } from '../TextField/TextField';
import { FieldBase } from './FieldBase';

const meta = preview.meta({
  title: 'Components/FieldBase',
  component: FieldBase,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is the label' },
      },
      description: 'The Label of the field',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field, used Tailwind tokens for this.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'full' },
      },
    },
    isInvalid: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is invalid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      description: 'Wheter if the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
    label: 'This is the label',
    isRequired: false,
    isInvalid: false,
    width: 'full',
  },
});

export const Basic = meta.story({
  render: args => (
    <FieldBase {...args}>
      <input className="border" />
    </FieldBase>
  ),
});

export const LayoutVariations = meta.story({
  render: () => (
    <Stack space={32}>
      <Stack space={2}>
        <Headline level={3}>
          Fraction Values (label + helptext according to width)
        </Headline>
        <Stack space={20}>
          <Inline space={4} alignY="bottom" noWrap>
            <TextField label="Width 1/3" width={'1/3'} />
            <TextField label="Width 2/3" width={'2/3'} />
          </Inline>
          <Stack space={4}>
            <TextField
              label="Width 1/3"
              width={'1/3'}
              description="This is a very very very very very very very very loooooong help text description"
            />
            <TextField label="Width 2/3" width={'2/3'} />
          </Stack>
        </Stack>
      </Stack>

      <Stack space={2}>
        <Headline level={3}>
          Fixed Values (label + helptext can be longer as width)
        </Headline>
        <Stack space={20}>
          <Inline alignX="left" space={4} alignY="input">
            <TextField label="Width 96" width={96} />
            <Select
              label="Width 80"
              width={80}
              description="This is a very very very very very very very very loooooong help text description"
            >
              <Select.Option id="us">United States</Select.Option>
              <Select.Option id="uk">United Kingdom</Select.Option>
              <Select.Option id="de">Germany</Select.Option>
            </Select>
            <TextArea label="Width 32" width={32} />
          </Inline>
          <Stack space={4}>
            <TextField label="Width 96" width={96} />
            <Select
              label="Width 80"
              width={80}
              description="This is a very very very very very very very very loooooong help text description"
            >
              <Select.Option id="us">United States</Select.Option>
              <Select.Option id="uk">United Kingdom</Select.Option>
              <Select.Option id="de">Germany</Select.Option>
            </Select>
            <TextArea label="Width 32" width={32} />
          </Stack>
        </Stack>
      </Stack>

      <Stack space={2}>
        <Headline level={3}>
          Keywords (label + helptext can be longer as width)
        </Headline>
        <Stack space={20}>
          <Inline alignX="left" space={4} alignY="input" noWrap>
            <TextField label="Width default" />
            <Select
              label="Width fit"
              width={'fit'}
              description="This is a very very very very very very very very loooooong help text description"
            >
              <Select.Option id="us">United States</Select.Option>
              <Select.Option id="uk">United Kingdom</Select.Option>
              <Select.Option id="de">Germany</Select.Option>
            </Select>
            <TextArea label="Width max" width={'max'} />
          </Inline>
          <Stack space={4}>
            <TextField label="Width default" />
            <Select
              label="Width fit"
              width={'fit'}
              description="This is a very very very very very very very very loooooong help text description"
            >
              <Select.Option id="us">United States</Select.Option>
              <Select.Option id="uk">United Kingdom</Select.Option>
              <Select.Option id="de">Germany</Select.Option>
            </Select>
            <TextArea label="Width max" width={'max'} />
          </Stack>
        </Stack>
      </Stack>

      <Stack space={5}>
        <Headline level={3}>Inline/Stack Layout</Headline>
        <Inline space={4} alignY="bottom" noWrap>
          <TextField label="Enter your Name" width={64} />
          <Select label="Enter your Country" width={40}>
            <Select.Option id="us">United States</Select.Option>
            <Select.Option id="uk">United Kingdom</Select.Option>
            <Select.Option id="de">Germany</Select.Option>
          </Select>
          <DateField label="Enter your Birth Date" width={'fit'} />
          <NumberField label="Enter your Age" width={20} hideStepper />
        </Inline>
        <TextArea label="Enter your Comments" width={'2/3'} />
      </Stack>

      <Stack space={5}>
        <Headline level={3}>Grid Layout</Headline>
        <Grid
          areas={[
            'name country birthdate age',
            'comments comments comments comments',
          ]}
          columns={[1, 1, 1, 1]}
          rows={['auto', 'auto']}
          space={4}
        >
          <Grid.Area name="name">
            <TextField label="Enter your Name" width={64} />
          </Grid.Area>
          <Grid.Area name="country">
            <Select label="Enter your Country" width={40}>
              <Select.Option id="us">United States</Select.Option>
              <Select.Option id="uk">United Kingdom</Select.Option>
              <Select.Option id="de">Germany</Select.Option>
            </Select>
          </Grid.Area>
          <Grid.Area name="birthdate">
            <DateField label="Enter your Birth Date" width={'fit'} />
          </Grid.Area>
          <Grid.Area name="age">
            <NumberField label="Enter your Age" width={20} hideStepper />
          </Grid.Area>
          <Grid.Area name="comments">
            <TextArea label="Enter your Comments" width={'2/3'} />
          </Grid.Area>
        </Grid>
      </Stack>
    </Stack>
  ),
});
