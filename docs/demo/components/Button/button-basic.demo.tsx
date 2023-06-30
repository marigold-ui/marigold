import LiveDemoEditor from '@/DemoLiveEditor';
import { Button } from '@marigold/components';

export const BasicButton = () => {
  return (
    <LiveDemoEditor
      scope={{ Button }}
      code={`
            <button className='text-white rounded-lg'>demo button</button>
            `}
    />
  );
};
