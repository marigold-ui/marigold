import { Table, type Theme } from '@marigold/components';
import { BlankCanvas } from './BlankCanvas';
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
    <Table aria-labelledby="apperance table" variant="propsTable">
      <Table.Header>
        <Table.Column key={'property'}>Property</Table.Column>
        <Table.Column key={'type'}>Type</Table.Column>
        <Table.Column key={'description'}>Description</Table.Column>
      </Table.Header>
      {!variants && !sizes ? (
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <BlankCanvas />
            </Table.Cell>
            <Table.Cell>{'-'}</Table.Cell>
            <Table.Cell>
              Sorry! We don't have any variants and sizes jet.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ) : (
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <code>variants</code>
            </Table.Cell>
            <Table.Cell>
              <code>{variants ? variants.join(' | ') : '-'}</code>
            </Table.Cell>
            <Table.Cell>The availible variants of this component</Table.Cell>
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
      )}
    </Table>
  );
};
