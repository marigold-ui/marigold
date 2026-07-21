import {
  Button,
  Description,
  ListView,
  Switch,
  TextValue,
} from '@marigold/components';
import { X } from '@marigold/icons';

export default () => (
  <ListView aria-label="Notifications">
    <ListView.Item id="build" textValue="Build finished — 2 minutes ago">
      <TextValue>Build finished</TextValue>
      <Description>2 minutes ago</Description>
      <Switch aria-label="Mute this thread" />
      <Button variant="ghost" size="icon" aria-label="Dismiss">
        <X size={'50px'} className="size-4" />
      </Button>
    </ListView.Item>
    <ListView.Item id="deploy" textValue="Deploy succeeded — 1 hour ago">
      <TextValue>Deploy succeeded</TextValue>
      <Description>1 hour ago</Description>
      <Switch aria-label="Mute this thread" />
      <Button size="icon" variant="ghost" aria-label="Dismiss">
        <X />
      </Button>
    </ListView.Item>
    <ListView.Item id="review" textValue="Review requested — yesterday">
      <TextValue>Review requested</TextValue>
      <Description>Yesterday</Description>
      <Switch aria-label="Mute this thread" />
      <Button size="icon" variant="ghost" aria-label="Dismiss">
        <X />
      </Button>
    </ListView.Item>
  </ListView>
);
