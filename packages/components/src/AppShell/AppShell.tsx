import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { use } from 'react';
import { cn } from '@marigold/system';
import { SidebarContext, SidebarProvider } from '../Sidebar/Context';

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

  const grid = (
    <div
      ref={ref}
      // The header row is `auto`: it takes its height from `<TopNavigation>`
      // (`min-h-topbar` via the theme), so the shell never hardcodes it.
      //
      // Single-column sidebar → sidebar-first: the sidebar owns the full
      // height and the top bar starts to its right. Two-level rail (detected
      // in CSS via the aside's `data-rail`) → header-first: the top bar spans
      // the full width — so the brand in it never moves when the panel
      // collapses — and the rail hangs below it.
      className={cn(
        'grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr]',
        "[grid-template-areas:'sidebar_header'_'sidebar_main']",
        "[&:has([data-rail])]:[grid-template-areas:'header_header'_'sidebar_main']"
      )}
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
