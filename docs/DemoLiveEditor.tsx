import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
type Props = {
  noInline?: boolean;
  code: string;
  scope?: Record<string, unknown>;
};

const LiveDemoEditor = ({ noInline = false, code, scope }: Props) => {
  return (
    <LiveProvider scope={scope} code={code.trim()} noInline={noInline}>
      <div className="flex">
        <LiveEditor />
        <LivePreview />
      </div>
      <LiveError />
    </LiveProvider>
  );
};

export default LiveDemoEditor;
