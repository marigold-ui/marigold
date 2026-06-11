'use client';

// Controlled building blocks for the report builder. All three prototype
// variants (form page, wizard, combined screen) compose these sections, so
// the parameter UX stays identical while the flow around it changes.
import { parseDate } from '@internationalized/date';
import { useState } from 'react';
import {
  Button,
  DatePicker,
  Description,
  Dialog,
  Inline,
  Menu,
  Radio,
  Select,
  Stack,
  TagField,
  Text,
  TextField,
  TextValue,
  useToast,
} from '@marigold/components';
import { Plus, X } from '@marigold/icons';
import type {
  BreakdownKey,
  DateBasisKey,
  DatePresetKey,
  FilterKey,
  ReportParams,
  TimeBreakdownKey,
} from './domain';
import {
  breakdownGroups,
  dateBasisOptions,
  datePresets,
  defaultParams,
  filterDefinitions,
  reportName,
  timeBreakdowns,
} from './domain';
import { saveTemplate } from './store';
import { useTemplates } from './useReports';

// Draft state
// ---------------

export const useDraftParams = (initial?: ReportParams) => {
  // Lazy clone so editing the draft never mutates the source report/template.
  const [draft, setDraft] = useState<ReportParams>(() =>
    structuredClone(initial ?? defaultParams)
  );

  const update = (patch: Partial<ReportParams>) =>
    setDraft(current => ({ ...current, ...patch }));

  return { draft, update, setDraft } as const;
};

// Auswertung (breakdown)
// ---------------

interface BreakdownSelectProps {
  value: BreakdownKey;
  onChange: (value: BreakdownKey) => void;
}

export const BreakdownSelect = ({ value, onChange }: BreakdownSelectProps) => (
  <Select
    label="Aufschlüsselung"
    description="Bestimmt, worüber der Report eine Zeile ausweist."
    value={value}
    onChange={key => onChange(key as BreakdownKey)}
    width="full"
  >
    {breakdownGroups.map(group => (
      <Select.Section key={group.label} header={group.label}>
        {group.options.map(option => (
          <Select.Option
            key={option.key}
            id={option.key}
            textValue={option.label}
          >
            <TextValue>{option.label}</TextValue>
            <Description>{option.description}</Description>
          </Select.Option>
        ))}
      </Select.Section>
    ))}
  </Select>
);

interface TimeBreakdownSelectProps {
  value: TimeBreakdownKey;
  onChange: (value: TimeBreakdownKey) => void;
}

export const TimeBreakdownSelect = ({
  value,
  onChange,
}: TimeBreakdownSelectProps) => (
  <Select
    label="Zeitverlauf (optional)"
    description="Schlüsselt das Ergebnis zusätzlich nach Zeitraum auf."
    value={value}
    onChange={key => onChange(key as TimeBreakdownKey)}
    width="full"
  >
    {timeBreakdowns.map(option => (
      <Select.Option key={option.key} id={option.key}>
        {option.label}
      </Select.Option>
    ))}
  </Select>
);

// Zeitraum (date basis + range)
// ---------------

interface DateFieldsProps {
  params: Pick<
    ReportParams,
    'dateBasis' | 'datePreset' | 'dateFrom' | 'dateTill'
  >;
  onChange: (patch: Partial<ReportParams>) => void;
}

export const DateBasisRadio = ({ params, onChange }: DateFieldsProps) => (
  <Radio.Group
    label="Datumsbezug"
    value={params.dateBasis}
    onChange={value => onChange({ dateBasis: value as DateBasisKey })}
  >
    {dateBasisOptions.map(option => (
      <Radio key={option.key} value={option.key}>
        {option.label} – {option.description}
      </Radio>
    ))}
  </Radio.Group>
);

export const DateRangeFields = ({ params, onChange }: DateFieldsProps) => (
  <Stack space="regular">
    <Select
      label="Zeitraum"
      value={params.datePreset}
      onChange={key => onChange({ datePreset: key as DatePresetKey })}
      width="full"
    >
      {datePresets.map(preset => (
        <Select.Option key={preset.key} id={preset.key}>
          {preset.label}
        </Select.Option>
      ))}
    </Select>
    {params.datePreset === 'custom' ? (
      <Inline space="related">
        <DatePicker
          label="Von"
          value={params.dateFrom ? parseDate(params.dateFrom) : null}
          onChange={value =>
            onChange({ dateFrom: value ? value.toString() : undefined })
          }
        />
        <DatePicker
          label="Bis"
          value={params.dateTill ? parseDate(params.dateTill) : null}
          onChange={value =>
            onChange({ dateTill: value ? value.toString() : undefined })
          }
        />
      </Inline>
    ) : null}
  </Stack>
);

