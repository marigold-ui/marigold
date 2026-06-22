import { createContext } from 'react';

export interface SegmentedControlContextProps {
  variant?: string;
  size?: string;
  expandWidth?: boolean;
}

export const SegmentedControlContext =
  createContext<SegmentedControlContextProps>({});
