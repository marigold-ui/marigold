import { tv } from 'tailwind-variants';

import {
  ComponentStyleFunction,
  ComponentStyleFunctionWithSlots,
  Theme,
} from './types';
import { render } from '@testing-library/react';

const theme: Theme = {
  name: 'test',
  components: {
    Button: tv({
      base: 'flex align-center',
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
    HelpText: tv({
      slots: {
        container: 'block',
        icon: 'inline',
      },
      variants: {
        variant: {
          primary: {
            container: 'text-primary-500',
            icon: 'text-secondary-800',
          },
        },
        size: {
          small: {
            container: 'w-10 h-10',
            icon: 'w-50 h-50',
          },
        },
      },
    }),
  },
};

const ComponentFn: ComponentStyleFunction = tv({
  base: 'flex align-center',
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
});

const ComponentFnWithSlots: ComponentStyleFunctionWithSlots<
  'container' | 'icon'
> = tv({
  slots: {
    container: 'block',
    icon: 'inline',
  },
  variants: {
    variant: {
      primary: {
        container: 'text-primary-500',
        icon: 'text-secondary-800',
      },
    },
    size: {
      small: {
        container: 'w-10 h-10',
        icon: 'w-50 h-50',
      },
    },
  },
});

test('style function always returns "slots" property', () => {
  expect(ComponentFn.slots).toMatchInlineSnapshot(`{}`);

  expect(ComponentFnWithSlots.slots).toMatchInlineSnapshot(`
    {
      "base": undefined,
      "container": "block",
      "icon": "inline",
    }
  `);
});

test('components have variants and sizes', () => {
  expect(ComponentFn.variants).toMatchInlineSnapshot(`
    {
      "size": {
        "large": "w-50 h-50",
        "small": "w-10 h-10",
      },
      "variant": {
        "primary": "text-primary-500",
        "secondary": "text-secondary-800",
      },
    }
  `);

  expect(ComponentFnWithSlots.variants).toMatchInlineSnapshot(`
    {
      "size": {
        "small": {
          "container": "w-10 h-10",
          "icon": "w-50 h-50",
        },
      },
      "variant": {
        "primary": {
          "container": "text-primary-500",
          "icon": "text-secondary-800",
        },
      },
    }
  `);
});

test('theme types are defined', () => {
  expect(theme.name).toBeDefined();
  expect(theme.components).toBeDefined();
});

test('gets classnames from theme via variant and sizes', () => {
  expect(
    theme.components.Button!({ variant: 'primary', size: 'small' })
  ).toMatchInlineSnapshot(`"flex align-center text-primary-500 w-10 h-10"`);

  const helptext = theme.components.HelpText!();

  expect(helptext.container()).toMatchInlineSnapshot(`"block"`);
  expect(helptext.icon()).toMatchInlineSnapshot(`"inline"`);
  expect(helptext.base()).toMatchInlineSnapshot(`""`);
});
