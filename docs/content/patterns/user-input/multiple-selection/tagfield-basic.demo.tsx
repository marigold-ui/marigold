import { TagField } from '@marigold/components';

export default () => (
  <TagField
    label="Ticket Categories"
    placeholder="Select categories..."
    disabledKeys={['backstage']}
  >
    <TagField.Option id="general">General Admission</TagField.Option>
    <TagField.Option id="vip">VIP Experience</TagField.Option>
    <TagField.Option id="backstage">Backstage Pass</TagField.Option>
    <TagField.Option id="early">Early Bird Special</TagField.Option>
  </TagField>
);
