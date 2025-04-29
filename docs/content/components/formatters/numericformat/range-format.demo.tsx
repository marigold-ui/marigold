import { NumericFormat } from '@marigold/system';

export default () => (
  <>
    value: <NumericFormat value={[22, 25]} style="unit" unit="celsius" />
  </>
);
