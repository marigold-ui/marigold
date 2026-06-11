'use client';

import { useState } from 'react';
import { Button, Inline, Panel, Select, Stack } from '@marigold/components';
import { RotateCcw, Search } from '@marigold/icons';
import { automatedReports, profiles } from './data';

export interface ReportFilterValue {
  profile: string | null;
  automatedReport: string | null;
}

export const emptyFilter: ReportFilterValue = {
  profile: null,
  automatedReport: null,
};

export interface ReportFilterProps {
  onSearch: (filter: ReportFilterValue) => void;
  onReset: () => void;
}

// Draft state lives here; it only becomes the applied filter when the user
// presses "Suchen", so changing a select does not reload the table.
export const ReportFilter = ({ onSearch, onReset }: ReportFilterProps) => {
  const [draft, setDraft] = useState<ReportFilterValue>(emptyFilter);

  const reset = () => {
    setDraft(emptyFilter);
    onReset();
  };

  return (
    <Panel aria-label="Reporte filtern">
      <Panel.Content>
        <Stack space="regular">
          <Inline space="regular" alignY="input">
            <Select
              label="Profil"
              placeholder="Bitte wählen"
              width={72}
              value={draft.profile}
              onChange={key =>
                setDraft({ ...draft, profile: key ? String(key) : null })
              }
            >
              {profiles.map(profile => (
                <Select.Option key={profile} id={profile}>
                  {profile}
                </Select.Option>
              ))}
            </Select>
            <Select
              label="Automatisierter Report"
              placeholder="Bitte wählen"
              width={72}
              value={draft.automatedReport}
              onChange={key =>
                setDraft({
                  ...draft,
                  automatedReport: key ? String(key) : null,
                })
              }
            >
              {automatedReports.map(report => (
                <Select.Option key={report} id={report}>
                  {report}
                </Select.Option>
              ))}
            </Select>
          </Inline>
          <Inline space="related" alignX="right">
            <Button variant="secondary" onPress={reset}>
              <RotateCcw size={16} /> Zurücksetzen
            </Button>
            <Button variant="primary" onPress={() => onSearch(draft)}>
              <Search size={16} /> Suchen
            </Button>
          </Inline>
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
