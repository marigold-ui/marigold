import { Columns, Stack } from '@marigold/components';
import { Block } from '~/components';

export const StretchColumns = () => (
  <Block>
    <Stack space="medium">
      <Block height={500}>
        <Columns columns={[4, 4, 4]} space="small" stretch>
          <Block height="100%">one</Block>
          <Block>two</Block>
          <Block height={200}>three</Block>
        </Columns>
      </Block>
      <Columns columns={[2, 1]} space="small">
        <Block>
          Columns will stretch if they get longer, like a regular CSS element.
        </Block>
        <Block>five</Block>
      </Columns>
    </Stack>
  </Block>
);
