import { Inline, XLoader } from '@marigold/components';

export default () => (
  <Inline space={4}>
    <XLoader className="fill-orange-600" size={100} />
    <XLoader size={100} />
    <XLoader className="fill-slate-950" size={100} />
  </Inline>
);
