import { GridList } from '@marigold/components';

export default () => (
  <GridList
    selectionMode="single"
    selectionBehavior="toggle"
    aria-labelledby="PaymentMethodGridList"
  >
    <GridList.Item id="creditCard">Credit Card</GridList.Item>
    <GridList.Item id="debitCard">Debit Card</GridList.Item>
    <GridList.Item id="bankTransfer">Bank Transfer</GridList.Item>
    <GridList.Item id="paypal">PayPal</GridList.Item>
  </GridList>
);
