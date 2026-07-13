import { Button, Select, TextField } from '@marigold/components';

export default () => (
  <div>
    <Button onClick={() => console.log('click')}>Click</Button>
    <Select label="Pick" onChange={val => console.log(val)}>
      <Select.Option id="a">A</Select.Option>
    </Select>
    <TextField label="Name" onChange={val => console.log(val)} />
  </div>
);
