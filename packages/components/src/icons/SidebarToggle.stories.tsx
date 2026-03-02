import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { SidebarToggle } from './SidebarToggle';

const meta = preview.meta({
  title: 'Icon/SidebarToggle',
  component: SidebarToggle,
});

export const Showcase = meta.story({
  render: () => {
    const [expanded, setExpanded] = useState(true);

    return (
      <div className="p-8">
        <Stack space="6">
          <Button onPress={() => setExpanded(prev => !prev)}>
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
          <div className="flex items-center gap-8">
            <SidebarToggle expanded={expanded} size={32} strokeWidth={1.5} />
          </div>
        </Stack>
      </div>
    );
  },
});
