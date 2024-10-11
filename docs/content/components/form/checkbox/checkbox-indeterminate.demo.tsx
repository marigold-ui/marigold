import { Checkbox } from '@marigold/components';

export default () => {
  return (
    <Checkbox.Group label="Favorite genres">
      <Checkbox>All</Checkbox>
      <Checkbox>Rock</Checkbox>
      <Checkbox>Pop</Checkbox>
      <Checkbox>Jazz</Checkbox>
      <Checkbox>Hip-Hop</Checkbox>
      <Checkbox>Classical</Checkbox>
      <Checkbox>Country</Checkbox>
      <Checkbox>Electronic</Checkbox>
      <Checkbox>R&B</Checkbox>
    </Checkbox.Group>
  );
};
