import { Inline } from '@marigold/components';
import { Edit } from '@marigold/icons';
import { FigmaIcon, GithubIcon } from './Icons';
import { Link } from './Link';

interface IconLinksListProps {
  figma: URL;
  github: URL;
  edit: URL;
}

export const IconLinksList = ({ figma, github, edit }: IconLinksListProps) => {
  console.log(figma, github, edit);

  return (
    <Inline space="medium-1">
      {figma && (
        <Link target="blank" href={figma}>
          <FigmaIcon />
        </Link>
      )}
      {github && (
        <Link target="blank" href={github}>
          <GithubIcon />
        </Link>
      )}
      {edit && (
        <Link target="blank" href={edit}>
          <Edit />
        </Link>
      )}
    </Inline>
  );
};
