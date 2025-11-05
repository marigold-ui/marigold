import {
  Columns,
  ComboBox,
  Divider,
  Form,
  Headline,
  Inline,
  Select,
  Stack,
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
        <ComboBox label="State" placeholder="Select your state">
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
        <TextArea
          label="Delivery Instructions"
          description="Add any special instructions for the delivery, like a gate code or specific delivery times."
        />
        <Divider />
        <Headline level="4">Shipping Method</Headline>
      </Stack>
      <Stack>asd</Stack>
      <Stack>asd</Stack>
    </Columns>
  </Form>
);
