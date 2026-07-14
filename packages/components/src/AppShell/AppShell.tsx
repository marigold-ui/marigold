import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { Children, isValidElement, use } from 'react';
import { SidebarContext, SidebarProvider } from '../Sidebar/Context';

/**
 * True when a `Sidebar.Rail` sits anywhere in the (static) element tree —
 * two-level mode. Walks `props.children` only, so a rail hidden inside a
 * custom component's render is not detected; compose the rail directly in
 * the shell's tree.
 */
const containsRail = (children: ReactNode): boolean =>
  Children.toArray(children).some(child => {
    if (!isValidElement(child)) return false;
    if (
      (child.type as { __SIDEBAR_RAIL__?: boolean }).__SIDEBAR_RAIL__ === true
    ) {
      return true;
    }
    return containsRail((child.props as { children?: ReactNode }).children);
  });

// Props
// ---------------
type RemovedProps = 'className' | 'style';

export interface AppShellProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  RemovedProps
> {
  /**
   * Default open state for the sidebar on desktop. `<AppShell>` manages the
   * `Sidebar.Provider` internally, so this is the common way to set the
   * sidebar's initial state.
   *
   * For controlled sidebar state (`open` / `onOpenChange`) or to set the
   * sidebar's `variant` / `size`, render your own `<Sidebar.Provider>` around
   * `<AppShell>` — it is detected automatically and used instead of the
   * internal one.
   * @default true
   */
  defaultSidebarOpen?: boolean;
  /**
   * Children of the component. Place `<Sidebar>`, `<TopNavigation>`, and
   * `<Page>` directly as children — each owns its own grid area, so the order
   * does not matter.
   */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

// Component
// ---------------
/**
 * `<AppShell>` is the CSS Grid frame for an application: a full-height sidebar,
 * a top bar, and the page area. It positions `<Sidebar>`, `<TopNavigation>`,
 * and `<Page>` via named grid areas and absorbs the `Sidebar.Provider` for the
 * common case.
 */
export const AppShell = ({
  defaultSidebarOpen,
  children,
  ref,
  ...props
}: AppShellProps) => {
  // Detect an outer `Sidebar.Provider`. When present we pass through and let
  // the consumer own sidebar state (controlled open, variant, size); otherwise
  // we absorb the provider so the toggle and the sidebar share state without
  // any boilerplate.
  const hasOuterProvider = use(SidebarContext) !== null;

  // Two-level rail → header-first: the top bar spans the full width (so the
  // brand in it never moves when the panel collapses) and the sidebar hangs
  // below it. Single-column sidebar → sidebar-first: the sidebar owns the full
  // height and the top bar starts to its right.
  const headerFirst = containsRail(children);

  const grid = (
    <div
      ref={ref}
      className={
        headerFirst
          ? "grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[3.5rem_1fr] [grid-template-areas:'header_header'_'sidebar_main']"
          : "grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[3.5rem_1fr] [grid-template-areas:'sidebar_header'_'sidebar_main']"
      }
      {...props}
    >
      {children}
    </div>
  );

  if (hasOuterProvider) {
    return grid;
  }

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>{grid}</SidebarProvider>
  );
};
