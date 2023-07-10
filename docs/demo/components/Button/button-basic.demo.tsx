import LiveDemoEditor from '@/DemoLiveEditor';

export const BasicButton = () => {
  return (
    <LiveDemoEditor
      code={`
      <div className='p-5'>
      <Button>Hello</Button>
      </div>
      `}
    />
  );
};
