import { Radio } from '@marigold/components';

export default () => (
  <Radio.Group
    label="Select Your Parking Option"
    error
    errorMessage="Please choose a valid parking option."
  >
    <Radio value="standardParking">🚗 Standard Parking</Radio>
    <Radio value="premiumParking">🌟 Premium Parking</Radio>
    <Radio value="valetParking" disabled>
      🚗 Valet Parking (Unavailable)
    </Radio>
    <Radio value="accessibleParking">♿ Accessible Parking</Radio>
  </Radio.Group>
);
