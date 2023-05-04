import { TVReturnType, tv } from 'tailwind-variants';

const Component = tv({
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

const Slotty = tv({
  slots: {
    container: 'block',
    item: 'inline',
  },
  variants: {
    variant: {
      primary: {
        container: 'text-primary-500',
        item: 'text-secondary-800',
      },
    },
    size: {
      small: {
        container: 'w-10 h-10',
        item: 'w-50 h-50',
      },
    },
  },
});

export type Theme = {
  name: string;
  screens?: { [key: string]: any };
  components: {
    Component?: typeof Component;
    Slotty?: TVReturnType<any, any, any, any, any, any>;
    // [key: string]: TVReturnType<any, any, any, any, any, any> | undefined;
  };
  // ClassValue or TVReturnType or string ???
  root?: TVReturnType<any, any, never, never, any, any>;
  colors?: { [key: string]: any };
};
