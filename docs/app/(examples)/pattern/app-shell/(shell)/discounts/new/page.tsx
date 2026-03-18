'use client';

import {
  Button,
  Card,
  Columns,
  Headline,
  Inline,
  Inset,
  LinkButton,
  NumberField,
  Select,
  Stack,
  Switch,
  Text,
  TextField,
} from '@marigold/components';

const NewDiscountPage = () => (
  <Inset space={4}>
    <div className="max-w-[896px]">
      <form>
        <Stack space="regular">
          <Stack space="tight">
            <Headline level={2}>Add Discount</Headline>
            <Text size="sm" variant="muted">
              Create a new discount by setting the type, value, and usage
              limits.
            </Text>
          </Stack>

          <Card p={4} stretch>
            <Stack space="regular">
              <Headline level={3}>Discount Details</Headline>
              <Columns columns={[1, 1]} space={4}>
                <TextField
                  label="Discount Name"
                  required
                  placeholder="Summer Sale"
                />
                <TextField
                  label="Discount Code"
                  required
                  placeholder="SUMMERSALE25"
                />
              </Columns>
            </Stack>
          </Card>

          <Card p={4} stretch>
            <Stack space="regular">
              <Headline level={3}>Discount Value</Headline>
              <Columns columns={[1, 1]} space={4}>
                <Select label="Discount Type" required>
                  <Select.Option id="percentage">
                    Percentage off products/collections
                  </Select.Option>
                  <Select.Option id="fixed">Fixed amount off</Select.Option>
                </Select>
                <NumberField
                  label="Discount Value"
                  required
                  formatOptions={{ style: 'unit', unit: 'percent' }}
                />
              </Columns>
              <Select label="Applies to" required>
                <Select.Option id="all">All products</Select.Option>
                <Select.Option id="collections">
                  Specific collections
                </Select.Option>
              </Select>
              <div>
                <Switch label="Exclude products" />
                <Text size="xs" variant="muted">
                  Exclude specific products from this discount.
                </Text>
              </div>
            </Stack>
          </Card>

          <Card p={4} stretch>
            <Stack space="regular">
              <Headline level={3}>Discount Uses</Headline>
              <div>
                <Switch label="Limit the number of times this discount can be used" />
                <Text size="xs" variant="muted">
                  Set a maximum number of times this discount can be applied.
                </Text>
              </div>
              <NumberField
                label="Max uses"
                required
                defaultValue={100}
                width={48}
              />
              <div>
                <Switch label="Limit to One Use Per Customer" />
                <Text size="xs" variant="muted">
                  Each customer can only use this discount once.
                </Text>
              </div>
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
