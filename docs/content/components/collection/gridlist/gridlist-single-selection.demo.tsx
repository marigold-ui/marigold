import { useState } from 'react';

import { GridList } from '@marigold/components';

export default () => {
  const [paymentMethod, setPaymentMethod] = useState(['bankTransfer']);
  console.log('paymentMethod', paymentMethod);
  return (
    <>
      <GridList
        selectionMode="single"
        selectionBehavior="toggle"
        aria-labelledby="PaymentMethodGridList"
        selectedKeys={paymentMethod}
        // onAction={(value: string) => {
        //     setPaymentMethod([ ])
        //     console.log("value", new Array(value))
        // }}
      >
        <GridList.Item id="creditCard">Credit Card</GridList.Item>
        <GridList.Item id="debitCard">Debit Card</GridList.Item>
        <GridList.Item id="bankTransfer">Bank Transfer</GridList.Item>
        <GridList.Item id="paypal">PayPal</GridList.Item>
      </GridList>
      selected key {paymentMethod}
    </>
  );
};
