import { ReactNode } from 'react';

export interface ComponentDemoProps {
  name: string;
  children?: ReactNode;
}

export const ComponentDemo = ({ children }: ComponentDemoProps) => {
  // Use React-live
  return <div className="bg-cyan-800 p-10 text-cyan-100">{children}</div>;
};
