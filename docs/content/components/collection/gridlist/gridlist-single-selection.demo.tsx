import { useState } from 'react';

import { GridList } from '@marigold/components';

export default () => {
  const [paymentMethod, setPaymentMethod] = useState(new Set(['bankTransfer']));
  return (
    <>
      <GridList
        selectionMode="single"
        aria-labelledby="PaymentMethodGridList"
        onChange={setPaymentMethod}
        selectedKeys={paymentMethod}
      >
        <GridList.Item id="creditCard">Credit Card</GridList.Item>
        <GridList.Item id="debitCard">Debit Card</GridList.Item>
        <GridList.Item id="bankTransfer">Bank Transfer</GridList.Item>
        <GridList.Item id="paypal">PayPal</GridList.Item>
      </GridList>
      Current Payment is: {paymentMethod}
    </>
  );
};
