import { ActionMenu } from '@marigold/components';

export default () => (
  <ActionMenu aria-label="Filial-Aktionen">
    <ActionMenu.Item id="edit">Bearbeiten</ActionMenu.Item>
    <ActionMenu.Section title="Master-Aktionen">
      <ActionMenu.Item id="move" variant="master">
        Verschieben
      </ActionMenu.Item>
      <ActionMenu.Item id="tse" variant="master">
        TSE anbinden
      </ActionMenu.Item>
      <ActionMenu.Item id="delete" variant="master">
        Löschen
      </ActionMenu.Item>
    </ActionMenu.Section>
    <ActionMenu.Section title="Admin-Aktionen">
      <ActionMenu.Item id="release" variant="admin">
        Freigeben
      </ActionMenu.Item>
    </ActionMenu.Section>
  </ActionMenu>
);
