import { useState } from 'react';
import { Button } from '@marigold/components';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant="primary" onPress={() => handleSubmit()} pending={loading}>
      {loading ? 'Saving' : 'Save'}
    </Button>
  );
};
