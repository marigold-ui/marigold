import { ReactNode } from 'react';
import { Index } from '../__registry__';

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
  const Demo = Index[name].demo;

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
