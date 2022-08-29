import { Box } from '@marigold/system';
import { Link } from './Link';

export const FigmaLink = ({ href }: { href: URL }) => (
  <Box
    css={{
      border: '2px solid',
      borderColor: 'background.light',
      borderRadius: '10px',
      textAlign: 'center',
      justifySelf: 'end',
      bg: '#FFF',
      mb: 'small-1',
      '&:hover': {
        borderColor: 'brand.secondary',
      },
    }}
  >
    <Link variant="figma" href={href}>
      View in Figma
    </Link>
  </Box>
);
