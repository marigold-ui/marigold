import { Link } from '@marigold/components';

export default () => {
  return (
    <div className="bg-bg-surface shadow-surface m-auto w-96">
      <p>I'm surface default and fill out the whole page</p>

      <Link
        href="https://atlassian.design/foundations/elevation/#default"
        target="blank"
      >
        read more about me here
      </Link>
    </div>
  );
};
