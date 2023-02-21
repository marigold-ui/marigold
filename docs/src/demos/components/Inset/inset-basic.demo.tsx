import { Headline, Inset, Stack, Text } from '@marigold/components';

export const BasicInset = () => (
  <Inset space="medium">
    <Stack space="small">
      <Headline level="2">Interesting facts about Marigolds</Headline>
      <Text>
        Marigolds are flowering plants of the genus Tagetes of the sunflower
        family Asteraceae.
      </Text>
      <Text>There are 56 species of marigolds.</Text>
      <Text>
        Their habitats are shores, ponds, springs, quiet waters in streams,
        ditches, wetlands, wet meadows, waterside swamps and meadows which are
        prone to flooding, damp hollows in broad-leaved forests, snow-bed sites,
        sometimes underwater.
      </Text>
    </Stack>
  </Inset>
);
