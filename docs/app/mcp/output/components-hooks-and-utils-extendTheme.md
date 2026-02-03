# extendTheme

_Function used to customize theme components styles._

With `extendTheme` you can add more variants and sizes to these components. It takes in the current theme you pass and returns an updated theme with added styles and configurations.

> ⚠️ Adding new variant: You can only add a new variant to the theme, and you should not
> override variant in the current theme.

## Import

```tsx
import { extendTheme } from '@marigold/system';
```

## Examples

### Customzing the base styles of a component

Here in this example we will customize the background of `Card` component using `extendTheme` function

```tsx title="card-bg"
import { Card, MarigoldProvider } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Card: cva('text-text-base bg-slate-200'),
    },
    currentTheme
  );
  return (
    <MarigoldProvider theme={theme}>
      <Card>Some content</Card>
    </MarigoldProvider>
  );
};
```

### Customzing component with multiple slots

In this example we will style component with slots like `Tabs` component which contains slots such as `container, tab, tabpanel and tabList` .

```tsx title="tabs-slots"
import { MarigoldProvider, Tabs } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Tabs: {
        tabpanel: cva('text-text-base rounded-md bg-slate-200 p-3'),
      },
    },
    currentTheme
  );

  return (
    <MarigoldProvider theme={theme}>
      <Tabs aria-label="tabs" disabledKeys={['private']}>
        <Tabs.List aria-label="User Preferences">
          <Tabs.Item id="profile">profile</Tabs.Item>
          <Tabs.Item id="notifications">notifications</Tabs.Item>
          <Tabs.Item id="private">private</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="profile">
          This panel displays your profile settings. You can upload a profile
          picture, write a brief bio to introduce yourself, and update other
          personal details. Show the world who you are and make a memorable
          impression on other platform users.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="notifications">
          Here, you'll find settings related to notifications. Choose how you
          want to be notified about new messages, friend requests, and other
          important updates. Stay connected and up-to-date with the latest
          activities happening on the platform.
        </Tabs.TabPanel>
        <Tabs.TabPanel id="private">
          The Privacy panel provides options to safeguard your personal
          information and control your privacy. Decide who can view your
          profile, set visibility preferences for your posts and photos, and
          manage your data. Enjoy peace of mind knowing that you have full
          control over your privacy on the platform.
        </Tabs.TabPanel>
      </Tabs>{' '}
    </MarigoldProvider>
  );
};
```

### Adding new variants and sizes to a component

In this example we are adding a new size `medium` and variant `tertiary` to a component

```tsx title="button-variant"
import { Button, MarigoldProvider } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Button: cva('p-3', {
        variants: {
          variant: {
            tertiary: 'text-text-base bg-slate-200',
          },
          size: {
            medium: 'px-6 leading-10',
          },
        },
      }),
    },
    currentTheme
  );
  return (
    <MarigoldProvider theme={theme}>
      <Button size={'medium'} variant={'tertiary'}>
        Click Me
      </Button>
    </MarigoldProvider>
  );
};
```
