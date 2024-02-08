import React, { useState } from 'react';

import { ListBox } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import coreTheme from '@marigold/theme-core';

export default () => {
  const [selected, setSelected] = useState(new Set(['transfer', 'sepa']));

  const handleSelectionChange = (selectedKeys: Set<string>) => {
    setSelected(selectedKeys);
  };

  const items = [
    { id: 'transfer', label: 'Überweisung (Vorkasse)' },
    { id: 'sepa', label: 'SEPA-Lastschrift' },
    { id: 'creditcard', label: 'Kreditkarte' },
    { id: 'invoice', label: 'Rechnung' },
    { id: 'paypal', label: 'Paypal' },
    { id: 'directtransfer', label: 'SOFORT-Überweisung' },
  ];

  return (
    <ThemeProvider theme={coreTheme}>
      <ListBox
        aria-labelledby="listbox"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={handleSelectionChange}
      >
        {items.map(item => (
          <ListBox.Item key={item.id} id={item.id}>
            {item.label}
          </ListBox.Item>
        ))}
      </ListBox>
    </ThemeProvider>
  );
};
