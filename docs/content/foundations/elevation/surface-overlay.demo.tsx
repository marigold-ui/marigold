import { Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <div className="util-surface-overlay rounded-lg p-4">
        <Headline level={3}>I should be a Popover!</Headline>
        <p>
          Overlay is the highest elevation available. It is reserved for a UI
          that sits over another UI, such as modals, dialogs, dropdown menus,
          floating toolbars, and floating single-action buttons.
        </p>
        <Link
          href="https://atlassian.design/foundations/elevation/#overlay"
          target="blank"
        >
          source
        </Link>
      </div>
    </div>
  );
};
