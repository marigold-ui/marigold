import { Box, Columns } from '@marigold/components';

export const BreadcrumbColumns = () => (
  <Columns columns={[2, 2, 2, 1, 1, 1]}>
    <Box
      border="1px solid"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Sport
    </Box>
    <Box
      border="1px solid"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Shows
    </Box>
    <Box
      border="1px solid"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Konzerte
    </Box>
    <Box
      border="1px solid"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Comedy
    </Box>
    <Box
      border="1px solid"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Theater
    </Box>
    <Box
      border="1px solid"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Klassik
    </Box>
  </Columns>
);
