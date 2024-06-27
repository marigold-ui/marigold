import { Text } from '@marigold/components';

import { Image } from '@/ui/Image';

interface Props {
  img: string;
  description: string;
}

export const Dont = ({ description, img }: Props) => {
  return (
    <div className="border-border flex flex-col border">
      <Image width={700} height={900} src={img} alt="Don't" />
      <div className="border-bg-error flex flex-col gap-2 border-t-8 bg-red-50 p-3">
        <div className="flex items-center gap-2">
          <svg
            width="10px"
            height="10px"
            viewBox="0 0 24 24"
            className="bg-bg-error size-5 flex-none rounded-full fill-white p-1"
          >
            <path d="M19.8281 5.74868L18.2513 4.17188L12 10.4232L5.74868 4.17188L4.17188 5.74868L10.4232 12L4.17188 18.2513L5.74868 19.8281L12 13.5768L18.2513 19.8281L19.8281 18.2513L13.5768 12L19.8281 5.74868Z"></path>
          </svg>
          DO'NT
        </div>
        <Text>{description}</Text>
      </div>
    </div>
  );
};
