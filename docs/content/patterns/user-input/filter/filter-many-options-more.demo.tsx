import { Checkbox } from '@marigold/components';

export default () => (
  <Checkbox.Group
    label="Genre"
    collapseAt={5}
    defaultValue={['rock', 'hiphop']}
  >
    <Checkbox value="pop" label="Pop" />
    <Checkbox value="rock" label="Rock" />
    <Checkbox value="hiphop" label="Hip-Hop" />
    <Checkbox value="electronic" label="Electronic" />
    <Checkbox value="classical" label="Classical" />
    <Checkbox value="jazz" label="Jazz" />
    <Checkbox value="country" label="Country" />
    <Checkbox value="rnb" label="R&B" />
    <Checkbox value="metal" label="Metal" />
    <Checkbox value="reggae" label="Reggae" />
    <Checkbox value="blues" label="Blues" />
    <Checkbox value="folk" label="Folk" />
  </Checkbox.Group>
);
