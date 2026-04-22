'use client';

import {
  Button,
  ConfirmationDialog,
  Dialog,
  Inline,
  Panel,
  Stack,
  Text,
  useToast,
} from '@marigold/components';

const actions = [
  {
    id: 'reset',
    label: 'Reset all defaults',
    description:
      'Restores every setting on this page to its factory value. Existing events are not affected.',
    action: 'Reset',
    confirmTitle: 'Reset all defaults?',
    confirmDescription:
      'This will restore every setting to its factory value. Your existing events will not be changed, but all new events will use the default settings.',
    confirmLabel: 'Reset defaults',
    toastMessage: 'All settings have been reset to their defaults.',
  },
  {
    id: 'delete',
    label: 'Delete all draft events',
    description:
      'Permanently removes every unpublished event. Published events and past bookings are not affected.',
    action: 'Delete',
    confirmTitle: 'Delete all draft events?',
    confirmDescription:
      'This will permanently delete every unpublished event. Published events and past bookings are not affected. This action cannot be undone.',
    confirmLabel: 'Delete drafts',
    toastMessage: 'All draft events have been deleted.',
  },
];

export const DangerZone = () => {
  const { addToast } = useToast();

  return (
    <Panel variant="destructive" size="form" headingLevel={3}>
      <Panel.Header>
        <Panel.Title>Danger zone</Panel.Title>
        <Panel.Description>
          Permanent actions that affect your event settings. There's no undo.
        </Panel.Description>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          {actions.map(item => (
            <Inline
              key={item.id}
              alignY="center"
              alignX="between"
              space="group"
            >
              <Stack space="0.5">
                <Text weight="medium">{item.label}</Text>
                <Text size="xs" color="secondary">
                  {item.description}
                </Text>
              </Stack>
              <Dialog.Trigger>
                <Button variant="destructive-ghost">{item.action}</Button>
                <ConfirmationDialog
                  variant="destructive"
                  title={item.confirmTitle}
                  confirmationLabel={item.confirmLabel}
                  onConfirm={() => {
                    addToast({
                      title: item.action + ' complete',
                      description: item.toastMessage,
                      variant: 'success',
                      timeout: 5000,
                    });
                  }}
                >
                  <Text>{item.confirmDescription}</Text>
                </ConfirmationDialog>
              </Dialog.Trigger>
            </Inline>
          ))}
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
