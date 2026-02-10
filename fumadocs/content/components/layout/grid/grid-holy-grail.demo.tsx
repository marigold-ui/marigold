import { Grid } from '@marigold/components';
import { Rectangle } from '@/ui/Rectangle';

export default () => (
  <Grid
    areas={['header header', 'sidebar main', 'footer footer']}
    columns={[1, 4]}
    rows={['80px', 'auto', '80px']}
    height={80}
    space={1}
  >
    <Grid.Area name="header">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Header</div>
      </Rectangle>
    </Grid.Area>
    <Grid.Area name="sidebar">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Sidebar</div>
      </Rectangle>
    </Grid.Area>
    <Grid.Area name="main">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Main</div>
      </Rectangle>
    </Grid.Area>
    <Grid.Area name="footer">
      <Rectangle height="100%">
        <div className="text-text-primary-muted m-auto">Footer</div>
      </Rectangle>
    </Grid.Area>
  </Grid>
);
