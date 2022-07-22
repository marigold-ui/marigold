import React from 'react';
import { Text } from '@marigold/components';
// import { graphql, useStaticQuery } from 'gatsby';

// const useVersion = () => {
//   const { site } = useStaticQuery(graphql`
//     query VersionQuerxy {
//       site {
//         siteMetadata {
//           version
//           hash
//         }
//       }
//     }
//   `) as { site: { siteMetadata: { version: string; hash: string } } };
//   return {
//     version: site.siteMetadata.version,
//     hash: site.siteMetadata.hash,
//   };
// };

export const Version = () => {
  return (
    <Text variant="muted" display="block" align="right" p="xsmall">
      v{process.env.version}
    </Text>
  );
};
