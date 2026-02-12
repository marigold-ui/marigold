import { Card, Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <div className="util-surface-sunken rounded-xl p-4">
        I'm sunken 👋
        <Card>
          <Headline level={3}>Sunken</Headline>
          <section>
            <p>
              Sunken is the lowest elevation available. The sunken surface
              creates a backdrop (or well) where other content sits. Columns on
              a Kanban board are a good example of the sunken elevation.
            </p>
            <Link
              href="https://atlassian.design/foundations/elevation/#sunken"
              target="blank"
            >
              source
            </Link>
          </section>
        </Card>
      </div>
    </div>
  );
};
