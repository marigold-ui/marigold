'use client';

import type { DialogProps } from '@marigold/components';
import {
  Button,
  Columns,
  Dialog,
  Select,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default (props: DialogProps) => (
  <Dialog.Trigger>
    <Button variant="primary">Share</Button>
    <Dialog {...props}>
      <Dialog.Title>Share Document</Dialog.Title>
      <Dialog.Content>
        <Stack space={4}>
          <Text>
            Enter an email to share this document and select their access role.
          </Text>
          <Columns columns={[1, 'fit']} space={2}>
            <TextField label="Email address" type="email" />
            <Select label="Role" width={36} defaultSelectedKey={'view'}>
              <Select.Option id="view">Viewer</Select.Option>
              <Select.Option id="comment">Commentator</Select.Option>
              <Select.Option id="edit">Editor</Select.Option>
            </Select>
          </Columns>
        </Stack>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        <Button variant="primary" slot="close">
          Share
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Dialog.Trigger>
);
