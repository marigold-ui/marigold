import { Columns } from '@marigold/components';

export default () => (
  <Columns space={2} columns={[2, 8, 2]} collapseAt="25em">
    <div className="h-56 border border-slate-300 bg-slate-200 p-1">
      Left Sidebar
    </div>
    <div className="h-56 border border-slate-300 bg-slate-200 p-1">
      Main Content
    </div>
    <div className="h-56 border border-slate-300 bg-slate-200 p-1">
      Right Sidebar
    </div>
  </Columns>
);
