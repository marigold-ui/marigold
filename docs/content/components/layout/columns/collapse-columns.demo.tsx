import { Columns } from '@marigold/components';

export default () => (
  <Columns collapseAt="25em" space={1} columns={[2, 10]}>
    <div className="h-28 border border-slate-300 bg-slate-200" />
    <div className="h-28 border border-slate-300 bg-slate-200" />
  </Columns>
);
