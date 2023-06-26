import { Inline, XLoader } from '@marigold/components';

export const XLoaderWithProps = () => (
  <Inline space="medium">
    <XLoader fill="primary" size={100} />
    <XLoader fill="secondary" size={100} />
    <XLoader fill="black" size={100} />
  </Inline>
);
