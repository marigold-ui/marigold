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

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <ThemeProvider theme={coreTheme}>
    <Stack space={5}>
      <FieldGroup labelWidth="250px">
        <Stack space={1}>
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
        <Stack space={1}>
          <TextField label="Straße" />
          <FieldBase label="PLZ / Ort">
            <Inline space={1}>
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
        <Stack space={1}>
          <TextField type="tel" label="Telefon" />
          <TextField label="Fax" />
          <TextField type="email" label="E-Mail" />
        </Stack>
        <Stack space={1}>
          {/* This shouldn't be used, we need to fix it */}
          <FieldBase label="nach Kundennummern suchen">
            <Inline space={1}>
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
        <Stack space={1}>
          <TextField label="Buchungszeichen" />
          <TextArea label="Bestellbemerkung" description="noch 1000 Zeichen" />
        </Stack>
        <Inline space={2} alignX="center">
          <Button variant="primary" type="submit">
            Speichern
          </Button>
          <Button variant="link">| Zurück</Button>
        </Inline>
      </FieldGroup>
    </Stack>
  </ThemeProvider>
);
