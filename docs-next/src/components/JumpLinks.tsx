import { Box, Inline } from '@marigold/components';
import { Link } from '../components';

export const JumpLinks = () => {
  return (
    <Box>
      <Inline space="xxlarge">
        <Link variant="outline" href="#props">
          Props
        </Link>
        <Link variant="outline" href="#examples">
          Examples
        </Link>
        <Link variant="outline" href="#do-and-donts">
          Do and Don'ts
        </Link>
      </Inline>
    </Box>
  );
};
