import { Button, XLoader } from '@/ui';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button variant="primary" onPress={handlePress}></Button>
      {loading ? <XLoader mode="fullsize" /> : null}
    </>
  );
};
