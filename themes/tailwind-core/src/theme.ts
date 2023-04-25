import { badge as Badge } from './components';
import { button as Button } from './components';
import { checkbox as Checkbox } from './components';
import { table as Table } from './components';
import { text as Text } from './components';

import { root } from './root';

export const theme = {
  name: 'core',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  root,
  components: {
    Badge,
    Button,
    Checkbox,
    Table,
    Text,
  },
};
