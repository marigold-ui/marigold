import { GridList } from '@marigold/components';

export default () => (
  <GridList aria-labelledby="GridList" disabledKeys={['T012']}>
    <GridList.Item id="T123">Ticket 123</GridList.Item>
    <GridList.Item id="T456">Ticket 456</GridList.Item>
    <GridList.Item id="T789">Ticket 789</GridList.Item>
    <GridList.Item id="T012">Ticket 012</GridList.Item>
  </GridList>
);
