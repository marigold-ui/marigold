import { ReactNode } from 'react';

export interface ComponentDemoProps {
  name: string;
  source: string;
  children?: ReactNode;
}

export const ComponentDemo = ({ source, children }: ComponentDemoProps) => {
  return (
    <div className="bg-cyan-800 p-10 text-cyan-100">
      <pre>
        <code className="language-tsx">{source}</code>
      </pre>
      <hr />
      <div>{children}</div>
    </div>
  );
};
