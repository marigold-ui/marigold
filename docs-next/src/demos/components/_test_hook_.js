import { useState } from 'react';

export const TestHook = () => {
  const [setCount, count] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Counter: {count}</button>;
};
