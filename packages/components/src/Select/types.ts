import { ListState } from '@react-stately/list';

export type ReactRef<T> =
  | React.RefObject<T>
  | React.MutableRefObject<T>
  | React.Ref<T>;
export type As<Props = any> = React.ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type HTMLNextUIProps<
  T extends As = 'div',
  OmitKeys extends keyof any = never,
> = Omit<PropsOf<T>, 'ref' | 'color' | 'slot' | OmitKeys> & {
  as?: As;
};

export type UseListboxItemProps<T extends object> = Props<T> &
  Omit<HTMLNextUIProps<'li'>, keyof Props<T>>;

export interface ListboxItemProps<T extends object = object>
  extends UseListboxItemProps<T> {}

interface Props<T> extends Omit<HTMLNextUIProps<'ul'>, 'children'> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the listbox.
   */
  state?: ListState<T>;
  /**
   * The listbox items variant.
   */
  variant?: ListboxItemProps['variant'];
  /**
   * The listbox items color.
   */
  //   color?: ListboxItemProps['color'];
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The menu items classNames.
   */
  //   itemClasses?: ListboxItemProps['classNames'];
}
// export interface ListboxProps extends UseListboxProps {}
