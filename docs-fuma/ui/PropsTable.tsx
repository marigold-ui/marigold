import componentProps from '@/lib/.registry/props.json';
import { Inline, Inset, Stack, Text } from '@/ui';
import Md from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlankCanvas } from './icons';

// Helper
// ---------------
const EmptyState = () => (
  <Inline space={2} alignX="center" alignY="center">
    <BlankCanvas />
    <Text>Component does not have any props.</Text>
  </Inline>
);

// Types
// ---------------
export interface PropsTableProps {
  component: string;
}

interface Prop {
  name: string;
  type: {
    name: string;
    value: string;
  };
  defaultValue: {
    value: any;
  };
  description: string;
  required: boolean;
}

// Component
// ---------------
export const PropsTable = ({ component }: PropsTableProps) => {
  const json = (componentProps as any)[component];

  //make the props iterable
  const props = json
    ? Object.entries<Prop>(json).map(element => element[1])
    : [];

  return (
    <div className="border-secondary-200 my-5 divide-y rounded-lg border bg-white/40">
      {
        // eslint-disable-next-line react/prop-types
        props.length ? (
          // eslint-disable-next-line react/prop-types
          props.map(prop => (
            <div
              className="text-text-primary-muted flex flex-col px-3 py-3.5 text-sm"
              key={prop.name}
            >
              <div className="flex flex-wrap items-baseline">
                <code className="border-none bg-transparent text-sm font-semibold before:content-none after:content-none">
                  {prop.name}
                  {prop.required ? '' : '?'}
                </code>
                <div
                  dangerouslySetInnerHTML={{ __html: prop.type.value }}
                  className="text-secondary-600 *:m-0 *:bg-transparent! *:p-0 *:text-xs"
                />
              </div>

              <Stack space={1}>
                {prop.description ? (
                  <div className="text-xs text-pretty *:bg-transparent *:p-0 *:text-xs [&_ul]:pl-4">
                    <Md
                      remarkPlugins={[remarkGfm]}
                      disallowedElements={['p']}
                      unwrapDisallowed
                    >
                      {prop.description}
                    </Md>
                  </div>
                ) : null}
                {prop.defaultValue ? (
                  <Inline space={2} alignY="center">
                    <span className="text-xs">Defaults to: </span>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: prop.defaultValue.value,
                      }}
                      className="*:m-0 *:bg-transparent! *:p-0 *:text-xs"
                    />
                  </Inline>
                ) : null}
              </Stack>
            </div>
          ))
        ) : (
          <Inset space={4}>
            <EmptyState />
          </Inset>
        )
      }
    </div>
  );
};
