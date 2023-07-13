import { ReactNode } from 'react';
import { registry } from '@/lib/registry';

export interface ComponentDemoProps {
  name: string;
  source: string;
  children?: ReactNode;
}

export const ComponentDemo = ({
  name,
  source,
  children,
}: ComponentDemoProps) => {
  const Demo = registry[name];

  return (
    <div className="bg-cyan-800 p-10 text-cyan-100">
      <pre>
        <code className="language-tsx">{source}</code>
      </pre>
      <hr />
      <div>{children}</div>
      <div>
        <Demo />
      </div>
    </div>
  );
};
