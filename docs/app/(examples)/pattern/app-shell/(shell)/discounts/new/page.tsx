'use client';

import {
  Button,
  Card,
  DatePicker,
  Headline,
  Inline,
  Inset,
  LinkButton,
  NumberField,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

const NewDiscountPage = () => (
  <Inset space={4}>
    <div className="max-w-[896px]">
      <form>
        <Stack space="section">
          <Card p={4} stretch>
            <Stack space="regular">
              <Stack space="tight">
                <Headline level={2}>Basic Information</Headline>
                <Text size="sm" variant="muted">
                  Set up the discount code and its description.
                </Text>
              </Stack>
              <TextField label="Code" placeholder="e.g. SUMMER25" />
              <TextField label="Name" placeholder="e.g. Summer Sale" />
              <TextArea
                label="Description"
                placeholder="Describe the discount..."
              />
            </Stack>
          </Card>

          <Card p={4} stretch>
            <Stack space="regular">
              <Stack space="tight">
                <Headline level={2}>Discount Configuration</Headline>
                <Text size="sm" variant="muted">
                  Define the discount type and value.
                </Text>
              </Stack>
              <Select label="Type">
                <Select.Option id="percentage">Percentage</Select.Option>
                <Select.Option id="fixed">Fixed amount</Select.Option>
              </Select>
              <NumberField label="Value" />
              <NumberField label="Minimum order amount" />
            </Stack>
          </Card>

          <Card p={4} stretch>
            <Stack space="regular">
              <Stack space="tight">
                <Headline level={2}>Validity</Headline>
                <Text size="sm" variant="muted">
                  Set the time range and usage limits for this discount.
                </Text>
              </Stack>
              <Inline space="related">
                <DatePicker label="Start date" />
                <DatePicker label="End date" />
              </Inline>
              <NumberField label="Usage limit" />
            </Stack>
          </Card>

          <Inline space="regular">
            <Button variant="primary" type="submit">
              Create Discount
            </Button>
            <LinkButton href="/discounts">Cancel</LinkButton>
          </Inline>
        </Stack>
      </form>
    </div>
  </Inset>
);

export default NewDiscountPage;
