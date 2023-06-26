import { TextArea } from '@marigold/components';

export const DisabledTextArea = () => (
  <TextArea
    label="Can't touch this"
    placeholder="Placeholder disabled"
    disabled
  />
);
