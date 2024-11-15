import { useState } from 'react';
import { Button, Inline } from '@marigold/components';

export default () => {
  const [loadSubmit, setLoadSubmit] = useState<boolean>(false);
  const [loadSave, setLoadSave] = useState<boolean>(false);
  const handleSubmit = async () => {
    setLoadSubmit(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
    } finally {
      setLoadSubmit(false);
    }
  };

  const handleSave = async () => {
    setLoadSave(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 6000));
    } finally {
      setLoadSave(false);
    }
  };

  return (
    <Inline space={4}>
      <Button variant="primary" onPress={() => handleSave()} pending={loadSave}>
        {loadSave ? 'Saving' : 'Save'}
      </Button>
      <Button
        variant="primary"
        onPress={() => handleSubmit()}
        pending={loadSubmit}
      >
        {!loadSubmit && 'Submit'}
      </Button>
    </Inline>
  );
};
