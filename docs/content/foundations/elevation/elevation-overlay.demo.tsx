import { Toast } from '@marigold/components';

export default () => (
  <div className="bg-background rounded-xl p-8">
    <Toast
      toast={{
        content: {
          title: 'Event published',
          description: 'Summer Festival is now live.',
          variant: 'success',
        },
        key: 'elevation-demo',
      }}
    />
  </div>
);
