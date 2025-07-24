import { Badge, Inline } from '@marigold/components';

export default () => (
  <Inline space={12} alignX="center">
    <Inline space={2} alignX="center">
      <Badge variant="admin">Admin</Badge>
      <div className="size-6 rounded-lg bg-(--color-access-admin-foreground)" />
      <div className="bg-access-admin size-6 rounded-lg" />
    </Inline>
    <Inline space={2} alignX="center">
      <Badge variant="master">Master</Badge>
      <div className="size-6 rounded-lg bg-(--color-access-master-foreground)" />
      <div className="bg-access-master size-6 rounded-lg" />
    </Inline>
  </Inline>
);
