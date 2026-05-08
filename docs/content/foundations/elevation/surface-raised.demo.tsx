import { Headline, Link } from '@marigold/components';

export default () => {
  return (
    <div className="util-surface-body m-auto w-96">
      <div className="util-surface-sunken rounded-xl p-4">
        <div className="bg-bg-surface-raised shadow-surface-raised rounded-lg p-4">
          <Headline level={3}>Raised</Headline>
          <section>
            <p>
              Raised elevations sit slightly higher than default elevations.
              They are reserved for cards that can be moved, such as Jira issue
              cards and Trello cards. In special circumstances, they can be used
              for cards as a way to provide additional heirarchy or emphasis.
            </p>
            <Link
              href="https://atlassian.design/foundations/elevation/#raised"
              target="blank"
            >
              source
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
