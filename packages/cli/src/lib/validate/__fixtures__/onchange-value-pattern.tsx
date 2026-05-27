import { TextField } from '@marigold/components';

export default () => (
  <TextField label="Name" onChange={value => console.log(value)} />
);
