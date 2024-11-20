import { useState } from 'react';
import { Button, Inline } from '@marigold/components';

export default () => {
  const [loading, setLoading] = useState<{ submit: boolean; save: boolean }>({
    submit: false,
    save: false,
  });

  const handlePending = async (action: string, delay: number) => {
    setLoading(prev => ({ ...prev, [action]: true }));
    try {
      await new Promise<void>(resolve => setTimeout(resolve, delay));
    } finally {
      setLoading(prev => ({ ...prev, [action]: false }));
    }
  };

  return (
    <Inline space={4}>
      <Button
        variant="primary"
        onPress={() => handlePending('save', 8000)}
        loading={loading.save}
      >
        {loading.save ? 'Saving' : 'Save'}
      </Button>
      <Button
        variant="primary"
        onPress={() => handlePending('submit', 2000)}
        loading={loading.submit}
      >
        {!loading.submit && 'Submit'}
      </Button>
    </Inline>
  );
};
