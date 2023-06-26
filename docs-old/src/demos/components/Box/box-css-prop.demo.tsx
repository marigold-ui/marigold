import { Box, Center } from '@marigold/components';
import { keyframes } from '@marigold/system';

export const CssPropBoxDemo = () => {
  const shiny = keyframes({
    '0%': { WebkitTransform: 'scale(0) rotate(45deg)', opacity: 0 },
    '80%': { WebkitTransform: 'scale(0) rotate(45deg)', opacity: 0.5 },
    '81%': { WebkitTransform: 'scale(4) rotate(45deg)', opacity: 1 },
    '100%': { WebkitTransform: 'scale(50) rotate(45deg)', opacity: 0 },
  });
  return (
    <Center>
      <Box
        as="button"
        css={{
          display: 'inline-block',
          position: 'relative',
          px: 24,
          py: 12,
          color: '#fff',
          borderRadius: 5,
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow:
            'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
          outline: 'none',

          border: 'none',
          background:
            'linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%)',
          overflow: 'hidden',

          '&:before': {
            position: 'absolute',
            content: "''",
            display: 'inline-block',
            top: '-180px',
            left: '0',
            width: '30px',
            height: '100%',
            backgroundColor: '#fff',
            animation: `${shiny} 3s ease-in-out infinite`,
          },

          '&:hover': { color: '#fff', opacity: 0.7 },
          '&:active': {
            boxShadow:
              '4px 4px 6px 0 rgba(255,255,255,.3), -4px -4px 6px 0 rgba(116, 125, 136, .2), inset -4px -4px 6px 0 rgba(255,255,255,.2), inset 4px 4px 6px 0 rgba(0, 0, 0, .2)',
          },
        }}
      >
        Hover Me
      </Box>
    </Center>
  );
};
