import { TextArea } from '@marigold/components';

export default () => (
  <TextArea
    label="Required Textarea with error"
    error
    errorMessage="Oh no, we have an error!"
  />
);
