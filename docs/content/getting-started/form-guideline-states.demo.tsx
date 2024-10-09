import {
  Headline,
  NumberField,
  Select,
  Stack,
  Switch,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={'5'}>Disabled State</Headline>
        <TextField label="username" placeholder="enter user name" disabled />
      </Stack>
      <Stack space={2}>
        <Headline level={'5'}>Error State</Headline>
        <NumberField
          label="Quantity"
          error
          errorMessage="Max number of available tickets is 3"
          value={4}
        />
      </Stack>
      <Stack space={2}>
        <Headline level={'5'}>ReadOnly State</Headline>
        <Switch readOnly>Settings Locked</Switch>
      </Stack>

      <Stack space={2}>
        <Headline level={'5'}>Required State</Headline>
        <Select
          label="Genre"
          placeholder="Select genre"
          description="Select the genre you want."
          width="fit"
          required
        >
          <Select.Option id="pop">Pop</Select.Option>
          <Select.Option id="hiphop">Hip Hop</Select.Option>
          <Select.Option id="rock">Rock</Select.Option>
          <Select.Option id="schlager">Schlager</Select.Option>
          <Select.Option id="jazz">Jazz</Select.Option>
          <Select.Option id="dance">Dance</Select.Option>
        </Select>
      </Stack>
    </Stack>
  );
};
