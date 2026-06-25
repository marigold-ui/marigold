import { SearchField, Toolbar } from '@marigold/components';
import { Download, Share2, Trash2 } from '@marigold/icons';

export default () => (
  <Toolbar aria-label="Report actions">
    <SearchField
      aria-label="Search reports"
      placeholder="Search reports"
      width={56}
    />
    <Toolbar.Separator />
    <Toolbar.Action id="download" label="Download report" icon={<Download />} />
    <Toolbar.Action id="share" label="Share report" icon={<Share2 />} />
    <Toolbar.Action id="delete" label="Delete report" icon={<Trash2 />} />
  </Toolbar>
);
