import { TextArea } from '@marigold/components';

export const ErrorTextArea = () => (
  <TextArea
    label="Required Textarea with error"
    error
    errorMessage="Oh no, we have an error!"
  />
);
