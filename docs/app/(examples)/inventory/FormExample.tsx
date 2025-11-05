import {
  Button,
  Columns,
  ComboBox,
  Divider,
  Form,
  Headline,
  Inline,
  Radio,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

export const FormExample = () => (
  <Form autoComplete="off">
    <Columns columns={[1, 1, 1]} space={8} collapseAt="800px">
      <Stack space="fieldY">
        <Headline level="4">Shipping Address</Headline>
        <TextField label="Full name" required />
        <TextField label="Street" required />
        <Inline space="fieldX" noWrap>
          <TextField label="ZIP code" required maxLength={5} width="1/4" />
          <TextField label="City" required />
        </Inline>
        <ComboBox
          label="State"
          placeholder="Select your state"
          menuTrigger="focus"
        >
          <ComboBox.Option id="BW">Baden-Wuerttemberg</ComboBox.Option>
          <ComboBox.Option id="BY">Bavaria</ComboBox.Option>
          <ComboBox.Option id="BE">Berlin</ComboBox.Option>
          <ComboBox.Option id="BB">Brandenburg</ComboBox.Option>
          <ComboBox.Option id="HB">Bremen</ComboBox.Option>
          <ComboBox.Option id="HH">Hamburg</ComboBox.Option>
          <ComboBox.Option id="HE">Hesse</ComboBox.Option>
          <ComboBox.Option id="MV">
            Mecklenburg-Western Pomerania
          </ComboBox.Option>
          <ComboBox.Option id="NI">Lower Saxony</ComboBox.Option>
          <ComboBox.Option id="NW">North Rhine-Westphalia</ComboBox.Option>
          <ComboBox.Option id="RP">Rhineland-Palatinate</ComboBox.Option>
          <ComboBox.Option id="SL">Saarland</ComboBox.Option>
          <ComboBox.Option id="SN">Saxony</ComboBox.Option>
          <ComboBox.Option id="ST">Saxony-Anhalt</ComboBox.Option>
          <ComboBox.Option id="SH">Schleswig-Holstein</ComboBox.Option>
          <ComboBox.Option id="TH">Thuringia</ComboBox.Option>
        </ComboBox>
        <Divider />
        <Headline level="4">Shipping Options</Headline>
        <Radio.Group label="Shipping method" defaultValue="standard">
          <Radio value="standard">
            <Inline alignY="center" alignX="between">
              <Text>Standard Shipping</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (3-5 days)
              </Text>
            </Inline>
          </Radio>
          <Radio value="express">
            <Inline alignY="center" alignX="between">
              <Text>Express Shipping</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (1-2 days)
              </Text>
            </Inline>
          </Radio>
          <Radio value="overnight">
            <Inline alignY="center" alignX="between">
              <Text>Overnight Shipping</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (next day)
              </Text>
            </Inline>
          </Radio>
          <Radio value="pickup">
            <Inline alignY="center" alignX="between">
              <Text>In-Store Pickup</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (in 2 hours)
              </Text>
            </Inline>
          </Radio>
        </Radio.Group>
        <TextArea
          label="Delivery Instructions"
          description="Tricky delivery spot? Add a gate code, building access info, or a safe place to leave your package."
        />
        <Inline alignY="center" space="fieldX">
          <Button variant="primary">Submit</Button>
          <Button>Cancel</Button>
        </Inline>
      </Stack>
      <Stack>asd</Stack>
      <Stack>asd</Stack>
    </Columns>
  </Form>
);
