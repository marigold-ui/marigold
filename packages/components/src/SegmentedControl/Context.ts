import { createContext } from 'react';

export interface SegmentedControlContextProps {
  variant?: string;
  size?: string;
  fullWidth?: boolean;
}

export const SegmentedControlContext =
  createContext<SegmentedControlContextProps>({});
