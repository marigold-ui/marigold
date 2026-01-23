import { CalendarDate } from '@internationalized/date';
import preview from '.storybook/preview';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { Button } from '../Button/Button';
import { Calendar } from '../Calendar/Calendar';
import { Checkbox } from '../Checkbox/Checkbox';
import { Columns } from '../Columns/Columns';
import { ComboBox } from '../ComboBox/ComboBox';
import { DateField } from '../DateField/DateField';
import { Inline } from '../Inline/Inline';
import { Link } from '../Link/Link';
import { Radio } from '../Radio/Radio';
import { Select } from '../Select/Select';
import { SelectList } from '../SelectList/SelectList';
import { Slider } from '../Slider/Slider';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { TextField } from '../TextField/TextField';
import { Form } from './Form';

const meta = preview.meta({
  title: 'Components/Form',
  component: Form,
});

export const Basic = meta.story({
  render: args => {
    return (
      <Form {...args}>
        <Stack space={5}>
          <TextField label="Name" />
          <TextField label="Email" type="email" />
          <DateField label="Date of Birth" />
          <Select label="Department">
            <Select.Option id="engineering">Engineering</Select.Option>
            <Select.Option id="design">Design</Select.Option>
            <Select.Option id="product">Product</Select.Option>
          </Select>
          <Checkbox label="Subscribe to Employee Newsletter" />
          <Inline space={4} alignY="center">
            <Button variant="primary">Save</Button>
            <Link variant="secondary">Cancel</Link>
          </Inline>
        </Stack>
      </Form>
    );
  },
});

export const Horizontal = meta.story({
  render: () => (
    <Inline space={4} alignY="bottom">
      <TextField label="Name" width={72} />
      <Button variant="primary">Save</Button>
    </Inline>
  ),
});

export const Selected = meta.story({
  render: args => {
    return (
      <Form {...args}>
        <Columns space={10} columns={[1, 1, 1]}>
          <Stack space={5}>
            <Checkbox.Group
              defaultValue={['company-news', 'job-alerts', 'event-updates']}
              label="Email Subscriptions"
            >
              <Checkbox
                value="company-news"
                label="Company News & Announcements"
              />
              <Checkbox
                value="job-alerts"
                label="Job Alerts & Internal Openings"
              />
              <Checkbox
                value="event-updates"
                label="Event Invitations & Updates"
              />
            </Checkbox.Group>
            <Radio.Group defaultValue="full-time" label="Employment Type">
              <Radio value="full-time">Full-Time</Radio>
              <Radio value="part-time">Part-Time</Radio>
            </Radio.Group>
            <Switch defaultSelected label="Remote Work" />
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
              width={40}
              defaultSelectedKey={'engineering'}
            >
              <Select.Option id="engineering">Engineering</Select.Option>
              <Select.Option id="design">Design</Select.Option>
              <Select.Option id="product">Product</Select.Option>
            </Select>
            <ComboBox
              label="Job Role"
              width={40}
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
              width={40}
              defaultSelectedKey={'san-francisco'}
            >
              <Autocomplete.Option id="berlin">Berlin</Autocomplete.Option>
              <Autocomplete.Option id="new-york">New York</Autocomplete.Option>
              <Autocomplete.Option id="san-francisco">
                San Francisco
              </Autocomplete.Option>
              <Autocomplete.Option id="london">London</Autocomplete.Option>
            </Autocomplete>

            <SelectList
              aria-label="Work Days"
              selectionMode="multiple"
              defaultSelectedKeys={['monday', 'tuesday', 'wednesday', 'friday']}
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
    );
  },
});
