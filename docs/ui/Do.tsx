import { Text } from '@marigold/components';

import { Image } from '@/ui/Image';

interface Props {
  img: string;
  description: string;
}

export const Do = ({ description, img }: Props) => {
  return (
    <div className="border-border flex flex-col border">
      <Image width={700} height={900} src={img} alt="best practice" />
      <div className="border-bg-success flex flex-col gap-2 border-t-8 bg-green-50 p-3">
        <div className="flex items-center gap-2">
          <svg
            width="10px"
            height="10px"
            viewBox="0 0 24 24"
            className="bg-bg-success size-5 flex-none rounded-full fill-white p-1"
          >
            <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z"></path>
          </svg>
          DO
        </div>
        <Text>{description}</Text>
      </div>
    </div>
  );
};
