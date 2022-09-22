import { Columns, Stack } from '@marigold/components';
import { Block } from '~/components';

export const StretchColumns = () => (
  <Block>
    <Stack space="medium">
      <Block height={500}>
        <Columns columns={[4, 4, 4]} space="small" stretch>
          <Block height="100%">I have a height set to 100%!</Block>
          <Block>I space myself</Block>
          <Block height={200}>I have a height set to 200px.</Block>
        </Columns>
      </Block>
      <Columns columns={[2, 1]} space="small">
        <Block>
          Columns will stretch if they get longer, like a regular CSS element.
        </Block>
        <Block>I am here too!</Block>
      </Columns>
    </Stack>
  </Block>
);
