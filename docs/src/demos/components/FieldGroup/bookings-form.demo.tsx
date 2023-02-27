import {
  Button,
  FieldGroup,
  Inline,
  Radio,
  TextField,
  ThemeProvider,
  Stack,
  FieldBase,
  Select,
  TextArea,
} from '@marigold/components';

import coreTheme from '@marigold/theme-core';

export const BookingForm = () => (
  <ThemeProvider theme={coreTheme}>
    <Stack space="large">
      <FieldGroup labelWidth="250px">
        <Stack space="xsmall">
          <Radio.Group label="Anrede" defaultValue="3" orientation="horizontal">
            <Radio value="1">Herr</Radio>
            <Radio value="2">Frau</Radio>
            <Radio value="3">keine</Radio>
          </Radio.Group>
          <TextField label="Titel" />
          <TextField label="Vorname" />
          <TextField label="Nachname" />
          <TextField label="Firma" />
        </Stack>
        <Stack space="xsmall">
          <TextField label="Straße" />
          <FieldBase label="PLZ / Ort">
            <Inline space="xsmall">
              <TextField arial-label="PLZ" width="50px" />
              <TextField arial-label="Ort" width="100px" />
            </Inline>
          </FieldBase>
          <TextField label="Adresszusatz" />
          <Select label="Land">
            <Select.Option key={1}>Deutschland</Select.Option>
            <Select.Option key={2}>Schweiz</Select.Option>
            <Select.Option key={3}>Österreich</Select.Option>
          </Select>
        </Stack>
        <Stack space="xsmall">
          <TextField type="tel" label="Telefon" />
          <TextField label="Fax" />
          <TextField type="email" label="E-Mail" />
        </Stack>
        <Stack space="xsmall">
          {/* This shouldn't be used, we need to fix it */}
          <FieldBase label="nach Kundennummern suchen">
            <Inline space="xsmall">
              <TextField arial-label="Search" type="search" width="150px" />
              <Button variant="secondary" size="small">
                Suchen
              </Button>
              <Button variant="secondary" size="small">
                Felder leeren
              </Button>
            </Inline>
          </FieldBase>
          <TextArea
            label="Interne Info zum Kunden"
            description="noch 1000 Zeichen"
          />
        </Stack>
        <Stack space="xsmall">
          <TextField label="Buchungszeichen" />
          <TextArea label="Bestellbemerkung" description="noch 1000 Zeichen" />
        </Stack>
        <Inline space="small" alignX="center">
          <Button variant="primary" type="submit">
            Speichern
          </Button>
          <Button variant="link">| Zurück</Button>
        </Inline>
      </FieldGroup>
    </Stack>
  </ThemeProvider>
);
