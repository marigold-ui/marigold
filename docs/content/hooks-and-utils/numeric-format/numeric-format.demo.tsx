import { NumericFormat } from '@marigold/system';

export default () => (
  <>
    value: <NumericFormat value={123456} maximumSignificantDigits={2} />
  </>
);
