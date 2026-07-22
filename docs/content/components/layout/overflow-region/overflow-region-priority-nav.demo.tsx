import { Button, Menu, OverflowRegion } from '@marigold/components';
import { DemoResizer } from '@/ui/DemoResizer';

const links = ['Dashboard', 'Events', 'Orders', 'Reports', 'Settings', 'Team'];

// Priority+ navigation: the region hides trailing links as space runs out.
// Since priority is DOM order, `links.slice(visibleCount)` is exactly the
// hidden set — feed it to the "More" menu so every page stays reachable.
export default () => (
  <DemoResizer defaultWidth={400}>
    <nav aria-label="Main">
      <OverflowRegion
        indicator={({ visibleCount }) => (
          <Menu label="More" aria-label="More pages">
            {links.slice(visibleCount).map(link => (
              <Menu.Item key={link} id={link}>
                {link}
              </Menu.Item>
            ))}
          </Menu>
        )}
      >
        {links.map(link => (
          <Button key={link} variant="ghost">
            {link}
          </Button>
        ))}
      </OverflowRegion>
    </nav>
  </DemoResizer>
);
