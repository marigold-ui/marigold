import './theme.css';
import { Badge } from './components/Badge.style';
import { Theme } from '@marigold/system';

export { Badge };

const theme: Theme = {
  name: 'unicorn',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  components: { Badge },
};

export default theme;
