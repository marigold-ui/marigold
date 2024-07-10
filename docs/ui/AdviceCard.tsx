import React, { ReactNode } from 'react';

import { Text } from '@marigold/components';

import { cn } from '../../packages/system/dist';

interface Props {
  description: string;
  variant: 'do' | 'dont';
  children: ReactNode;
}

const advice = {
  do: 'DO',
  dont: "DON'T",
};

const checkIcon = (
  <svg
    width="10px"
    height="10px"
    viewBox="0 0 24 24"
    className="bg-bg-success size-5 flex-none rounded-full fill-white p-1"
  >
    <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z"></path>
  </svg>
);

const warningIcon = (
  <svg
    width="10px"
    height="10px"
    viewBox="0 0 24 24"
    className="bg-bg-error size-5 flex-none rounded-full fill-white p-1"
  >
    <path d="M19.8281 5.74868L18.2513 4.17188L12 10.4232L5.74868 4.17188L4.17188 5.74868L10.4232 12L4.17188 18.2513L5.74868 19.8281L12 13.5768L18.2513 19.8281L19.8281 18.2513L13.5768 12L19.8281 5.74868Z"></path>
  </svg>
);

export const AdviceCard = ({ description, variant, children }: Props) => {
  const icon = variant === 'do' ? checkIcon : warningIcon;

  return (
    <div className="border-border border">
      {children}
      <div
        className={cn('flex flex-col gap-2 border-t-4 p-4', {
          'border-bg-error bg-red-50': variant === 'dont',
          'border-bg-success bg-green-50': variant === 'do',
        })}
      >
        <div className="flex items-center gap-1">
          {icon}
          <Text weight="bold">{advice[variant]}</Text>
        </div>
        <Text>{description}</Text>
      </div>
    </div>
  );
};
