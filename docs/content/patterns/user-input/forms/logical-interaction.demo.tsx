import { Key, useState } from 'react';
import {
  Button,
  Panel,
  Select,
  Stack,
  TextArea,
  Title,
} from '@marigold/components';

export default () => {
  const [reason, setReason] = useState<Key | null>(null);

  return (
    <Panel size="form">
      <Panel.Header>
        <Title>Cancel subscription</Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space={4}>
          <Select
            label="Reason"
            placeholder="Select a reason..."
            description="Help us improve by telling us why you're leaving."
            onChange={setReason}
          >
            <Select.Option id="price">Too expensive</Select.Option>
            <Select.Option id="missing-feature">
              Missing a feature
            </Select.Option>
            <Select.Option id="not-using">Not using it enough</Select.Option>
            <Select.Option id="other">Other</Select.Option>
          </Select>
          {reason === 'other' && (
            <TextArea label="Tell us more" rows={3} required />
          )}
        </Stack>
      </Panel.Content>
      <Panel.Footer>
        <Button variant="primary" type="submit">
          Cancel subscription
        </Button>
      </Panel.Footer>
    </Panel>
  );
};
