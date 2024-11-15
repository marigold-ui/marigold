import { Card, Scrollable } from '@marigold/components';

export default () => (
  <Scrollable>
    <div className="flex gap-2 p-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index}>
          <div className="h-[100px] w-[200px]" />
        </Card>
      ))}
    </div>
  </Scrollable>
);
