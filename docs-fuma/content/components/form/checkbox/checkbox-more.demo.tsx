'use client';

import { Checkbox } from '@marigold/components';

export default () => (
  <Checkbox.Group collapseAt={5} defaultValue={['parking', 'seating']}>
    <Checkbox value="parking" label="Parking" />
    <Checkbox value="seating" label="Reserved Seating" />
    <Checkbox value="drinks" label="All you can drink" />
    <Checkbox value="food" label="Food Voucher" />
    <Checkbox value="wifi" label="Wi-Fi Access" />
    <Checkbox value="cloakroom" label="Cloakroom Service" />
    <Checkbox value="merch" label="Merchandise Voucher" />
    <Checkbox value="vip" label="VIP Access" />
    <Checkbox value="meetgreet" label="Meet & Greet" />
    <Checkbox value="photo" label="Photo Pass" />
  </Checkbox.Group>
);
