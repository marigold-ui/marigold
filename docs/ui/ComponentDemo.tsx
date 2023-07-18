import { ReactNode } from 'react';
import { registry } from '../registry';

export interface ComponentDemoProps {
  name: keyof typeof registry;
  source: string;
  children?: ReactNode;
}

export const ComponentDemo = ({
  name,
  source,
  children,
}: ComponentDemoProps) => {
  const Demo = registry[name].demo;

  return (
    <div className="bg-cyan-800 p-10 text-cyan-100">
      <pre>
        <code className="language-tsx">{source}</code>
      </pre>
      <hr />
      <div>
        <Demo />
      </div>
    </div>
  );
};
