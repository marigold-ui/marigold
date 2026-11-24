# `@marigold/icons`

The icons of [Marigold](https://www.marigold-ui.io), the Reservix design system. The package re-exports every [`lucide-react`](https://lucide.dev/icons/) icon under its Lucide name and adds a few Reservix icons such as `DesignTicket` and `Scanner`.

```sh
pnpm add @marigold/icons
```

```tsx
import { Button } from '@marigold/components';
import { Trash2 } from '@marigold/icons';

<Button variant="destructive">
  <Trash2 /> Delete
</Button>;
```

An icon that is the only content of a control needs an accessible name on that control, for example `<Button size="icon" aria-label="Delete">`.

Which icon to use and how to size it: <https://www.marigold-ui.io/foundations/iconography>, or `npx @marigold/cli docs foundations/iconography`.
