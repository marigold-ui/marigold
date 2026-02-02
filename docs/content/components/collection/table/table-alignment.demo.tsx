import { Table, Text } from '@marigold/components';
import { NumericFormat } from '@marigold/system';

export default () => {
  const products = [
    { id: '1', name: 'Laptop', quantity: 5, price: 1299.99 },
    { id: '2', name: 'Mouse', quantity: 23, price: 29.99 },
    { id: '3', name: 'Keyboard', quantity: 12, price: 89.5 },
  ];

  return (
    <Table aria-label="Product inventory">
      <Table.Header>
        <Table.Column align="left">Product</Table.Column>
        <Table.Column align="right">Quantity</Table.Column>
        <Table.Column align="right">Price</Table.Column>
      </Table.Header>
      <Table.Body>
        {products.map(product => (
          <Table.Row key={product.id}>
            <Table.Cell align="left">
              <Text weight="medium">{product.name}</Text>
            </Table.Cell>
            <Table.Cell align="right">{product.quantity}</Table.Cell>
            <Table.Cell align="right">
              <NumericFormat
                style="currency"
                currency="USD"
                value={product.price}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
