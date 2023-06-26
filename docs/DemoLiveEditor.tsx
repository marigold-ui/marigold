import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Button } from './components';

type Props = {
  noInline?: boolean;
  code: string;
  scope?: Record<string, unknown>;
};

const DemoLiveEditor = ({ noInline = false, code, scope }: Props) => {
  return (
    <LiveProvider scope={scope} code={code} noInline={noInline}>
      <div className="grid gap-4 lg:grid-cols-2">
        <LiveEditor className="font-mono" />
        <div className="rounded-md bg-white p-2">
          <LivePreview />
        </div>
      </div>
      <LiveError className="mt-2 bg-red-100 text-red-800" />
    </LiveProvider>
  );
};

export default DemoLiveEditor;
