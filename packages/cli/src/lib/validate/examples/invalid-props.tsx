// fixture intentionally contains invalid props for the validator to flag.
import { Button, TextField } from '@marigold/components';

const InvalidProps = () => (
  <>
    <Button isLoading>Save</Button>
    <TextField isRequired label="Email" type="email" />
  </>
);

export default InvalidProps;
