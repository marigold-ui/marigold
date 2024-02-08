import React from 'react';

import { ListBox } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import coreTheme from '@marigold/theme-core';

export default () => {
  return (
    <ThemeProvider theme={coreTheme}>
      <ListBox
        selectionMode="multiple"
        defaultSelectedKeys={['sepa', 'paypal']}
      >
        <ListBox.Item id="transfer">Überweisung (Vorkasse)</ListBox.Item>
        <ListBox.Item id="sepa">SEPA-Lastschrift</ListBox.Item>
        <ListBox.Item id="creditcard">Kreditkarte</ListBox.Item>
        <ListBox.Item id="invoice">Rechnung</ListBox.Item>
        <ListBox.Item id="paypal">Paypal</ListBox.Item>
        <ListBox.Item id="directtransfer">SOFORT-Überweisung</ListBox.Item>
      </ListBox>
    </ThemeProvider>
  );
};
