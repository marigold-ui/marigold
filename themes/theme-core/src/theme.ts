import { Theme } from '@marigold/system';
import { colors } from './colors';
import * as components from './components';
// import { badge as Badge } from './components';
// import { button as Button } from './components';
// import { checkbox as Checkbox } from './components';
// import { field as Field } from './components';
// import { helptext as HelpText } from './components';
// import { input as Input } from './components';
// import { label as Label } from './components';
// import { listbox as ListBox } from './components';
// import { select as Select } from './components';
// import { table as Table } from './components';
// import { text as Text } from './components';
// import { underlay as Underlay } from './components';

import { root } from './root';

export const theme: Theme = {
  name: 'core',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  root,
  colors: colors,
  components,
};
