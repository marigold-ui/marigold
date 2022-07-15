import React from 'react';
// import { Box, Link } from '@marigold/components';
// import { navigationLinks } from '../../config';
// import { CSSObject, useComponentStyles } from '@marigold/system';
// // import { getNavigation } from '../../navigation.utils';

// type Navigation = (NavigationCategory | NavigationCategoryWithGroup)[];

// interface NavigationCategory {
//   name: string;
//   items: NavigationItem[];
// }

// interface NavigationCategoryWithGroup {
//   name: string;
//   groups: {
//     name: string;
//     items: NavigationItem[];
//   }[];
// }
// interface NavigationItem {
//   slug: string;
//   title: string;
// }

// interface NavigationProps {
//   children?: Navigation;
//   css: {
//     list: CSSObject;
//     item: CSSObject;
//   };
// }

// //TODO: lists category and get groups?
// const NavigationCategory = async () => {
//   const navigation = await getNavigation();
//   console.log('navigation', navigation);
// };

// const NavigationList = ({ css }: NavigationProps) => {
//   //TODO: check if its a mdx page
//   return (
//     <Box as="ul" css={css.list}>
//       {navigationLinks.map(child =>
//         'title' in child ? <Box as="li" children={child.title} /> : <Box />
//       )}
//     </Box>
//   );
// };

// navigation component
export const Navigation = ({ navigation }: any) => {
  // const styles = useComponentStyles(
  //   'Navigation',
  //   {},
  //   { parts: ['container', 'header', 'list', 'item'] }
  // );

  // return (
  //   <Box as="nav" css={styles.container} aria-labelledby="primary-navigation">
  //     <NavigationList css={styles}></NavigationList>
  //   </Box>
  // );

  return <pre>{JSON.stringify(navigation, null, 2)}</pre>;
};
