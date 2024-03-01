import { Columns, Switch, TextField } from '@marigold/components';

export default () => (
  <Columns space={2} columns={[8, 'fit']} collapseAt="25em">
    <TextField label="Setting 1" />
    <div className="align-center flex">
      <Switch />
    </div>
  </Columns>
);
