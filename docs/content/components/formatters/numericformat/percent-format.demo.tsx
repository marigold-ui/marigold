import { NumericFormat } from '@marigold/system';

export default () => (
  <NumericFormat
    styleFormat="percent"
    value={0.7333}
    minimumFractionDigits={2}
  />
);
