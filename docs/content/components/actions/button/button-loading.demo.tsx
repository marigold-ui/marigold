import { useState } from 'react';
import { Button, Inline } from '@marigold/components';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = async () => {
    setLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 7000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Inline space={4}>
      <Button
        variant="primary"
        onPress={() => handleLoading()}
        loading={loading}
      >
        Save
      </Button>
    </Inline>
  );
};
