import { Button, Headline } from '@marigold/components';
import * as Icon from '@marigold/icons';

export interface IconListProps {
  title: string;
}

export const IconList = ({ title }: IconListProps) => {
  return (
    <>
      <Headline level="2">{title}</Headline>
      <Button>
        <Icon.ArrowUpA />
      </Button>
    </>
  );
};
