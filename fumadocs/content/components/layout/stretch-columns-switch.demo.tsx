import { useState } from 'react';
import { Columns, Stack, Switch } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => {
  const [stretch, setStretch] = useState(false);

  return (
    <Stack space={2}>
      <Switch label="Toggle stretch" onChange={() => setStretch(!stretch)} />
      <div className="h-80">
        <Columns columns={[1, 1, 1]} space={2} stretch={stretch}>
          <Rectangle height="150px" width="100%" />
          <Rectangle height="150px" width="100%" />
          <Rectangle height="100%" width="100%">
            <div className="text-text-primary-muted p-2">
              I will grow, if you set <code>stretch</code> prop on the{' '}
              <code>Columns</code>!
            </div>
          </Rectangle>
        </Columns>
      </div>
    </Stack>
  );
};