// Filter (add-on-demand pattern)
// ---------------

interface FilterEditorProps {
  filters: ReportParams['filters'];
  onChange: (filters: ReportParams['filters']) => void;
}

/**
 * Instead of the original "wall of 24 empty selects", filters are added on
 * demand: only filters the user actively picks render a control.
 */
export const FilterEditor = ({ filters, onChange }: FilterEditorProps) => {
  const activeKeys = filterDefinitions
    .map(definition => definition.key)
    .filter(key => key in filters);
  const availableDefinitions = filterDefinitions.filter(
    definition => !(definition.key in filters)
  );

  const addFilter = (key: FilterKey) => onChange({ ...filters, [key]: [] });

  const removeFilter = (key: FilterKey) => {
    const next = { ...filters };
    delete next[key];
    onChange(next);
  };

  const setValues = (key: FilterKey, values: string[]) =>
    onChange({ ...filters, [key]: values });

  return (
    <Stack space="regular">
      {activeKeys.length === 0 ? (
        <Text variant="muted" fontSize="sm">
          Keine Filter gesetzt – der Report umfasst alle Verkäufe im gewählten
          Zeitraum.
        </Text>
      ) : null}

      {activeKeys.map(key => {
        const definition = filterDefinitions.find(d => d.key === key);
        if (!definition) return null;
        const values = filters[key] ?? [];

        return (
          <div key={key} className="grid grid-cols-[1fr_auto] items-end gap-2">
            {definition.single ? (
              <Select
                label={definition.label}
                value={values[0] ?? null}
                onChange={selected =>
                  setValues(key, selected ? [String(selected)] : [])
                }
                width="full"
              >
                {definition.options.map(option => (
                  <Select.Option key={option.id} id={option.id}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <TagField
                label={definition.label}
                value={values}
                onChange={selected => setValues(key, selected.map(String))}
                width="full"
              >
                {definition.options.map(option => (
                  <TagField.Option key={option.id} id={option.id}>
                    {option.label}
                  </TagField.Option>
                ))}
              </TagField>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Filter ${definition.label} entfernen`}
              onPress={() => removeFilter(key)}
            >
              <X size={16} />
            </Button>
          </div>
        );
      })}

      {availableDefinitions.length > 0 ? (
        <Inline>
          <Menu
            label={
              <>
                <Plus size={16} /> Filter hinzufügen
              </>
            }
            onAction={key => addFilter(key as FilterKey)}
          >
            {availableDefinitions.map(definition => (
              <Menu.Item key={definition.key} id={definition.key}>
                {definition.label}
              </Menu.Item>
            ))}
          </Menu>
        </Inline>
      ) : null}
    </Stack>
  );
};

// Vorlagen (templates)
// ---------------

interface TemplateMenuProps {
  onApply: (params: ReportParams) => void;
}

/** Pick a saved template to prefill the builder. */
export const TemplateMenu = ({ onApply }: TemplateMenuProps) => {
  const templates = useTemplates();

  if (templates.length === 0) return null;

  return (
    <Menu
      label="Vorlage verwenden"
      onAction={key => {
        const template = templates.find(t => t.id === key);
        if (template) onApply(structuredClone(template.params));
      }}
    >
      {templates.map(template => (
        <Menu.Item key={template.id} id={template.id}>
          {template.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

/** Save the current draft as a named template (replaces "Profil" presets). */
export const SaveTemplateButton = ({ params }: { params: ReportParams }) => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const suggested = reportName(params);

  const onSave = () => {
    const templateName = name.trim() || suggested;
    saveTemplate(templateName, params);
    addToast({
      title: 'Vorlage gespeichert',
      description: `„${templateName}“ kann beim nächsten Report wiederverwendet werden.`,
      variant: 'success',
      timeout: 6000,
    });
  };

  return (
    <Dialog.Trigger>
      <Button variant="ghost">Als Vorlage speichern</Button>
      <Dialog closeButton>
        <Dialog.Title>Als Vorlage speichern</Dialog.Title>
        <Dialog.Content>
          <Stack space="regular">
            <Text>
              Speichert die aktuelle Auswertung samt Zeitraum und Filtern als
              wiederverwendbare Vorlage.
            </Text>
            <TextField
              label="Name der Vorlage"
              defaultValue={suggested}
              onChange={setName}
            />
          </Stack>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary" slot="close">
            Abbrechen
          </Button>
          <Button variant="primary" slot="close" onPress={onSave}>
            Speichern
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  );
};
