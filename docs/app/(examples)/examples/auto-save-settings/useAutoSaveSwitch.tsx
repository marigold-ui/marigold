'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, useToast } from '@marigold/components';

const simulateSave = (): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error('Network error'));
      else resolve();
    }, 600);
  });

export const useAutoSaveSwitch = (initial: boolean, label: string) => {
  const [selected, setSelected] = useState(initial);
  const { addToast } = useToast();
  const latestSaveId = useRef(0);

  const save = useCallback(
    async (next: boolean) => {
      const id = ++latestSaveId.current;
      setSelected(next);
      try {
        await simulateSave();
      } catch {
        if (latestSaveId.current !== id) return;
        setSelected(current => (current === next ? !next : current));
        addToast({
          title: "Couldn't save your change",
          description: `We couldn't update "${label}". Check your connection and try again.`,
          variant: 'error',
          action: (
            <Button size="small" variant="primary" onPress={() => save(next)}>
              Try again
            </Button>
          ),
        });
      }
    },
    [addToast, label]
  );

  return { selected, onChange: save };
};
