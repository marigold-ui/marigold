import { useState } from 'react';
import { NumericFormat, Stack, Switch, Table } from '@marigold/components';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  { name: 'USB-C Cable', price: 9.19, quantity: 3 },
  { name: 'Wireless Charger', price: 19.95, quantity: 2 },
  { name: 'Bluetooth Speaker', price: 4.51, quantity: 5 },
  { name: 'External Hard Drive', price: 129.99, quantity: 1 },
  { name: 'LED Monitor', price: 199.39, quantity: 2 },
  { name: 'Gaming Mouse', price: 49.87, quantity: 3 },
];

export default () => {
  const [tabular, setTabular] = useState(true);

  return (
    <Stack space={4}>
      <Switch
        label="Use tabular digits"
        selected={tabular}
        onChange={setTabular}
      />

      <Table>
        <Table.Header>
          <Table.Column rowHeader>Product</Table.Column>
          <Table.Column alignX="right">Price</Table.Column>
          <Table.Column alignX="right">Qty</Table.Column>
          <Table.Column alignX="right">Total</Table.Column>
        </Table.Header>
        <Table.Body>
          {products.map(p => (
            <Table.Row key={p.name}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={p.price}
                  style="currency"
                  currency="USD"
                  tabular={tabular}
                />
              </Table.Cell>
              <Table.Cell>
                <NumericFormat value={p.quantity} tabular={tabular} />
              </Table.Cell>
              <Table.Cell>
                <NumericFormat
                  value={p.price * p.quantity}
                  style="currency"
                  currency="USD"
                  tabular={tabular}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
