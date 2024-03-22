/**
 * INFO: This is an alpha release for the component.
 *       The API might change in future.
 */
import { Multiselect } from '@marigold/components';

export default () => {
  return (
    <Multiselect label="Select favorite fruits">
      <Multiselect.Item id="apple">🍎 Apple</Multiselect.Item>
      <Multiselect.Item id="banana">🍌 Banana</Multiselect.Item>
      <Multiselect.Item id="orange">🍊 Orange</Multiselect.Item>
      <Multiselect.Item id="strawberry">🍓 Strawberry</Multiselect.Item>
      <Multiselect.Item id="mango">🥭 Mango</Multiselect.Item>
      <Multiselect.Item id="watermelon">🍉 Watermelon</Multiselect.Item>
    </Multiselect>
  );
};
