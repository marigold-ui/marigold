import {
  Card,
  Headline,
  Inline,
  MarigoldProvider,
  Stack,
  Text,
  Table,
  Theme,
  textSize,
} from '@/ui';
import { useThemeSwitch } from './ThemeSwitch';

export const Headlines = () => {
  const { current, themes } = useThemeSwitch();

  if (!current) {
    return null;
  }

  const headline = themes[current].components.Headline?.variants || undefined;

  if (!headline) {
    return null;
  }

  return (
    <Card>
      <div className="overflow-auto">
        <Table aria-labelledby="typography table" variant="colorTable">
          <Table.Header>
            <Table.Column key={'level'}>Level</Table.Column>
            <Table.Column key={'example'}>Example</Table.Column>
            <Table.Column key={'size'}>Styles</Table.Column>
          </Table.Header>
          <Table.Body>
            {Object.entries(headline?.size).map(([level, value]) => (
              <Table.Row key={level}>
                <Table.Cell>{level}</Table.Cell>
                <Table.Cell>
                  <div data-theme={current}>
                    <MarigoldProvider
                      theme={(current && themes[current]) as Theme}
                    >
                      <div className="align-center flex bg-white">
                        <Headline size={level}>
                          Discover the Beauty of Marigold
                        </Headline>
                      </div>
                    </MarigoldProvider>
                  </div>
                </Table.Cell>
                <Table.Cell>{value?.toString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Card>
  );
};

export const FontSizes = () => {
  return (
    <Card>
      <div className="overflow-auto">
        <Table aria-labelledby="typography table" variant="colorTable">
          <Table.Header>
            <Table.Column key={'name'}>Name</Table.Column>
            <Table.Column key={'value'}>Value</Table.Column>
            <Table.Column key={'example'}>Example</Table.Column>
          </Table.Header>
          <Table.Body>
            {Object.entries(textSize).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
                <Table.Cell>
                  <Text fontSize={key}>
                    Marigolds bloom with vibrant colors.
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Card>
  );
};

export const BorderRadius = () => (
  <Card>
    <Inline space={8}>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded 2px
        </code>
        <div className="h-14 w-full rounded-sm bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded 4px
        </code>
        <div className="h-14 w-full rounded bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-md 6px
        </code>
        <div className="h-14 w-full rounded-md bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-lg 8px
        </code>
        <div className="h-14 w-full rounded-lg bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-xl 12px
        </code>
        <div className="h-14 w-full rounded-xl bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-2xl 16px
        </code>
        <div className="h-14 w-full rounded-2xl bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-full 9999px
        </code>
        <div className="h-14 w-full rounded-full bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
    </Inline>
  </Card>
);
