import { AppLayout } from '@marigold/components';

export default () => (
  <div className="h-[300px] [&>div]:!h-full">
    <AppLayout>
      <AppLayout.Sidebar>
        <div className="bg-secondary-100 flex h-full w-[120px] items-center justify-center text-sm font-medium">
          Sidebar
        </div>
      </AppLayout.Sidebar>
      <AppLayout.Header>
        <div className="bg-secondary-200 flex h-full items-center justify-center text-sm font-medium">
          Header
        </div>
      </AppLayout.Header>
      <AppLayout.Main>
        <div className="space-y-2 p-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="bg-secondary-50 rounded-sm p-3 text-sm">
              Content item {i + 1}
            </div>
          ))}
        </div>
      </AppLayout.Main>
    </AppLayout>
  </div>
);
