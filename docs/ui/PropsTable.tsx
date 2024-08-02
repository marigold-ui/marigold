import componentProps from '@/registry/props.json';
import { Inline, Stack, Text } from '@/ui';
import { BlankCanvas } from './icons';
import { Markdown } from './mdx';

// Types
// ---------------
export interface PropsTableProps {
  component?: string;
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
  //make the props iterable
  const props =
    component &&
    (Object.entries((componentProps as any)[component]).map(
      element => element[1]
    ) as Prop[]);

  if (!props) {
    return (
      <Inline space={2}>
        <BlankCanvas />
        <Text>Sorry! There are currently no props available.</Text>
      </Inline>
    );
  }

  return (
    <div className="border-secondary-200 divide-y rounded-lg border bg-white/40">
      {props.map(prop => (
        <div
          className="text-text-primary-muted flex flex-col gap-2 px-3 py-3.5 text-sm"
          key={prop.name}
        >
          <Inline space={2} alignY="center">
            <code className="before:content-none after:content-none">
              {prop.name}
              {prop.required ? '' : '?'}
            </code>
            <div
              dangerouslySetInnerHTML={{ __html: prop.type.value }}
              className="*:m-0 *:!bg-transparent *:p-0 *:text-xs"
            />
          </Inline>

          <Stack space={1}>
            <Markdown
              // Reset <code> for now
              className="text-pretty text-xs *:bg-transparent *:p-0 *:text-xs"
              contents={prop.description}
            />
            {prop.defaultValue ? (
              <Inline space={2} alignY="center">
                Defaults to:{' '}
                <div
                  dangerouslySetInnerHTML={{
                    __html: prop.defaultValue.value,
                  }}
                  className="*:m-0 *:!bg-transparent *:p-0 *:text-xs"
                />
              </Inline>
            ) : null}
          </Stack>
        </div>
      ))}
    </div>
  );
};
