import {
  Checkbox,
  FieldGroup,
  Stack,
  Select,
  TextField,
  ThemeProvider,
  CheckboxGroup,
  Button,
} from '@marigold/components';

import coreTheme from '@marigold/theme-core22';

export const OrganizationSearch = () => {
  return (
    <ThemeProvider theme={coreTheme}>
      <Stack space="large" alignX="center">
        <Stack space="xsmall">
          <FieldGroup labelWidth="300px">
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
              <Checkbox value="1">nur Eigene anzeigen</Checkbox>
              <Checkbox value="2">bilateral anzeigen</Checkbox>
            </CheckboxGroup>
          </FieldGroup>
        </Stack>
        <Button variant="primary" type="submit">
          Suchen
        </Button>
      </Stack>
    </ThemeProvider>
  );
};
