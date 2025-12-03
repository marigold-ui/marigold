import {
  Card,
  ComboBox,
  DateField,
  Headline,
  Inline,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Stack space="peer" alignX="left">
      <Stack space="related">
        <Headline level="3">Personal Information</Headline>
        <Card space="group">
          <Stack space="peer">
            <TextField label="Full Name" />
            <TextField label="Email" type="email" />
            <DateField label="Date of Birth" width="fit" />
          </Stack>
          <Stack space="peer">
            <TextField label="Address" />
            <Inline space="tight" noWrap>
              <TextField label="Zip code" maxLength={5} width={24} />
              <TextField label="City" />
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
          </Stack>
        </Card>
      </Stack>
      <Stack space="related">
        <Headline level="3">Payment Information</Headline>
        <Card space="peer">
          <TextField label="Cardholder Name" />
          <TextField label="Card Number" maxLength={19} />
          <Inline space="tight" noWrap>
            <TextField label="Expiry Date" placeholder="MM/YY" width={24} />
            <TextField label="CVV" maxLength={4} width={20} />
          </Inline>
        </Card>
      </Stack>
    </Stack>
  );
};
