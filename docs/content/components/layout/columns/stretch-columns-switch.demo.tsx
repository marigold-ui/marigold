import { useState } from 'react';

import { Columns, Stack, Switch } from '@marigold/components';

export default () => {
  const [stretch, setStretch] = useState(false);

  return (
    <Stack space={2}>
      <div className="rounded-xl bg-slate-200 p-2">
        <Switch onChange={() => setStretch(!stretch)}>Toggle stretch</Switch>
      </div>
      <div className="h-72 bg-slate-400">
        <Columns columns={[1, 1, 1]} stretch={stretch}>
          <div className="h-40 border border-slate-400 bg-slate-200" />
          <div className="h-40 border border-slate-400 bg-slate-200" />
          <div className="h-full border border-slate-400 bg-slate-200">
            I will grow, if you set <code>stretch</code> prop on the{' '}
            <code>Columns</code>!
          </div>
        </Columns>
      </div>
    </Stack>
  );
};
