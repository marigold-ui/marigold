import { Columns } from '@marigold/components';

export default () => (
  <Columns space={1} columns={[2, 8, 2]} collapseAt="25em">
    <div className="h-28 border border-slate-300 bg-slate-200" />
    <div className="h-28 border border-slate-300 bg-slate-200" />
    <div className="h-28 border border-slate-300 bg-slate-200" />
  </Columns>
);
