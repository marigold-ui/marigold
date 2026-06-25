import { Button, SearchField, Toolbar } from '@marigold/components';

const actions = ['Export', 'Duplicate', 'Archive', 'Share', 'Delete'];

export default () => (
  // A narrow container so the trailing actions have to collapse. In a real
  // layout the toolbar simply fills the space it is given.
  <div style={{ maxWidth: 440 }}>
    <Toolbar aria-label="Document actions">
      <SearchField aria-label="Search" placeholder="Search" width={40} />
      <Toolbar.Separator />
      {actions.map(label => (
        <Button key={label}>{label}</Button>
      ))}
    </Toolbar>
  </div>
);
