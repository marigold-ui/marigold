import { Card, Inset, MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export default () => (
  <MarigoldProvider theme={theme} className="rounded-lg">
    <Inset p={6}>
      <Card>
        <Card.Content>
          This card sits inside a MarigoldProvider whose root wrapper is styled
          with rounded corners via the className prop.
        </Card.Content>
      </Card>
    </Inset>
  </MarigoldProvider>
);
