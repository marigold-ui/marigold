import { Grid } from '@marigold/components';

const Block = ({ title }: { title: string }) => (
  <div className="size-full content-center bg-black/50 text-center text-base font-bold text-white">
    {title}
  </div>
);

export default () => (
  <Grid
    areas={['header header', 'sidebar main', 'footer footer']}
    columns={[1, 4]}
    rows={['80px', 'auto', '80px']}
    height={80}
    space={1}
  >
    <Grid.Area name="header">
      <Block title="header" />
    </Grid.Area>
    <Grid.Area name="sidebar">
      <Block title="sidebar" />
    </Grid.Area>
    <Grid.Area name="main">
      <Block title="main" />
    </Grid.Area>
    <Grid.Area name="footer">
      <Block title="footer" />
    </Grid.Area>
  </Grid>
);
