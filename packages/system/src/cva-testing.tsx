import { cva } from 'class-variance-authority';

const s = cva([], {
  variants: {
    variant: {
      foo: '',
    },
    size: {},
    space: {
      1: '',
      2: '',
      3: '',
      4: '',
    },
  },
});

s({ space: 1 });
