import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { SidebarToggleIcon } from './SidebarToggleIcon';

const meta = preview.meta({
  title: 'Components/Sidebar',
  component: SidebarToggleIcon,
});

export const ToggleIcon = meta.story({
  render: () => {
    const [expanded, setExpanded] = useState(true);

    return (
      <div className="p-8">
        <Stack space="6" alignX="left">
          <Button onPress={() => setExpanded(prev => !prev)}>
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
          <div className="flex items-center gap-8">
            <SidebarToggleIcon
              expanded={expanded}
              size={32}
              strokeWidth={1.5}
            />
          </div>
        </Stack>
      </div>
    );
  },
});
