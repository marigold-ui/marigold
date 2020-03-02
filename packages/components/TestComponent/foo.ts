export const sum = (a: number, b: number) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Helpful dev-only error message');
    }
    return a + b;
  };