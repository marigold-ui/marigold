import { Card, Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="m-auto w-96">
      <div className="bg-bg-surface-sunken shadow-surface-sunken rounded-xl p-2">
        I'm sunken
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
