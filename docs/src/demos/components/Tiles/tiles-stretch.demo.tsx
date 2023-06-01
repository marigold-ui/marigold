import { Box, Divider, Headline, Stack, Tiles } from '@marigold/components';

export const StretchTiles = () => (
  <Stack space="large">
    <Headline>Without stretch:</Headline>
    <Tiles tilesWidth="150px" space="large">
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
    </Tiles>
    <Divider />
    <Tiles tilesWidth="150px" space="large">
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
    </Tiles>
    <Headline>With stretch:</Headline>
    <Tiles tilesWidth="150px" space="large" stretch>
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
    </Tiles>
    <Divider />
    <Tiles tilesWidth="150px" space="large" stretch>
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
      <Box
        css={{
          border: '1px solid #ced4da',
          bg: '#e9ecef',
          height: '100px',
        }}
      />
    </Tiles>
  </Stack>
);
