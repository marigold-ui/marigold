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
  if ((figma || github || edit) === undefined) {
    return;
  }
  return (
    <Inline space="medium-1">
      <Link target="blank" href={figma}>
        <FigmaIcon />
      </Link>
      <Link target="blank" href={github}>
        <GithubIcon />
      </Link>
      <Link target="blank" href={edit}>
        <Edit />
      </Link>
    </Inline>
  );
};
