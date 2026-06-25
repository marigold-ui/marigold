import { Button, SearchField, Toolbar, Tooltip } from '@marigold/components';
import { Download, Share2, Trash2 } from '@marigold/icons';

export default () => (
  <Toolbar aria-label="Report actions">
    <SearchField
      aria-label="Search reports"
      placeholder="Search reports"
      width={56}
    />
    <Toolbar.Separator />
    <Tooltip.Trigger>
      <Button variant="ghost" size="icon" aria-label="Download report">
        <Download />
      </Button>
      <Tooltip>Download report</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button variant="ghost" size="icon" aria-label="Share report">
        <Share2 />
      </Button>
      <Tooltip>Share report</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button
        variant="destructive-ghost"
        size="icon"
        aria-label="Delete report"
      >
        <Trash2 />
      </Button>
      <Tooltip>Delete report</Tooltip>
    </Tooltip.Trigger>
  </Toolbar>
);
