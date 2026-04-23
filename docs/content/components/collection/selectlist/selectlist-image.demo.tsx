import { SelectList, Text } from '@marigold/components';

export default () => (
  <SelectList
    aria-label="Select payment method"
    selectionMode="single"
    defaultSelectedKeys={['mastercard']}
  >
    <SelectList.Item id="mastercard" textValue="Mastercard ending in 4242">
      <img
        alt=""
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
      />
      <Text slot="label">Mastercard</Text>
      <Text slot="description">Ending in 4242 • Expires 12/27</Text>
    </SelectList.Item>
    <SelectList.Item id="visa" textValue="Visa ending in 1234">
      <img
        alt=""
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/200px-Visa_Logo.png"
      />
      <Text slot="label">Visa</Text>
      <Text slot="description">Ending in 1234 • Expires 08/26</Text>
    </SelectList.Item>
  </SelectList>
);
