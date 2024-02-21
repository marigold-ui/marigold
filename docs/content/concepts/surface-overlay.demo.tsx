import { Dialog, Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="m-auto w-96">
      <Dialog aria-labelledby="example">
        <Headline level={3}>Overlay</Headline>
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
      </Dialog>
    </div>
  );
};
