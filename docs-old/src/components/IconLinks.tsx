import { Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';
import { FigmaIcon, GithubIcon } from './Icons';
import { Link } from './Link';

interface IconLinksListProps {
  figma?: string;
  github?: string;
  edit?: string;
}

export const IconLinksList = ({ figma, github, edit }: IconLinksListProps) => {
  return (
    <Inline space="medium-1">
      {figma && (
        <Link variant="icon" target="blank" href={figma}>
          <FigmaIcon />
        </Link>
      )}
      {github && (
        <Link variant="icon" target="blank" href={github}>
          <GithubIcon />
        </Link>
      )}
      {edit && (
        <Link variant="icon" target="blank" href={edit}>
          <Edit />
        </Link>
      )}
    </Inline>
  );
};
