import { CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from '../Autocomplete';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Checkbox } from '../Checkbox';
import { Columns } from '../Columns';
import { ComboBox } from '../ComboBox';
import { DateField } from '../DateField';
import { FieldGroup } from '../FieldBase';
import { Inline } from '../Inline';
import { Radio } from '../Radio';
import { Select } from '../Select';
import { SelectList } from '../SelectList';
import { Slider } from '../Slider';
import { Stack } from '../Stack';
import { Switch } from '../Switch';
import { TextField } from '../TextField';
import { Form, FormProps } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
} satisfies Meta<FormProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args, ctx) => {
    const isCore = ctx.globals.theme === 'core';

    return (
      <FieldGroup labelWidth={isCore ? '100px' : undefined}>
        <div className="grid h-full place-items-center">
          <Form {...args}>
            <Stack space={5}>
              <TextField label="Name" width={isCore ? 72 : 72} />
              <TextField label="Email" type="email" width={isCore ? 72 : 72} />
              <DateField label="Date of Birth" width={isCore ? 56 : 44} />
              <Select label="Department" width={isCore ? 60 : 40}>
                <Select.Option id="engineering">Engineering</Select.Option>
                <Select.Option id="design">Design</Select.Option>
                <Select.Option id="product">Product</Select.Option>
              </Select>
              <Checkbox>Subscribe to Employee Newsletter</Checkbox>
            </Stack>
          </Form>
        </div>
      </FieldGroup>
    );
  },
};

export const Horizontal: Story = {
  render: args => (
    <Inline space={4} alignY="bottom">
      <TextField label="Name" width={72} />
      <Button variant="primary">Save</Button>
    </Inline>
  ),
};

export const Selected: Story = {
  render: (args, ctx) => {
    const isCore = ctx.globals.theme === 'core';

    return (
      <FieldGroup labelWidth={isCore ? '100px' : undefined}>
        <Form {...args}>
          <Columns space={10} columns={[1, 1, 1]}>
            <Stack space={5}>
              <Checkbox.Group
                defaultValue={['company-news', 'job-alerts', 'event-updates']}
                label="Email Subscriptions"
              >
                <Checkbox value="company-news">
                  Company News & Announcements
                </Checkbox>
                <Checkbox value="job-alerts">
                  Job Alerts & Internal Openings
                </Checkbox>
                <Checkbox value="event-updates">
                  Event Invitations & Updates
                </Checkbox>
              </Checkbox.Group>
              <Radio.Group defaultValue="full-time" label="Employment Type">
                <Radio value="full-time">Full-Time</Radio>
                <Radio value="part-time">Part-Time</Radio>
              </Radio.Group>
              <Switch defaultSelected>Remote Work</Switch>
              <Slider
                label="Preferred Weekly Work Hours"
                minValue={20}
                maxValue={50}
                step={5}
                defaultValue={40}
              />
            </Stack>
            <Stack space={5}>
              <Select
                label="Department"
                width={isCore ? 60 : 40}
                defaultSelectedKey={'engineering'}
              >
                <Select.Option id="engineering">Engineering</Select.Option>
                <Select.Option id="design">Design</Select.Option>
                <Select.Option id="product">Product</Select.Option>
              </Select>
              <ComboBox
                label="Job Role"
                width={isCore ? 60 : 40}
                defaultSelectedKey={'software-engineer'}
              >
                <ComboBox.Option id="software-engineer">
                  Software Engineer
                </ComboBox.Option>
                <ComboBox.Option id="product-manager">
                  Product Manager
                </ComboBox.Option>
                <ComboBox.Option id="ux-designer">UX Designer</ComboBox.Option>
                <ComboBox.Option id="hr-specialist">
                  HR Specialist
                </ComboBox.Option>
                <ComboBox.Option id="marketing-coordinator">
                  Marketing Coordinator
                </ComboBox.Option>
              </ComboBox>
              <Autocomplete
                label="Office Location"
                width={isCore ? 60 : 40}
                defaultSelectedKey={'san-francisco'}
              >
                <Autocomplete.Option id="berlin">Berlin</Autocomplete.Option>
                <Autocomplete.Option id="new-york">
                  New York
                </Autocomplete.Option>
                <Autocomplete.Option id="san-francisco">
                  San Francisco
                </Autocomplete.Option>
                <Autocomplete.Option id="london">London</Autocomplete.Option>
              </Autocomplete>

              <SelectList
                aria-label="Work Days"
                selectionMode="multiple"
                defaultSelectedKeys={[
                  'monday',
                  'tuesday',
                  'wednesday',
                  'friday',
                ]}
              >
                <SelectList.Item id="monday">Monday</SelectList.Item>
                <SelectList.Item id="tuesday">Tuesday</SelectList.Item>
                <SelectList.Item id="wednesday">Wednesday</SelectList.Item>
                <SelectList.Item id="thursday">Thursday</SelectList.Item>
                <SelectList.Item id="friday">Friday</SelectList.Item>
              </SelectList>
            </Stack>
            <Stack space={5}>
              <Calendar
                aria-label="Start Date"
                defaultValue={new CalendarDate(2025, 8, 16)}
              />
            </Stack>
          </Columns>
        </Form>
      </FieldGroup>
    );
  },
};
