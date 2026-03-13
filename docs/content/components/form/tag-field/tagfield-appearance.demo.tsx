import type { TagFieldProps } from '@marigold/components';
import { TagField } from '@marigold/components';

export default (props: TagFieldProps<object>) => (
  <TagField
    {...props}
    label="Genres"
    placeholder="Select genres..."
    width="1/2"
  >
    <TagField.Option id="rock">Rock</TagField.Option>
    <TagField.Option id="jazz">Jazz</TagField.Option>
    <TagField.Option id="pop">Pop</TagField.Option>
    <TagField.Option id="classical">Classical</TagField.Option>
    <TagField.Option id="electronic">Electronic</TagField.Option>
  </TagField>
);
