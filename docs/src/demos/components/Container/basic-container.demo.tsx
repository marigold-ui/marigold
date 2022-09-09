import { Box, Container, Headline, Text } from '@marigold/components';

export const BasicContainer = () => (
  <Box border="1px solid #ced4da" bg="#e9ecef" p="xsmall">
    <Box as={Container} contentType="header" align="center" alignItems="center">
      <Headline level="2">Container header</Headline>
    </Box>
    <Box as={Container} align="center" alignItems="center">
      <Text>
        The container content is for example a long text to present information.
        In this case it is an unnecessary text that is only used to fill the
        width of the container content. Thank you for reading this.
      </Text>
    </Box>
  </Box>
);
