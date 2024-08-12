import { useState } from 'react';
import { SelectList } from '@marigold/components';

export default () => {
  const [paymentMethod, setPaymentMethod] = useState(new Set(['bankTransfer']));
  return (
    <>
      <SelectList
        selectionMode="single"
        aria-labelledby="PaymentMethodSelectList"
        onChange={setPaymentMethod}
        selectedKeys={paymentMethod}
      >
        <SelectList.Item id="creditCard">Credit Card</SelectList.Item>
        <SelectList.Item id="debitCard">Debit Card</SelectList.Item>
        <SelectList.Item id="bankTransfer">Bank Transfer</SelectList.Item>
        <SelectList.Item id="paypal">PayPal</SelectList.Item>
      </SelectList>
      Current Payment is: {paymentMethod}
    </>
  );
};
