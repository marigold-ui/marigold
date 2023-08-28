import { Footer, Link, List } from '@marigold/components';

export default () => (
  <Footer>
    <List>
      <List.Item>
        <Link href="https://github.com/marigold-ui/marigold/" target="_blank">
          Github
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://github.com/marigold-ui/marigold/issues"
          target="_blank"
        >
          Issues
        </Link>
      </List.Item>
    </List>
  </Footer>
);
