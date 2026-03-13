import { PanelRightClose } from 'lucide-react';
import {
  Button,
  Inline,
  TopNavigation,
  TopNavigationProps,
} from '@marigold/components';

export default (props: TopNavigationProps) => (
  <TopNavigation {...props}>
    <TopNavigation.Start>
      <Button variant="icon">
        <PanelRightClose />
      </Button>
    </TopNavigation.Start>
    <TopNavigation.Middle>
      <Inline space={4}>
        <Button variant="text">Home</Button>
        <Button variant="text">Events</Button>
        <Button variant="text">Settings</Button>
      </Inline>
    </TopNavigation.Middle>
    <TopNavigation.End>
      <Button variant="secondary" size="small">
        Sign in
      </Button>
    </TopNavigation.End>
  </TopNavigation>
);
