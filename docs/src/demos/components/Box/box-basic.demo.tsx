import { Box, Center, Stack } from '@marigold/components';
import { keyframes } from '@marigold/system';

export const BasicBoxDemo = () => {
  const borderWidth = 5;
  const animateGradient = keyframes({
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgrounPposition: '0% 50%',
    },
  });

  return (
    <Stack space="medium">
      <Center>
        <Box
          css={{
            display: 'grid',
            placeItems: 'center',
            py: 12,
            px: 40,

            background: '#f1f3f5',
            borderRadius: borderWidth,
          }}
        >
          I am just a simple Box.
        </Box>
      </Center>
      <Center>
        <Box
          css={{
            display: 'grid',
            placeItems: 'center',
            py: 12,
            px: 40,

            color: '#fff',
            fontWeight: 700,
            fontSize: '1.25rem',

            borderRadius: borderWidth,
            background:
              'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)',
            animation: `${animateGradient} 3s ease alternate infinite`,
            backgroundSize: '300% 300%',
          }}
        >
          But I am funky fresh!
        </Box>
      </Center>
    </Stack>
  );
};
