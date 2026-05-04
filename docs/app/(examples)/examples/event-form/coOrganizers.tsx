'use client';

import { useState } from 'react';
import type { Key } from '@react-types/shared';
import {
  Badge,
  Link,
  Panel,
  Stack,
  Switch,
  Tag,
  TagField,
  Text,
} from '@marigold/components';

interface Partner {
  id: string;
  name: string;
}

const ORG_DEFAULT_PARTNERS: Partner[] = [
  { id: 'goethe', name: 'Goethe-Institut Freiburg' },
  { id: 'stadt-freiburg', name: 'Stadt Freiburg' },
];

const PARTNER_POOL: Partner[] = [
  { id: 'theater-fr', name: 'Theater Freiburg' },
  { id: 'uni-fr', name: 'Universität Freiburg' },
  { id: 'stadtwerke', name: 'Stadtwerke Freiburg' },
  { id: 'kulturboerse', name: 'Freiburger Kulturbörse' },
  { id: 'oberrhein', name: 'Zentrum Oberrhein' },
];

export const CoOrganizers = () => {
  const [selected, setSelected] = useState<Key[]>([]);

  return (
    <Panel variant="master" headingLevel={3} size="form">
      <Panel.Header>
        <Panel.Title>Co-presenters</Panel.Title>
        <Panel.Description>
          Partner organizations credited on the event page and tickets.
        </Panel.Description>
        <Panel.HeaderActions>
          <Badge variant="master">Master</Badge>
        </Panel.HeaderActions>
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
          <Panel.CollapsibleTitle>Add to this event</Panel.CollapsibleTitle>
          <Panel.CollapsibleDescription>
            Pick partners that co-present just this event.
          </Panel.CollapsibleDescription>
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
