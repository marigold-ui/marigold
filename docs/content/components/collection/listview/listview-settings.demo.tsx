import { useState } from 'react';
import { Description, ListView, Switch, TextValue } from '@marigold/components';

interface Integration {
  id: string;
  name: string;
  detail: string;
  enabled: boolean;
}

const initialIntegrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    detail: 'Post alerts to #releases',
    enabled: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    detail: 'Sync issues and pull requests',
    enabled: true,
  },
  {
    id: 'jira',
    name: 'Jira',
    detail: 'Create tickets from reports',
    enabled: false,
  },
  {
    id: 'figma',
    name: 'Figma',
    detail: 'Embed design previews',
    enabled: false,
  },
];

export default () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const toggle = (id: string) =>
    setIntegrations(current =>
      current.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );

  return (
    <ListView aria-label="Integrations">
      {integrations.map(integration => (
        <ListView.Item
          key={integration.id}
          id={integration.id}
          textValue={integration.name}
        >
          <TextValue>{integration.name}</TextValue>
          <Description>{integration.detail}</Description>
          <Switch
            aria-label={`Enable ${integration.name}`}
            selected={integration.enabled}
            onChange={() => toggle(integration.id)}
          />
        </ListView.Item>
      ))}
    </ListView>
  );
};
