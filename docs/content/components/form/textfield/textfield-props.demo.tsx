import { Inline, TextField } from '@marigold/components';

export default () => (
  <Inline space={4} alignX="center">
    <TextField
      id="field-required"
      label="Required"
      required
      defaultValue="Hello World!"
      width="2/5"
    />
    <TextField
      id="field-disabled"
      label="Disabled"
      disabled
      defaultValue="Hello World!"
      width="2/5"
    />
    <TextField
      id="field-read-only"
      label="Read-only"
      readOnly
      defaultValue="Hello World!"
      width="2/5"
    />
    <TextField
      id="field-password"
      label="Password"
      type="password"
      defaultValue="Hello World!"
      width="2/5"
    />
    <TextField
      id="field-date"
      label="Date"
      type="date"
      defaultValue="2024-07-25"
      width="2/5"
    />
    <TextField
      id="field-email"
      label="E-Mail"
      type="email"
      defaultValue="hello-world@world.com"
      width="2/5"
    />
    <TextField
      id="field-placeholder"
      label="Placeholder"
      placeholder="Enter some text"
      width="2/5"
    />
    <TextField
      id="field-description"
      label="Description"
      description="Descriptive text"
      width="2/5"
    />
  </Inline>
);
