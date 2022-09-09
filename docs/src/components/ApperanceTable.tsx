import {
  Box,
  Card,
  Inline,
  Table,
  Text,
  type Theme,
} from '@marigold/components';
import { BlankCanvas } from './Icons';
import { useThemeSwitch } from './ThemeSwitch';

export interface ApperanceTableProps {
  component: keyof Theme['components'];
}

export const ApperanceTable = ({ component }: ApperanceTableProps) => {
  const { current, themes } = useThemeSwitch();

  if (!current) {
    return null;
  }

  const styles = themes[current].components[component];
  const variants = styles?.variant ? Object.keys(styles.variant) : null;
  const sizes = styles?.size ? Object.keys(styles.size) : null;

  return (
    <Box css={{ mb: 'medium-2' }}>
      <Card px="medium-1" py="medium-2">
        {!variants && !sizes ? (
          <Inline>
            <BlankCanvas />
            <Text variant="content">
              Sorry! There are currently no variants and sizes availible.
            </Text>
          </Inline>
        ) : (
          <Table aria-labelledby="apperance table" variant="propsTable">
            <Table.Header>
              <Table.Column key={'property'}>Property</Table.Column>
              <Table.Column key={'type'}>Type</Table.Column>
              <Table.Column key={'description'}>Description</Table.Column>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <code>variant</code>
                </Table.Cell>
                <Table.Cell>
                  <code>{variants ? variants.join(' | ') : '-'}</code>
                </Table.Cell>
                <Table.Cell>
                  The availible variants of this component
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <code>size</code>
                </Table.Cell>
                <Table.Cell>
                  <code>{sizes ? sizes.join(' | ') : '-'}</code>
                </Table.Cell>
                <Table.Cell>The availible sizes of this component</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
      </Card>
    </Box>
  );
};

<Card></Card>;
