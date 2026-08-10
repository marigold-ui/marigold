import { Button } from '@marigold/components';

const MyCard = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const TestApp = () => (
  <MyCard>
    <Button onPress={() => {}}>OK</Button>
  </MyCard>
);

export default TestApp;
