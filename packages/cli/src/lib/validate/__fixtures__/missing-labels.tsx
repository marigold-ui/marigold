import { TextField } from '@marigold/components';

const MissingLabels = (): React.ReactElement => (
  <form>
    <TextField type="email" placeholder="Enter your email" />
    <TextField type="password" placeholder="Password" />
  </form>
);

export default MissingLabels;
