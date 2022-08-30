import { Box } from '@marigold/system';
import { Link } from './Link';

export const FigmaLink = ({ href }: { href: URL }) => (
  <Box
    css={{
      border: '2px solid',
      borderColor: 'background.light',
      borderRadius: '10px',
      textAlign: 'center',
      width: 'max-content',
      ml: 'auto',
      bg: '#FFF',
      mb: 'small-1',
      mt: '-2rem',
      '&:hover': {
        borderColor: 'brand.secondary',
      },
    }}
  >
    <Link variant="figma" target="blank" href={href}>
      View in Figma
    </Link>
  </Box>
);
