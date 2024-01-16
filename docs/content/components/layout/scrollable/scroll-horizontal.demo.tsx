import { Card, Scrollable } from '@marigold/components';

export default () => (
  <Scrollable width="1/2">
    <div className="flex gap-2 p-4">
      <Card>
        <div className="h-[100px] w-[200px]" />
      </Card>
      <Card>
        <div className="h-[100px] w-[200px]" />
      </Card>
      <Card>
        <div className="h-[100px] w-[200px]" />
      </Card>
      <Card>
        <div className="h-[100px] w-[200px]" />
      </Card>
    </div>
  </Scrollable>
);
