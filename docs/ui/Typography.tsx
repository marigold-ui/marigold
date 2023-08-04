import {
  Card,
  Headline,
  MarigoldProvider,
  Text,
  Table,
  Theme,
  textSize,
  fontWeight,
  textStyle,
  textAlign,
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
                <Table.Cell>
                  <code className="before:content-none after:content-none">
                    {key}
                  </code>
                </Table.Cell>
                <Table.Cell>{value}</Table.Cell>
                <Table.Cell>
                  <Text fontSize={key as keyof typeof textSize}>
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

export const FontWeights = () => {
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
            {Object.entries(fontWeight).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell>
                  <code className="before:content-none after:content-none">
                    {key}
                  </code>
                </Table.Cell>
                <Table.Cell>{value}</Table.Cell>
                <Table.Cell>
                  <Text weight={key as keyof typeof fontWeight}>
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

export const FontStyle = () => {
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
            {Object.entries(textStyle).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell>
                  <code className="before:content-none after:content-none">
                    {key}
                  </code>
                </Table.Cell>
                <Table.Cell>{value}</Table.Cell>
                <Table.Cell>
                  <Text fontStyle={key as keyof typeof textStyle}>
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

export const TextAlign = () => {
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
            {Object.entries(textAlign).map(([key, value]) => (
              <Table.Row key={key}>
                <Table.Cell>
                  <code className="before:content-none after:content-none">
                    {key}
                  </code>
                </Table.Cell>
                <Table.Cell>{value}</Table.Cell>
                <Table.Cell>
                  <Text align={key as keyof typeof textAlign}>
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
