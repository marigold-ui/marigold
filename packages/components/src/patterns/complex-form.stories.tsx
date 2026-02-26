import preview from '.storybook/preview';
import { Accordion } from '../Accordion/Accordion';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { ComboBox } from '../ComboBox/ComboBox';
import { DatePicker } from '../DatePicker/DatePicker';
import { Headline } from '../Headline/Headline';
import { Inline } from '../Inline/Inline';
import { NumberField } from '../NumberField/NumberField';
import { Radio } from '../Radio/Radio';
import { Select } from '../Select/Select';
import { Slider } from '../Slider/Slider';
import { Split } from '../Split/Split';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
import { TextArea } from '../TextArea/TextArea';
import { TextField } from '../TextField/TextField';

const meta = preview.meta({
  title: 'Patterns/Complex Form',
});

export const EmployeeOnboarding = meta.story({
  render: () => (
    <div className="mx-auto max-w-screen-sm">
      <Stack space="section">
        {/* Form Header */}
        <Stack space="tight">
          <Headline level={2}>Employee Onboarding</Headline>
          <Text variant="muted">
            Complete the following form to register a new employee. All required
            fields must be filled before submission.
          </Text>
        </Stack>

        {/* Form Body */}
        <Stack space="section">
          {/* Section 1: Personal Information */}
          <Stack space="group">
            <Stack space="regular">
              <Headline level={3}>Personal Information</Headline>
              <Inline space="related" alignY="input" noWrap>
                <TextField label="First Name" width="1/2" required />
                <TextField label="Last Name" width="1/2" required />
              </Inline>
              <TextField
                label="Email Address"
                description="Must be a valid company or personal email"
                type="email"
                width="2/3"
                required
              />
            </Stack>
            <Stack space="regular">
              <TextField label="Phone Number" type="tel" width="1/2" />
              <DatePicker label="Date of Birth" width="1/2" />
              <Select
                label="Nationality"
                placeholder="Select a country"
                width="1/2"
              >
                <Select.Option id="de">Germany</Select.Option>
                <Select.Option id="at">Austria</Select.Option>
                <Select.Option id="ch">Switzerland</Select.Option>
                <Select.Option id="us">United States</Select.Option>
                <Select.Option id="gb">United Kingdom</Select.Option>
                <Select.Option id="fr">France</Select.Option>
                <Select.Option id="other">Other</Select.Option>
              </Select>
              <TextArea
                label="Home Address"
                description="Street, city, postal code, and country"
                width="2/3"
                rows={3}
              />
            </Stack>
          </Stack>

          {/* Section 2: Employment Details */}
          <Stack space="regular">
            <Headline level={3}>Employment Details</Headline>
            <TextField
              label="Job Title"
              description="As it will appear on the employment contract"
              width="2/3"
              required
            />
            <ComboBox label="Department" width="1/2" required>
              <ComboBox.Option id="engineering">Engineering</ComboBox.Option>
              <ComboBox.Option id="design">Design</ComboBox.Option>
              <ComboBox.Option id="product">Product</ComboBox.Option>
              <ComboBox.Option id="marketing">Marketing</ComboBox.Option>
              <ComboBox.Option id="sales">Sales</ComboBox.Option>
              <ComboBox.Option id="hr">Human Resources</ComboBox.Option>
              <ComboBox.Option id="finance">Finance</ComboBox.Option>
              <ComboBox.Option id="legal">Legal</ComboBox.Option>
              <ComboBox.Option id="operations">Operations</ComboBox.Option>
            </ComboBox>
            <Inline space="related" alignY="input" noWrap>
              <Select label="Employment Type" width="1/2" required>
                <Select.Option id="full-time">Full-time</Select.Option>
                <Select.Option id="part-time">Part-time</Select.Option>
                <Select.Option id="contract">Contract</Select.Option>
                <Select.Option id="intern">Internship</Select.Option>
              </Select>
              <DatePicker label="Start Date" width="1/2" required />
            </Inline>
            <TextField label="Reporting Manager" width="1/2" />
            <Inline space="related" alignY="input" noWrap>
              <TextField
                label="Employee ID"
                description="Leave blank to auto-generate"
                width="1/2"
              />
              <TextField label="Work Location" width="1/2" />
            </Inline>
          </Stack>

          {/* Section 3: Compensation & Benefits */}
          <Stack space="regular">
            <Headline level={3}>Compensation &amp; Benefits</Headline>
            <Inline space="related" alignY="input" noWrap>
              <NumberField
                label="Annual Salary"
                width="1/2"
                required
                formatOptions={{
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
              />
              <Select label="Currency" width="fit" defaultValue="eur">
                <Select.Option id="eur">EUR</Select.Option>
                <Select.Option id="usd">USD</Select.Option>
                <Select.Option id="gbp">GBP</Select.Option>
                <Select.Option id="chf">CHF</Select.Option>
              </Select>
            </Inline>
            <Radio.Group
              label="Pay Frequency"
              defaultValue="monthly"
              orientation="horizontal"
            >
              <Radio value="weekly">Weekly</Radio>
              <Radio value="biweekly">Bi-weekly</Radio>
              <Radio value="monthly">Monthly</Radio>
            </Radio.Group>
            <Checkbox.Group
              label="Benefits Package"
              description="Select all that apply"
            >
              <Checkbox value="health" label="Health Insurance" />
              <Checkbox value="dental" label="Dental Insurance" />
              <Checkbox value="retirement" label="Retirement Plan (401k)" />
              <Checkbox value="transit" label="Transit Subsidy" />
              <Checkbox value="gym" label="Gym Membership" />
            </Checkbox.Group>
            <Slider
              label="Vacation Days"
              description="Statutory minimum is 20 days"
              width="1/2"
              defaultValue={25}
              minValue={20}
              maxValue={35}
            />
            <Switch label="Eligible for Annual Bonus" />
          </Stack>

          {/* Section 4: Emergency Contact (collapsible) */}
          <Accordion variant="card">
            <Accordion.Item id="emergency">
              <Accordion.Header>Emergency Contact</Accordion.Header>
              <Accordion.Content>
                <Stack space="regular">
                  <TextField label="Contact Name" width="1/2" required />
                  <Inline space="related" alignY="input" noWrap>
                    <TextField label="Contact Phone" type="tel" width="1/2" />
                    <Select label="Relationship" width="1/2">
                      <Select.Option id="spouse">Spouse</Select.Option>
                      <Select.Option id="parent">Parent</Select.Option>
                      <Select.Option id="sibling">Sibling</Select.Option>
                      <Select.Option id="friend">Friend</Select.Option>
                      <Select.Option id="other">Other</Select.Option>
                    </Select>
                  </Inline>
                  <Checkbox.Group label="Communication Preferences">
                    <Checkbox value="sms" label="SMS" />
                    <Checkbox value="call" label="Phone Call" />
                    <Checkbox value="email" label="Email" />
                  </Checkbox.Group>
                </Stack>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          {/* Action Buttons */}
          <Inline space="related" alignY="center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" type="reset">
              Reset
            </Button>
            <Split />
            <Button variant="ghost">Save as Draft</Button>
          </Inline>
        </Stack>
      </Stack>
    </div>
  ),
});
