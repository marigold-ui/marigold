import { Grid } from '@marigold/components';

export default () => (
  <Grid
    areas={['header header', 'sidebar main', 'footer footer']}
    columns={[1, 4]}
    rows={['80px', 'auto', '80px']}
    height={80}
    space={1}
  >
    <Grid.Slot name="header">
      <div className="size-full bg-slate-600" />
    </Grid.Slot>
    <Grid.Slot name="sidebar">
      <div className="size-full bg-slate-600" />
    </Grid.Slot>
    <Grid.Slot name="main">
      <div className="size-full bg-slate-600" />
    </Grid.Slot>
    <Grid.Slot name="footer">
      <div className="size-full bg-slate-600" />
    </Grid.Slot>
  </Grid>
);
