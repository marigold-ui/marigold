import { PanelRightClose } from 'lucide-react';
import { Button, SearchField, TopNavigation } from '@marigold/components';

export default () => (
  <TopNavigation>
    <TopNavigation.Start>
      <Button variant="icon">
        <PanelRightClose />
      </Button>
    </TopNavigation.Start>
    <TopNavigation.Middle aria-label="Search" alignX="center">
      <SearchField placeholder="Search..." />
    </TopNavigation.Middle>
    <TopNavigation.End>
      <Button variant="secondary" size="small">
        Sign in
      </Button>
    </TopNavigation.End>
  </TopNavigation>
);
