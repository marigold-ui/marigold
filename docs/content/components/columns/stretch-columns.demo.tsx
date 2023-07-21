import { Columns, Stack } from '@marigold/components';

export default () => (
  <div>
    <Stack space={4}>
      <div className="bordder h-96 rounded-xl border-slate-300/50 bg-slate-500/50 p-3">
        <Columns columns={[4, 4, 4]} space={2} stretch>
          <div className="bordder h-full rounded-xl border-slate-300/50 bg-slate-500/50 p-3">
            I have a height set to 100%!
          </div>
          <div>I space myself</div>
          <div className="bordder h-52 rounded-xl border-slate-300/50 bg-slate-500/50 p-3">
            I have a height set to 200px.
          </div>
        </Columns>
      </div>
      <Columns columns={[2, 1]} space={2}>
        <div>
          Columns will stretch if they get longer, like a regular CSS element.
        </div>
        <div>I am here too!</div>
      </Columns>
    </Stack>
  </div>
);
