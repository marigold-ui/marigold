import { TextField } from '@marigold/components';

export default () => (
  <TextField label="Name" onChange={e => console.log(e.target.value)} />
);
