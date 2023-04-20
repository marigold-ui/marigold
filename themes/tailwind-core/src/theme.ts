import { badge as Badge } from './components';
import { button as Button } from './components';
import { table as Table } from './components';

export const theme = {
  name: 'core',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  components: {
    Badge,
    Button,
    Table,
  },
};
