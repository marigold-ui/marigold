import { Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';
import { Box } from '@marigold/system';
import { FigmaIcon, GithubIcon } from './Icons';
import { Link } from './Link';

export const IconLinksList = ({ href }: { href: URL }) => (
  <Inline space="medium-1">
    <Link target="blank" href={href}>
      <FigmaIcon />
    </Link>
    <Link target="blank" href={href}>
      <GithubIcon />
    </Link>
    <Link target="blank" href={href}>
      <Edit />
    </Link>
  </Inline>
);
