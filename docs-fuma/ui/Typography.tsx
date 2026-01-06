import { ruiTheme } from '@/theme';
import {
  Headline,
  MarigoldProvider,
  Table,
  Text,
  fontWeight,
  textAlign,
  textSize,
  textStyle,
} from '@/ui';

export const Headlines = () => {
  const headline = ruiTheme.components?.Headline?.variants;

  if (!headline) {
    return null;
  }

  return (
    <Table aria-labelledby="typography table" stretch>
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
              <div>
                <MarigoldProvider theme={ruiTheme}>
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
  );
};

export const FontSizes = () => {
  return (
    <Table aria-labelledby="typography table" stretch>
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
  );
};

export const FontWeights = () => {
  return (
    <Table aria-labelledby="typography table" stretch>
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
  );
};

export const FontStyle = () => {
  return (
    <Table aria-labelledby="typography table" stretch>
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
  );
};

export const TextAlign = () => {
  return (
    <Table aria-labelledby="typography table" stretch>
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
  );
};
