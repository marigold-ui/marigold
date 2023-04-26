import './theme.css';
import { Badge } from './components/Badge.style';
import { root } from './root';

export { Badge };

const theme = {
  name: 'unicorn',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  components: { Badge },
  root,
};

export default theme;
