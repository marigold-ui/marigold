import { useState } from 'react';
import { Button, Loader } from '@marigold/components';

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
      <Button variant="primary" onPress={handlePress}>
        Submit
      </Button>
      {loading ? <Loader mode="fullscreen" /> : null}
    </>
  );
};
