import { createContext } from 'react';

export interface AddonContextValue {
  size?: string;
}

// Set by `LabelAdornment` for the content of a label addon. `Badge` reads it.
export const AddonContext = createContext<AddonContextValue>({});
