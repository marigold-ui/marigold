import { useState } from 'react';
import { Button, Inline } from '@marigold/components';

export default () => {
  const [loadSubmit, setLoadSubmit] = useState<boolean>(false);
  const [loadSave, setLoadSave] = useState<boolean>(false);

  const handlePending = async (action: string) => {
    if (action === 'save') {
      setLoadSave(true);
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 6000));
      } finally {
        setLoadSave(false);
      }
    } else {
      setLoadSubmit(true);
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 2000));
      } finally {
        setLoadSubmit(false);
      }
    }
  };

  return (
    <Inline space={4}>
      <Button
        variant="primary"
        onPress={() => handlePending('save')}
        pending={loadSave}
      >
        {loadSave ? 'Saving' : 'Save'}
      </Button>
      <Button
        variant="primary"
        onPress={() => handlePending('submit')}
        pending={loadSubmit}
      >
        {!loadSubmit && 'Submit'}
      </Button>
    </Inline>
  );
};
