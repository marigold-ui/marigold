import { Box } from '@marigold/system';
import { Link } from './Link';
//import { Link, LinkProps } from '@marigold/components';

export const FigmaLink = ({ href, ...props }: { href: URL }) => (
  <>
    <Box
      css={{
        border: '1px solid',
        borderColor: 'border.dark',
        borderRadius: '10px',
        bg: '#FFF',
        '&:hover': {
          borderColor: 'brand.secondary',
        },
      }}
      {...props}
    >
      <Link variant="figma" href={href}>
        Figma
      </Link>
    </Box>
  </>
);
