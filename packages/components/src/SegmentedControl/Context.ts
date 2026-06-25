import { createContext } from 'react';

export interface SegmentedControlContextProps {
  variant?: string;
  size?: string;
  stretch?: boolean;
}

export const SegmentedControlContext =
  createContext<SegmentedControlContextProps>({});
