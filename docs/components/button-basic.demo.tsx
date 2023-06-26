import DemoLiveEditor from '@/DemoLiveEditor';
import { Button } from '@marigold/components/src';

const BasicButton = () => {
  return (
    <DemoLiveEditor
      code={`
<Button>save</Button>
       `}
      scope={{ Button }}
    />
  );
};

export default BasicButton;
