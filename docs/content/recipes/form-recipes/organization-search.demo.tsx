import {
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  Inline,
  Select,
  Stack,
  TextField,
  ThemeProvider,
} from '@marigold/components';
import ruiTheme from '@marigold/theme-rui';

export default () => {
  return (
    <ThemeProvider theme={ruiTheme} className="w-[500px]">
      <Form>
        <Stack space={4}>
          <Stack space={1}>
            <TextField label="Suche in Veranstaltername / Kontaktadresse" />
            <TextField type="tel" label="Telefon" />
            <TextField label="PLZ" />
            <Select label="Status">
              <Select.Option key={1}>alle</Select.Option>
              <Select.Option key={2}>produktiv</Select.Option>
              <Select.Option key={3}>freigeschaltet</Select.Option>
              <Select.Option key={4}>inaktiv</Select.Option>
              <Select.Option key={5}>gesperrt</Select.Option>
            </Select>
            <Select label="Zahlart">
              <Select.Option key={1}>alle</Select.Option>
              <Select.Option key={2}>Lastschrift</Select.Option>
              <Select.Option key={3}>Auszahlung gesperrt</Select.Option>
              <Select.Option key={4}>
                produktiv / Bankverbindung fehlt
              </Select.Option>
            </Select>
            <CheckboxGroup label>
              <Checkbox value="1" label="nur Eigene anzeigen" />
              <Checkbox value="2" label="bilateral anzeigen" />
            </CheckboxGroup>
          </Stack>
          <Inline alignX="right">
            <Button variant="primary" type="submit">
              Suchen
            </Button>
          </Inline>
        </Stack>
      </Form>
    </ThemeProvider>
  );
};
