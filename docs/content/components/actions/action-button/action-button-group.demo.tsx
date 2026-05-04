import { Copy, Edit, Trash2 } from 'lucide-react';
import { ActionButton } from '@marigold/components';

export default () => (
  <ActionButton.Group aria-label="Item actions">
    <ActionButton aria-label="Edit">
      <Edit size={16} />
    </ActionButton>
    <ActionButton aria-label="Duplicate">
      <Copy size={16} />
    </ActionButton>
    <ActionButton aria-label="Delete">
      <Trash2 size={16} />
    </ActionButton>
  </ActionButton.Group>
);
