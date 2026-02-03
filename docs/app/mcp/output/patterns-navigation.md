# Navigation

_How to building a navigation in our applications._

> ⚠️ Under Development: This pattern is currently under development and will change in the future.
> It is an intermediate step that teams can use in preparation for a more
> thorough navigation pattern.

This guideline provides recommendations and considerations for building navigation in Reservix applications. It covers layout structure, component usage, accessibility, and styling approaches that align with our design system. The current pattern is intended for desktop applications and does not yet address mobile navigation.

## Top Navigation

The top navigation is placed at the very top of the application and stretches across the full width of the screen. It sits above all page content and just below any global banner or announcement that might appear. When you scroll down the page, the navigation moves out of view with the rest of the content. It appears again when you scroll back up.

The top navigation consists of the following elements:

- **Container:** A full-width bordered container with padding that wraps all navigation elements.
- **Logo area:** Positioned on the left using `<Inline>`, containing the Reservix or application logo.
- **Navigation links:** A `<Tabs>` component displaying main navigation items such as Home, Settings, and Messages.
- **Spacer:** A `<Split>` component that pushes actions to the far right.
- **Action area:** Contains actions like logout, implemented as a `<Button>` or with a `<Menu>`.

```tsx title="topnavigation"
import { Button, Inline, Split, Tabs } from '@marigold/components';
import { Logout } from '@marigold/icons';
import { Logo } from './Logo';

export default () => (
  <>
    {/* Container */}
    <div className="border-border w-full border-b pt-2 pl-2">
      <Inline space={12}>
        {/* Logo area */}
        <div className="py-2">
          <Logo />
        </div>
        {/* Navigation links */}
        <div className="self-end *:-mb-px">
          <Tabs selectedKey={'home'}>
            <Tabs.List aria-label="Navigation">
              <Tabs.Item id="home" href="https://www.marigold-ui.io">
                Home
              </Tabs.Item>
              <Tabs.Item id="settings" href="https://www.reservix.de">
                Settings
              </Tabs.Item>
              <Tabs.Item id="messages" href="https://www.reservix.net">
                Messages
              </Tabs.Item>
            </Tabs.List>
          </Tabs>
        </div>
        {/* Spacer */}
        <Split />
        {/* Action area */}
        <Inline space={2} alignY="center">
          <Button variant="ghost">
            <Logout size={16} /> Logout
          </Button>
        </Inline>
      </Inline>
    </div>
  </>
);
```
