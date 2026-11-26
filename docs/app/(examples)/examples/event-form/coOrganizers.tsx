'use client';

import { useState } from 'react';
import type { Key } from '@react-types/shared';
import {
  Description,
  Link,
  Panel,
  Stack,
  Switch,
  Tag,
  TagField,
  Text,
  Title,
} from '@marigold/components';

interface Partner {
  id: string;
  name: string;
}

const ORG_DEFAULT_PARTNERS: Partner[] = [
  { id: 'laughville-arts', name: 'Laughville Arts Council' },
  { id: 'laughville-city', name: 'City of Laughville' },
];

const PARTNER_POOL: Partner[] = [
  { id: 'shakytown-players', name: 'Shakytown Players' },
  { id: 'port-funsies-college', name: 'Port Funsies College' },
  { id: 'hee-haw-utilities', name: 'Hee-Haw City Utilities' },
  { id: 'culture-exchange', name: 'Riverside Culture Exchange' },
  { id: 'harborfront-assoc', name: 'Harborfront Merchants Association' },
];

export const CoOrganizers = () => {
  const [selected, setSelected] = useState<Key[]>([]);

  return (
    <Panel variant="master" size="form">
      <Panel.Header>
        <Title>Co-presenters</Title>
        <Description>
          Partner organizations credited on the event page and tickets.
        </Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="tight">
          <Text weight="medium">Default partners</Text>
          <Text>Inherited from your organization settings.</Text>
          <Tag.Group aria-label="Default partners" items={ORG_DEFAULT_PARTNERS}>
            {(partner: Partner) => <Tag id={partner.id}>{partner.name}</Tag>}
          </Tag.Group>
          <Link href="#" size="small">
            Manage in organization settings
          </Link>
        </Stack>
      </Panel.Content>
      <Panel.Collapsible>
        <Panel.CollapsibleHeader>
          <Title>Add to this event</Title>
          <Description>
            Pick partners that co-present just this event.
          </Description>
        </Panel.CollapsibleHeader>
        <Panel.CollapsibleContent>
          <Stack space="regular">
            <TagField
              label="Partner organizations"
              description="Shown on the event page after the primary organizer."
              placeholder="Search partners..."
              items={PARTNER_POOL}
              value={selected}
              onChange={setSelected}
              width="full"
            >
              {(partner: Partner) => (
                <TagField.Option id={partner.id} textValue={partner.name}>
                  {partner.name}
                </TagField.Option>
              )}
            </TagField>
            <Switch
              variant="settings"
              label="Show co-presenters on event page"
              description="Adds the 'in cooperation with' line to the event page and tickets."
            />
          </Stack>
        </Panel.CollapsibleContent>
      </Panel.Collapsible>
    </Panel>
  );
};
