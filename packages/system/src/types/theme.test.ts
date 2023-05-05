import { cva } from 'class-variance-authority';

import { ComponentStyleFunction, Theme, WithSlots } from '.';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva('flex align-center', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'w-10 h-10',
          large: 'w-50 h-50',
        },
      },
    }),
    HelpText: {
      container: cva('inline', {
        variants: {
          variant: {
            primary: 'text-primary-500',
          },
          size: {
            small: 'w-10 h-10',
          },
        },
      }),
      icon: cva('block', {
        variants: {
          variant: {
            primary: 'text-secondary-800',
          },
          size: {
            small: 'w-50 h-50',
          },
        },
      }),
    },
  },
};

test('theme types are defined', () => {
  expect(theme.name).toBeDefined();
  expect(theme.components).toBeDefined();
});

const fn: ComponentStyleFunction<
  'primary' | 'secondary',
  'small' | 'medium',
  { space: 1 | 2 | 3 }
> = props => 'some-string';

test('function is type safe and returns a string', () => {
  expect(fn()).toMatchInlineSnapshot(`"some-string"`);
  expect(fn({ variant: 'primary' })).toMatchInlineSnapshot(`"some-string"`);
  expect(fn({ space: 1 })).toMatchInlineSnapshot(`"some-string"`);
  expect(fn({ variant: 'primary', size: 'small' })).toMatchInlineSnapshot(
    `"some-string"`
  );
  expect(
    fn({ variant: 'secondary', size: 'small', space: 1 })
  ).toMatchInlineSnapshot(`"some-string"`);
  expect(fn({ variant: 'primary', space: 3 })).toMatchInlineSnapshot(
    `"some-string"`
  );
  expect(
    fn({ variant: 'primary', size: 'small', className: 'bg-black' })
  ).toMatchInlineSnapshot(`"some-string"`);
});

test('function throws error if variant and size not exist', () => {
  // @ts-expect-error
  fn({ variant: 'pimary' });

  // @ts-expect-error
  fn({ variants: 'primary' });

  // @ts-expect-error
  fn({ variant: 'primary', sizes: 'small', classNames: 'bg-blue' });
});

const ComponentFn: ComponentStyleFunction<string, string> = cva(
  'flex align-center',
  {
    variants: {
      variant: {
        primary: 'text-primary-500',
        secondary: 'text-secondary-800',
      },
      size: {
        small: 'w-10 h-10',
        large: 'w-50 h-50',
      },
    },
  }
);

test('returns base styles if function has no variant or size', () => {
  expect(ComponentFn()).toMatchInlineSnapshot(`"flex align-center"`);
});

test('returns variant and size styles', () => {
  expect(
    ComponentFn({ variant: 'primary', size: 'small' })
  ).toMatchInlineSnapshot(`"flex align-center text-primary-500 w-10 h-10"`);

  expect(ComponentFn({ variant: 'secondary' })).toMatchInlineSnapshot(
    `"flex align-center text-secondary-800"`
  );

  expect(ComponentFn({ size: 'large' })).toMatchInlineSnapshot(
    `"flex align-center w-50 h-50"`
  );
});

test('allow custom className on component', () => {
  expect(
    ComponentFn({ variant: 'primary', className: 'bg-black' })
  ).toMatchInlineSnapshot(`"flex align-center text-primary-500 bg-black"`);
});

test('components have variants and sizes through theme', () => {
  expect(
    theme.components.Button!({ variant: 'primary', size: 'small' })
  ).toMatchInlineSnapshot(`"flex align-center text-primary-500 w-10 h-10"`);
});

const ComponentFnWithSlots: WithSlots<'container' | 'icon', string, string> = {
  container: cva('inline', {
    variants: {
      variant: {
        primary: 'text-primary-500',
      },
      size: {
        small: 'w-10 h-10',
      },
    },
  }),
  icon: cva('block', {
    variants: {
      variant: {
        primary: 'text-secondary-800',
      },
      size: {
        small: 'w-50 h-50',
      },
    },
  }),
};

test('returns base styles for slots if function has no variant or size', () => {
  expect(ComponentFnWithSlots.container()).toMatchInlineSnapshot(`"inline"`);
  expect(ComponentFnWithSlots.icon()).toMatchInlineSnapshot(`"block"`);
});

test('returns variant and size styles for slots', () => {
  expect(
    ComponentFnWithSlots.container({ variant: 'primary', size: 'small' })
  ).toMatchInlineSnapshot(`"inline text-primary-500 w-10 h-10"`);

  expect(
    ComponentFnWithSlots.icon({ variant: 'secondary' })
  ).toMatchInlineSnapshot(`"block"`);

  expect(
    ComponentFnWithSlots.container({ size: 'large' })
  ).toMatchInlineSnapshot(`"inline"`);
});

test('allow custom className on component for slots', () => {
  expect(
    ComponentFnWithSlots.container({
      variant: 'primary',
      className: 'bg-black',
    })
  ).toMatchInlineSnapshot(`"inline text-primary-500 bg-black"`);
});

test('components with slots have variants and sizes through theme', () => {
  expect(
    theme.components.HelpText?.container!({ variant: 'primary', size: 'small' })
  ).toMatchInlineSnapshot(`"inline text-primary-500 w-10 h-10"`);
  expect(
    theme.components.HelpText?.icon!({ variant: 'primary', size: 'small' })
  ).toMatchInlineSnapshot(`"block text-secondary-800 w-50 h-50"`);
  expect(
    theme.components.HelpText?.icon!({
      variant: 'primary',
      size: 'small',
      className: 'bg-green',
    })
  ).toMatchInlineSnapshot(`"block text-secondary-800 w-50 h-50 bg-green"`);
});
