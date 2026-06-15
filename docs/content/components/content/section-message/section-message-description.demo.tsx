import { SectionMessage } from '@marigold/components';

export default () => (
  <SectionMessage variant="success">
    <SectionMessage.Title>Backup completed</SectionMessage.Title>
    <SectionMessage.Description>
      All files were copied to the archive.
    </SectionMessage.Description>
    <SectionMessage.Content>
      The next scheduled backup runs tonight at 2 am. You can change the
      schedule in the backup settings.
    </SectionMessage.Content>
  </SectionMessage>
);
